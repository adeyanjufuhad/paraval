export const site = {
  name: "Paraval",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tagline: "AI that sees the whole world.",
  description:
    "Paraval pays real people to test and teach AI in their own languages and contexts, starting with Nigeria. Join the waitlist as a contributor or an AI team.",
  // TODO: set once the Paraval inbox exists. Leave empty to hide it.
  contactEmail: "",
  // TODO: add handles once claimed. Empty entries are hidden.
  socials: [
    { label: "X", href: "" },
    { label: "LinkedIn", href: "" },
    { label: "Instagram", href: "" },
    { label: "Hugging Face", href: "" },
  ],
};
