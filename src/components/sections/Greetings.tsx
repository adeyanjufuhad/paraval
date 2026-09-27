// A slow ribbon of greetings in the languages Paraval starts with and grows into.
const greetings = [
  ["Ẹ kú àárọ̀", "Yoruba"],
  ["Sannu", "Hausa"],
  ["Ndeewo", "Igbo"],
  ["How far?", "Pidgin"],
  ["Habari", "Swahili"],
  ["Akwaaba", "Twi"],
  ["Sawubona", "Zulu"],
  ["Nanga def?", "Wolof"],
  ["Muraho", "Kinyarwanda"],
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14">
      {greetings.map(([word, lang]) => (
        <li key={lang} className="flex items-baseline gap-3 whitespace-nowrap">
          <span className="display text-3xl text-paper/85 sm:text-4xl">{word}</span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-paper/35">{lang}</span>
          <span aria-hidden className="ml-7 h-1 w-1 rounded-full bg-paper/30 sm:ml-11" />
        </li>
      ))}
    </ul>
  );
}

export function Greetings() {
  return (
    <div
      aria-label="Greetings in African languages"
      className="group relative overflow-hidden py-8 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
    >
      <div className="flex w-max animate-[marquee_60s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
