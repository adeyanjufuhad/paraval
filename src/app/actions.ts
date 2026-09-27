"use server";

import { supabase } from "@/lib/supabase";
import { COUNTRIES, LANGUAGES, NEEDS, ORG_TYPES, STATUSES, VOLUMES } from "@/lib/options";

export type FormState =
  | { status: "idle" }
  | { status: "success"; firstName: string; already: boolean }
  | { status: "error"; message: string; fields?: Record<string, string> };

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function text(fd: FormData, key: string, max: number) {
  const v = String(fd.get(key) ?? "").trim().replace(/\s+/g, " ");
  return v.slice(0, max);
}

function oneOf<T extends string>(value: string, allowed: readonly T[]): T | null {
  return (allowed as readonly string[]).includes(value) ? (value as T) : null;
}

function firstNameOf(name: string) {
  return name.split(" ")[0] ?? "";
}

// Bots fill every field; people never see this one.
function isBot(fd: FormData) {
  return String(fd.get("website") ?? "") !== "";
}

const PROBLEM = "Please check the highlighted fields.";
const FAILED = "Something went wrong on our side. Please try again in a moment.";

export async function joinAsContributor(_: FormState, fd: FormData): Promise<FormState> {
  const fullName = text(fd, "full_name", 120);
  const email = text(fd, "email", 254).toLowerCase();
  const languages = fd
    .getAll("languages")
    .map(String)
    .filter((l) => (LANGUAGES as readonly string[]).includes(l));
  const otherLanguages = text(fd, "other_languages", 200);
  const status = oneOf(text(fd, "status", 20), STATUSES.map((s) => s.value));
  const institution = text(fd, "institution", 160);
  const field = text(fd, "field", 160);
  const country = oneOf(text(fd, "country", 80), COUNTRIES);
  const source = text(fd, "source", 120);

  if (isBot(fd)) return { status: "success", firstName: firstNameOf(fullName), already: false };

  const fields: Record<string, string> = {};
  if (fullName.length < 2) fields.full_name = "Please enter your name.";
  if (!EMAIL.test(email)) fields.email = "Please enter a valid email.";
  if (languages.length === 0 && !otherLanguages) fields.languages = "Pick at least one language.";
  if (!status) fields.status = "Tell us what you do.";
  if (!country) fields.country = "Choose your country.";
  if (Object.keys(fields).length) return { status: "error", message: PROBLEM, fields };

  const { error } = await supabase()
    .from("contributor_waitlist")
    .insert({
      full_name: fullName,
      email,
      // "Other" languages are kept as free text; the array must not be empty
      languages: languages.length ? languages : ["Other"],
      other_languages: otherLanguages || null,
      status,
      institution: institution || null,
      field: field || null,
      country,
      source: source || null,
    });

  if (error?.code === "23505") return { status: "success", firstName: firstNameOf(fullName), already: true };
  if (error) {
    console.error("contributor_waitlist insert failed", error.code, error.message);
    return { status: "error", message: FAILED };
  }
  return { status: "success", firstName: firstNameOf(fullName), already: false };
}

export async function joinAsCompany(_: FormState, fd: FormData): Promise<FormState> {
  const fullName = text(fd, "full_name", 120);
  const email = text(fd, "email", 254).toLowerCase();
  const company = text(fd, "company", 160);
  const jobTitle = text(fd, "job_title", 120);
  const orgType = oneOf(text(fd, "org_type", 20), ORG_TYPES.map((o) => o.value));
  const needValues = NEEDS.map((n) => n.value) as readonly string[];
  const needs = fd
    .getAll("needs")
    .map(String)
    .filter((n) => needValues.includes(n));
  const languages = text(fd, "languages", 300);
  const volume = oneOf(text(fd, "volume", 20), VOLUMES.map((v) => v.value));
  const message = String(fd.get("message") ?? "").trim().slice(0, 2000);
  const country = oneOf(text(fd, "country", 80), COUNTRIES);

  if (isBot(fd)) return { status: "success", firstName: firstNameOf(fullName), already: false };

  const fields: Record<string, string> = {};
  if (fullName.length < 2) fields.full_name = "Please enter your name.";
  if (!EMAIL.test(email)) fields.email = "Please enter a valid work email.";
  if (!company) fields.company = "Please enter your organization.";
  if (!orgType) fields.org_type = "Choose one.";
  if (needs.length === 0) fields.needs = "Pick at least one.";
  if (!country) fields.country = "Choose your country.";
  if (Object.keys(fields).length) return { status: "error", message: PROBLEM, fields };

  const { error } = await supabase()
    .from("company_waitlist")
    .insert({
      full_name: fullName,
      email,
      company,
      job_title: jobTitle || null,
      org_type: orgType,
      needs,
      languages: languages || null,
      volume,
      message: message || null,
      country,
    });

  if (error?.code === "23505") return { status: "success", firstName: firstNameOf(fullName), already: true };
  if (error) {
    console.error("company_waitlist insert failed", error.code, error.message);
    return { status: "error", message: FAILED };
  }
  return { status: "success", firstName: firstNameOf(fullName), already: false };
}

export async function joinBenchmarkUpdates(_: FormState, fd: FormData): Promise<FormState> {
  const email = text(fd, "email", 254).toLowerCase();
  if (isBot(fd)) return { status: "success", firstName: "", already: false };
  if (!EMAIL.test(email)) return { status: "error", message: "Please enter a valid email." };

  const { error } = await supabase().from("benchmark_updates").insert({ email });
  if (error?.code === "23505") return { status: "success", firstName: "", already: true };
  if (error) {
    console.error("benchmark_updates insert failed", error.code, error.message);
    return { status: "error", message: FAILED };
  }
  return { status: "success", firstName: "", already: false };
}
