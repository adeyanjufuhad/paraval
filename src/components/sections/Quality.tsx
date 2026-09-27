import { SectionLabel } from "../ui";

const pipeline = [
  ["Order", "Your request becomes small, well-defined tasks."],
  ["Match", "Qualified contributors, matched by language and field."],
  ["Review", "A second person checks every single item."],
  ["Gold checks", "Hidden questions with known answers catch mistakes and fraud."],
  ["Consent", "Who made it, when, and what they agreed to, attached to the item."],
  ["Delivery", "Datasets and scores, with a full audit log."],
  ["Royalties", "When a dataset is licensed again, its makers earn again."],
];

// A sample consent record: what every delivered item carries
const record = [
  ["item_id", '"pv_yo_000481"'],
  ["language", '"yo-NG"'],
  ["task", '"evaluation"'],
  ["contributor", '"ctr_7f3a…"', "anonymized"],
  ["consent.version", '"1.0"'],
  ["consent.accepted_at", '"2026-10-14T09:12:44Z"'],
  ["consent.license", '"commercial-training"'],
  ["review.reviewers", "2"],
  ["review.agreement", "1.0"],
  ["review.gold_check", '"passed"'],
  ["payout.status", '"paid"'],
  ["payout.hours_after_acceptance", "31"],
  ["royalty_eligible", "true"],
];

export function Quality() {
  return (
    <section id="quality" className="mx-auto max-w-7xl scroll-mt-10 px-4 py-24 sm:px-8 sm:py-32">
      <div data-reveal>
        <SectionLabel index="05">Quality &amp; consent</SectionLabel>
        <h2 className="display mt-8 max-w-4xl text-[2.6rem] sm:text-6xl">
          Trust, <em>engineered</em> into every item.
        </h2>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-paper/60">
          Scraped data is getting riskier every year. Paraval data is made by people who were paid, checked twice, and agreed in writing to how it&apos;s used.
        </p>
      </div>

      <div className="mt-16 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <ol data-reveal className="relative rounded-3xl border border-line p-6 sm:p-10">
          {pipeline.map(([title, body], i) => (
            <li key={title} className="relative grid grid-cols-[3rem_1fr] pb-7 last:pb-0">
              {i < pipeline.length - 1 && <span aria-hidden className="absolute left-[0.94rem] top-8 bottom-0 w-px bg-gradient-to-b from-white/30 to-white/5" />}
              <span className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-ink font-serif text-[15px] italic text-paper/80">
                {i + 1}
              </span>
              <div className="pt-1">
                <h3 className="text-[15px] font-medium">{title}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-paper/55">{body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div data-reveal className="flex flex-col overflow-hidden rounded-3xl border border-line bg-[#080808]">
          <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
            <div className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </div>
            <span className="font-mono text-[11px] text-paper/40">consent_record.json</span>
          </div>
          <pre className="flex-1 overflow-x-auto p-5 font-mono text-[12px] leading-[1.9] sm:p-7 sm:text-[13px]">
            <code>
              <span className="text-paper/40">{"{"}</span>
              {"\n"}
              {record.map(([key, value, note], i) => (
                <span key={key}>
                  {"  "}
                  <span className="text-paper/55">&quot;{key}&quot;</span>
                  <span className="text-paper/30">: </span>
                  <span className="text-paper">{value}</span>
                  <span className="text-paper/30">{i < record.length - 1 ? "," : ""}</span>
                  {note && <span className="text-paper/30">{"  // "}{note}</span>}
                  {"\n"}
                </span>
              ))}
              <span className="text-paper/40">{"}"}</span>
            </code>
          </pre>
          <p className="border-t border-line px-5 py-3.5 text-[12px] text-paper/45 sm:px-7">
            Sample record. Every delivered item carries one, available to customers on request.
          </p>
        </div>
      </div>
    </section>
  );
}
