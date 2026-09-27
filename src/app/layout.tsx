import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { Reveal } from "@/components/Reveal";
import { ScrollFx } from "@/components/ScrollFx";
import { Spotlight } from "@/components/Spotlight";
import { site } from "@/lib/site";
import "lenis/dist/lenis.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Paraval",
    "AI evaluation",
    "human data",
    "African languages",
    "Yoruba",
    "Hausa",
    "Igbo",
    "Nigerian Pidgin",
    "AI benchmark Nigeria",
    "earn online Nigeria",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    url: "/",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The inline script below adds the `js` class before React hydrates
    <html lang="en" className={`${inter.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        {/* Mark JS early so scroll-reveal content doesn't flash before hiding */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        {children}
        <div className="grain" aria-hidden />
        <Reveal />
        <Spotlight />
        <ScrollFx />
      </body>
    </html>
  );
}
