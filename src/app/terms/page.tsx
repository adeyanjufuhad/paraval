import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the Paraval website and waitlist.",
};

// DRAFT: have a lawyer review this before the first paid contract.
export default function Terms() {
  const contact = site.contactEmail ? <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> : "the contact email on our website";
  return (
    <LegalPage title="Terms of use" updated="September 27, 2026">
      <p>These terms cover your use of the Paraval website and waitlist. By using the site or joining the waitlist, you agree to them.</p>

      <h2>The waitlist</h2>
      <p>
        Joining the waitlist is free. It does not create a job, a contract for paid work, or a guarantee that work will be offered. Paid work, when
        available, will be covered by a separate contributor agreement or customer contract.
      </p>

      <h2>Your information</h2>
      <p>
        Please give accurate information and only submit details about yourself. We handle your data as described in our{" "}
        <a href="/privacy">privacy policy</a>.
      </p>

      <h2>Acceptable use</h2>
      <p>Don&apos;t misuse the site: no automated sign-ups, attempts to access data that isn&apos;t yours, or interference with how the site works.</p>

      <h2>Responsible use of data</h2>
      <p>Paraval will not supply data for surveillance, scams or other harmful uses. This commitment will be written into every customer contract.</p>

      <h2>Content</h2>
      <p>The Paraval name, logo, text and design on this site belong to Paraval. Please ask before reusing them.</p>

      <h2>No warranty</h2>
      <p>
        The site is provided as it is. Information here, including planned products, pay and timelines, describes our intentions and may change as we
        build.
      </p>

      <h2>Contact</h2>
      <p>Questions about these terms? Email us at {contact}.</p>
    </LegalPage>
  );
}
