"use client";

import { useActionState } from "react";
import { joinAsContributor, type FormState } from "@/app/actions";
import { COUNTRIES, LANGUAGES, STATUSES } from "@/lib/options";
import { SubmitButton } from "../ui";
import { ChipGroup, Honeypot, keepInputOnSubmit, SelectField, TextField } from "./fields";
import { FormNotice, Success } from "./Success";

const countries = COUNTRIES.map((c) => ({ value: c, label: c }));
const languages = LANGUAGES.map((l) => ({ value: l, label: l }));

// Remember where people came from (?ref=oau-whatsapp, ?utm_source=x …)
function withSource(action: (fd: FormData) => void) {
  return (fd: FormData) => {
    const p = new URLSearchParams(window.location.search);
    fd.set("source", p.get("ref") ?? p.get("utm_source") ?? "");
    action(fd);
  };
}

export function ContributorForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(joinAsContributor, { status: "idle" });

  if (state.status === "success") {
    return (
      <Success
        firstName={state.firstName}
        already={state.already}
        body="You're one of our founding contributors. We'll email you when the first paid tasks open in your language."
        shareText="I just joined the Paraval waitlist. Get paid to test and teach AI in your own language:"
      />
    );
  }

  const err = state.status === "error" ? state.fields ?? {} : {};

  return (
    <form onSubmit={keepInputOnSubmit(withSource(action))} className="relative grid gap-5 sm:grid-cols-2" noValidate>
      <Honeypot />
      <TextField label="Full name" name="full_name" autoComplete="name" placeholder="Adaeze Okafor" error={err.full_name} />
      <TextField label="Email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" error={err.email} />
      <ChipGroup className="sm:col-span-2" legend="Languages you speak well" name="languages" options={languages} error={err.languages} />
      <TextField className="sm:col-span-2" label="Other languages" name="other_languages" optional placeholder="e.g. Tiv, Ibibio, Kanuri, Efik" />
      <SelectField label="I am a…" name="status" options={STATUSES} error={err.status} defaultValue="" />
      <SelectField label="Country" name="country" options={countries} error={err.country} defaultValue="Nigeria" />
      <TextField label="University or workplace" name="institution" optional placeholder="e.g. Obafemi Awolowo University" />
      <TextField label="Field of study or work" name="field" optional placeholder="e.g. Medicine, Law, Linguistics" />

      <div className="flex flex-col gap-4 pt-2 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[12px] leading-relaxed text-paper/45">
          Free to join. We&apos;ll only email you about Paraval. See our{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-paper">
            privacy policy
          </a>
          .
        </p>
        <SubmitButton pending={pending}>Join as a contributor</SubmitButton>
      </div>
      <FormNotice state={state} />
    </form>
  );
}
