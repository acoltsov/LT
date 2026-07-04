import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const SPACING = 44; // px between gridlines — matches the old CSS grid
const SAMPLE = 12; // px between points along a line (warp resolution)
const RADIUS = 230; // gravitational influence radius
const PULL = 0.72; // max radial compression toward the mass (0–1)
const HOLD_BOOST = 0.3; // extra compression at full press-and-hold depth
const HOLD_REACH = 0.35; // extra influence radius at full hold depth
const MAX_COMPRESSION = 0.94; // hard cap so lines can never fold over

interface WarpGridProps {
  className?: string;
  /** "onDark" forces the light-on-dark line color (for always-dark sections). */
  variant?: "auto" | "onDark";
}

/**
 * Blueprint gridlines drawn on a canvas that behave like a spacetime fabric:
 * the cursor is a dense mass, and nearby lines are pulled inward — spacing
 * compresses toward it like a gravity well — springing back when it leaves.
 * On touch, press and hold plants the mass under the finger and the well
 * keeps deepening the longer the hold lasts (scrolling cancels it via
 * pointercancel). Renders a static grid under reduced motion; the animation
 * loop only runs while on-screen and unsettled.
 */
export function WarpGrid({ className = "", variant = "auto" }: WarpGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;
    let inView = true;
    const pointer = {
      x: -9999,
      y: -9999,
      tx: -9999,
      ty: -9999,
      energy: 0,
      targetEnergy: 0,
      /** 0..1 — how long a touch has been held; deepens the well. */
      hold: 0,
      pressing: false,
    };
    let activeTouchId = -1;

    const lineColor = () => {
      const dark =
        variant === "onDark" ||
        document.documentElement.classList.contains("dark");
      return dark ? "rgba(190, 242, 100, 0.09)" : "rgba(101, 163, 13, 0.13)";
    };

    const warp = (px: number, py: number): [number, number] => {
      if (pointer.energy <= 0.002) return [px, py];
      const dx = px - pointer.x;
      const dy = py - pointer.y;
      const dist = Math.hypot(dx, dy);
      // Press-and-hold makes the mass denser: more pull, wider reach.
      const radius = RADIUS * (1 + HOLD_REACH * pointer.hold);
      if (dist >= radius || dist < 0.0001) return [px, py];
      // Gravity-well compression: radial distance to the mass shrinks by a
      // factor that peaks at the center and fades smoothly to 0 at the edge.
      // r' = r * (1 - c) stays monotonic in r, so lines never fold over.
      const t = dist / radius;
      const compression = Math.min(
        PULL * pointer.energy * (1 + HOLD_BOOST * pointer.hold) * (1 - t) * (1 - t),
        MAX_COMPRESSION,
      );
      const scale = 1 - compression;
      return [pointer.x + dx * scale, pointer.y + dy * scale];
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = lineColor();
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0.5; x <= width; x += SPACING) {
        for (let y = 0; y <= height + SAMPLE; y += SAMPLE) {
          const [wx, wy] = warp(x, Math.min(y, height));
          if (y === 0) ctx.moveTo(wx, wy);
          else ctx.lineTo(wx, wy);
        }
      }
      for (let y = 0.5; y <= height; y += SPACING) {
        for (let x = 0; x <= width + SAMPLE; x += SAMPLE) {
          const [wx, wy] = warp(Math.min(x, width), y);
          if (x === 0) ctx.moveTo(wx, wy);
          else ctx.lineTo(wx, wy);
        }
      }
      ctx.stroke();
    };

    const tick = () => {
      raf = 0;
      pointer.x += (pointer.tx - pointer.x) * 0.22;
      pointer.y += (pointer.ty - pointer.y) * 0.22;
      pointer.energy += (pointer.targetEnergy - pointer.energy) * 0.09;
      // Holding sinks the mass slowly (~1s to half depth); release recoils faster.
      pointer.hold += pointer.pressing
        ? (1 - pointer.hold) * 0.018
        : -pointer.hold * 0.08;
      if (pointer.hold < 0) pointer.hold = 0;
      draw();
      const settled =
        !pointer.pressing &&
        Math.hypot(pointer.tx - pointer.x, pointer.ty - pointer.y) < 0.4 &&
        Math.abs(pointer.targetEnergy - pointer.energy) < 0.004 &&
        pointer.hold < 0.004;
      if (!settled) schedule();
    };

    const schedule = () => {
      if (!raf && inView) raf = requestAnimationFrame(tick);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    /** Point the well at a viewport position; snap when arriving cold. */
    const aimAt = (clientX: number, clientY: number, snap: boolean) => {
      const rect = canvas.getBoundingClientRect();
      const lx = clientX - rect.left;
      const ly = clientY - rect.top;
      const near =
        lx > -RADIUS &&
        ly > -RADIUS &&
        lx < rect.width + RADIUS &&
        ly < rect.height + RADIUS;
      if (snap && pointer.energy <= 0.002) {
        pointer.x = lx;
        pointer.y = ly;
      }
      pointer.tx = lx;
      pointer.ty = ly;
      pointer.targetEnergy = near ? 1 : 0;
      // The pointer being near the canvas means it's on/near screen — trust
      // this over the observer, whose initial delivery can go stale in
      // freshly restored or backgrounded tabs.
      if (near) inView = true;
      schedule();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "mouse") {
        aimAt(event.clientX, event.clientY, true);
      } else if (pointer.pressing && event.pointerId === activeTouchId) {
        // A held finger drags the mass with it, keeping its depth.
        aimAt(event.clientX, event.clientY, false);
      }
    };

    // Touch: press-and-hold plants the mass and starts sinking it.
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse") return;
      activeTouchId = event.pointerId;
      pointer.pressing = true;
      aimAt(event.clientX, event.clientY, true);
    };

    // Fires on lift-off AND when the browser claims the gesture to scroll.
    const onPointerEnd = (event: PointerEvent) => {
      if (event.pointerType === "mouse" || event.pointerId !== activeTouchId) return;
      activeTouchId = -1;
      pointer.pressing = false;
      pointer.targetEnergy = 0;
      schedule();
    };

    const onPointerLeaveWindow = () => {
      pointer.targetEnergy = 0;
      schedule();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    if (reducedMotion) {
      // Static grid only — no pointer tracking, no loop.
      return () => resizeObserver.disconnect();
    }

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) schedule();
        else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    // Redraw with the right line color when the theme class flips.
    const themeObserver = new MutationObserver(() => draw());
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerEnd, { passive: true });
    window.addEventListener("pointercancel", onPointerEnd, { passive: true });
    document.documentElement.addEventListener(
      "pointerleave",
      onPointerLeaveWindow,
    );

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerEnd);
      window.removeEventListener("pointercancel", onPointerEnd);
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeaveWindow,
      );
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reducedMotion, variant]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
