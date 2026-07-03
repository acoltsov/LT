import { RoleProvider } from "./hooks/useRole";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Mission } from "./components/Mission";
import { HowItWorks } from "./components/HowItWorks";
import { Reputation } from "./components/Reputation";
import { Features } from "./components/Features";
import { Audiences } from "./components/Audiences";
import { Pricing } from "./components/Pricing";
import { FAQ } from "./components/FAQ";
import { Waitlist } from "./components/Waitlist";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <RoleProvider>
      <a
        href="#main"
        className="sr-only z-[60] rounded-lg bg-lime-400 px-4 py-2 font-semibold text-slate-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Mission />
        <HowItWorks />
        <Reputation />
        <Features />
        <Audiences />
        <Pricing />
        <FAQ />
        <Waitlist />
      </main>
      <Footer />
    </RoleProvider>
  );
}
