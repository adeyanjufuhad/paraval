import { Nav } from "@/components/Nav";
import { About } from "@/components/sections/About";
import { Benchmark } from "@/components/sections/Benchmark";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Examples } from "@/components/sections/Examples";
import { FinalCta } from "@/components/sections/FinalCta";
import { Greetings } from "@/components/sections/Greetings";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Manifesto } from "@/components/sections/Manifesto";
import { Offer } from "@/components/sections/Offer";
import { Problem } from "@/components/sections/Problem";
import { Quality } from "@/components/sections/Quality";
import { Stats } from "@/components/sections/Stats";
import { Vision } from "@/components/sections/Vision";
import { Waitlist } from "@/components/sections/Waitlist";
import { Why } from "@/components/sections/Why";
import { WhyNow } from "@/components/sections/WhyNow";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Greetings />
        <Manifesto />
        <About />
        <Stats />
        <Problem />
        <Examples />
        <HowItWorks />
        <Quality />
        <Offer />
        <Benchmark />
        <Why />
        <WhyNow />
        <Vision />
        <Waitlist />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
