import { Nav } from "@/components/Nav";
import { Benchmark } from "@/components/sections/Benchmark";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Greetings } from "@/components/sections/Greetings";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Manifesto } from "@/components/sections/Manifesto";
import { Offer } from "@/components/sections/Offer";
import { Problem } from "@/components/sections/Problem";
import { Waitlist } from "@/components/sections/Waitlist";
import { Why } from "@/components/sections/Why";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Greetings />
        <Manifesto />
        <Problem />
        <HowItWorks />
        <Offer />
        <Benchmark />
        <Why />
        <Waitlist />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
