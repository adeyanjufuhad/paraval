import { startTransition, type ComponentProps, type FormEvent, type ReactNode } from "react";

// React resets a form after its `action` runs, which would wipe what people
// typed when validation fails. Submitting via onSubmit keeps their input.
export function keepInputOnSubmit(action: (fd: FormData) => void) {
  return (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => action(fd));
  };
}

const control =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[15px] text-paper placeholder:text-paper/30 outline-none transition-colors focus:border-white/40 focus:bg-white/[0.06] aria-[invalid=true]:border-red-400/60";

function Label({ htmlFor, children, optional }: { htmlFor?: string; children: ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-[13px] text-paper/75">
      {children}
      {optional && <span className="ml-1.5 text-paper/35">(optional)</span>}
    </label>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-[12px] text-red-300/90">
      {message}
    </p>
  );
}

type Common = { label: string; name: string; error?: string; optional?: boolean; className?: string };

export function TextField({ label, name, error, optional, className = "", ...rest }: Common & ComponentProps<"input">) {
  const id = `f-${rest.id ?? name}`;
  return (
    <div className={className}>
      <Label htmlFor={id} optional={optional}>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        required={!optional}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={control}
        {...rest}
      />
      <FieldError id={`${id}-err`} message={error} />
    </div>
  );
}

export function SelectField({
  label,
  name,
  error,
  optional,
  className = "",
  options,
  placeholder = "Choose…",
  ...rest
}: Common & ComponentProps<"select"> & { options: readonly { value: string; label: string }[]; placeholder?: string }) {
  const id = `f-${rest.id ?? name}`;
  return (
    <div className={className}>
      <Label htmlFor={id} optional={optional}>
        {label}
      </Label>
      <div className="relative">
        <select
          id={id}
          name={name}
          required={!optional}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className={`${control} appearance-none pr-10 [&>option]:bg-ink`}
          {...rest}
        >
          {!rest.defaultValue && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg viewBox="0 0 16 16" className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-paper/50" aria-hidden>
          <path d="m3 6 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <FieldError id={`${id}-err`} message={error} />
    </div>
  );
}

export function TextArea({ label, name, error, optional, className = "", ...rest }: Common & ComponentProps<"textarea">) {
  const id = `f-${rest.id ?? name}`;
  return (
    <div className={className}>
      <Label htmlFor={id} optional={optional}>
        {label}
      </Label>
      <textarea id={id} name={name} rows={3} required={!optional} className={`${control} resize-y`} {...rest} />
      <FieldError id={`${id}-err`} message={error} />
    </div>
  );
}

// Multi-select as tappable chips (real checkboxes underneath)
export function ChipGroup({
  legend,
  name,
  options,
  error,
  className = "",
}: {
  legend: string;
  name: string;
  options: readonly { value: string; label: string }[];
  error?: string;
  className?: string;
}) {
  return (
    <fieldset className={className} aria-describedby={error ? `f-${name}-err` : undefined}>
      <legend className="mb-2 block text-[13px] text-paper/75">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className="cursor-pointer">
            <input type="checkbox" name={name} value={o.value} className="peer sr-only" />
            <span className="inline-block rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-2 text-[13px] text-paper/70 transition-colors hover:border-white/30 peer-checked:border-paper peer-checked:bg-paper peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-paper">
              {o.label}
            </span>
          </label>
        ))}
      </div>
      <FieldError id={`f-${name}-err`} message={error} />
    </fieldset>
  );
}

// Hidden from people, tempting for bots
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
