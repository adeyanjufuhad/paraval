import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Paraval collects, uses and protects your personal data.",
};

// DRAFT: have a lawyer review this before the first paid contract.
export default function Privacy() {
  const contact = site.contactEmail ? <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> : "the contact email on our website";
  return (
    <LegalPage title="Privacy policy" updated="September 27, 2026">
      <p>
        Paraval (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy explains what personal data we collect through this website, why, and
        the choices you have. We follow the Nigeria Data Protection Act 2023 and build to GDPR-level standards.
      </p>

      <h2>What we collect</h2>
      <p>When you join our waitlist, we collect only what you type into the form:</p>
      <ul>
        <li>Contributors: your name, email, languages, whether you are a student, graduate or professional, your university or workplace, field, and country.</li>
        <li>AI teams: your name, work email, organization, role, organization type, what you need, languages or markets, scale, any message you send, and country.</li>
        <li>Benchmark updates: your email.</li>
      </ul>
      <p>
        We may also record the link or campaign that brought you here (for example a referral code). We do not use advertising trackers, and we do not sell
        your personal data.
      </p>

      <h2>Why we use it</h2>
      <ul>
        <li>To contact you about joining Paraval, paid tasks, the Paraval Benchmark and working together.</li>
        <li>To plan which languages, fields and countries to open first.</li>
      </ul>
      <p>We rely on your consent, which you give by submitting the form. You can withdraw it at any time.</p>

      <h2>Where it is stored</h2>
      <p>
        Waitlist data is stored with our database provider, Supabase, on servers in London, United Kingdom, with access limited to the Paraval team. The
        website is hosted by Vercel.
      </p>

      <h2>How long we keep it</h2>
      <p>We keep waitlist data until you ask us to delete it, or until it is no longer needed for the purposes above.</p>

      <h2>Your rights</h2>
      <p>
        You can ask to see, correct or delete your data, or object to how we use it. Email us at {contact} and we will respond within 30 days. You can also
        complain to the Nigeria Data Protection Commission.
      </p>

      <h2>When paid work starts</h2>
      <p>
        Contributors who start paid work will receive a separate, plain-language agreement explaining what they create, how it is used and licensed, how
        payment and royalties work, and how identity and bank details are handled. Work delivered to customers has names and personal details removed.
      </p>

      <h2>Changes</h2>
      <p>If we change this policy, we will update the date above and, for important changes, let waitlist members know.</p>
    </LegalPage>
  );
}
