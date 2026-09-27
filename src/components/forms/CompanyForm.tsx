"use client";

import { useActionState } from "react";
import { joinAsCompany, type FormState } from "@/app/actions";
import { COUNTRIES, NEEDS, ORG_TYPES, VOLUMES } from "@/lib/options";
import { SubmitButton } from "../ui";
import { ChipGroup, Honeypot, keepInputOnSubmit, SelectField, TextArea, TextField } from "./fields";
import { FormNotice, Success } from "./Success";

const countries = COUNTRIES.map((c) => ({ value: c, label: c }));

export function CompanyForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(joinAsCompany, { status: "idle" });

  if (state.status === "success") {
    return (
      <Success
        firstName={state.firstName}
        already={state.already}
        body="Thanks for reaching out. We'll be in touch within two working days to learn more about what you need."
      />
    );
  }

  const err = state.status === "error" ? state.fields ?? {} : {};

  return (
    <form onSubmit={keepInputOnSubmit(action)} className="relative grid gap-5 sm:grid-cols-2" noValidate>
      <Honeypot />
      <TextField label="Full name" name="full_name" autoComplete="name" error={err.full_name} />
      <TextField label="Work email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="you@company.com" error={err.email} />
      <TextField label="Company or organization" name="company" autoComplete="organization" error={err.company} />
      <TextField label="Your role" name="job_title" optional autoComplete="organization-title" placeholder="e.g. Head of ML" />
      <SelectField label="Organization type" name="org_type" options={ORG_TYPES} error={err.org_type} defaultValue="" />
      <SelectField label="Country" name="country" options={countries} error={err.country} defaultValue="Nigeria" />
      <ChipGroup className="sm:col-span-2" legend="What do you need?" name="needs" options={NEEDS} error={err.needs} />
      <TextField label="Languages or markets" name="languages" optional placeholder="e.g. Yoruba and Hausa, West Africa" />
      <SelectField label="Scale" name="volume" optional options={VOLUMES} defaultValue="" placeholder="Choose…" />
      <TextArea className="sm:col-span-2" label="Anything else we should know?" name="message" optional placeholder="Models you're working with, timelines, questions…" />

      <div className="flex flex-col gap-4 pt-2 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[12px] leading-relaxed text-paper/45">
          We reply to every team personally. See our{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-paper">
            privacy policy
          </a>
          .
        </p>
        <SubmitButton pending={pending}>Work with us</SubmitButton>
      </div>
      <FormNotice state={state} />
    </form>
  );
}
