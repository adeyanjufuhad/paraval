// Shared between the forms and the server actions so both agree on valid values.

export const LANGUAGES = ["Yoruba", "Hausa", "Igbo", "Nigerian Pidgin", "English", "French", "Swahili", "Twi"] as const;

export const STATUSES = [
  { value: "student", label: "Student" },
  { value: "graduate", label: "Graduate" },
  { value: "professional", label: "Working professional" },
  { value: "other", label: "Other" },
] as const;

export const ORG_TYPES = [
  { value: "ai_lab", label: "AI lab" },
  { value: "startup", label: "Startup building with AI" },
  { value: "enterprise", label: "Company (bank, telco, fintech…)" },
  { value: "data_company", label: "Data or labeling company" },
  { value: "research", label: "University or research group" },
  { value: "ngo_gov", label: "NGO, foundation or government" },
  { value: "other", label: "Other" },
] as const;

export const NEEDS = [
  { value: "evaluations", label: "Evaluations" },
  { value: "text_data", label: "Text data" },
  { value: "expert_feedback", label: "Expert feedback" },
  { value: "voice_data", label: "Voice data" },
  { value: "agent_demos", label: "Agent demonstrations" },
] as const;

export const VOLUMES = [
  { value: "exploring", label: "Just exploring" },
  { value: "pilot", label: "A small pilot" },
  { value: "ongoing", label: "Ongoing work" },
  { value: "large", label: "Large-scale project" },
] as const;

export const COUNTRIES = [
  "Nigeria",
  "Ghana",
  "Kenya",
  "South Africa",
  "Egypt",
  "Ethiopia",
  "Rwanda",
  "Uganda",
  "Tanzania",
  "Cameroon",
  "Senegal",
  "United Kingdom",
  "United States",
  "Canada",
  "Other",
] as const;
