import { ImageResponse } from "next/og";

// The preview card shown when the link is shared on WhatsApp, X and LinkedIn.
export const alt = "Paraval: AI that sees the whole world.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori needs TTF/OTF, so ask Google Fonts for the TTF build (at build time).
async function font(family: string, italic = false) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:ital@${italic ? 1 : 0}&display=swap`,
    { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.24 (KHTML, like Gecko)" } },
  ).then((r) => r.text());
  const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`Could not load ${family}`);
  return fetch(url).then((r) => r.arrayBuffer());
}

export default async function Image() {
  const [serif, serifItalic] = await Promise.all([font("Instrument+Serif"), font("Instrument+Serif", true)]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#050505", position: "relative", fontFamily: "Serif" }}>
        {/* Orbit and sight lines */}
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", inset: 0 }}>
          <ellipse cx="600" cy="690" rx="560" ry="200" fill="none" stroke="#F5F5F5" strokeOpacity="0.5" strokeWidth="2" />
          <ellipse cx="600" cy="690" rx="470" ry="160" fill="none" stroke="#F5F5F5" strokeOpacity="0.16" strokeWidth="1.5" />
          <ellipse cx="600" cy="690" rx="660" ry="240" fill="none" stroke="#F5F5F5" strokeOpacity="0.1" strokeWidth="1.5" />
          <line x1="190" y1="552" x2="960" y2="120" stroke="#F5F5F5" strokeOpacity="0.28" strokeWidth="1.5" />
          <line x1="1080" y1="590" x2="960" y2="120" stroke="#F5F5F5" strokeOpacity="0.28" strokeWidth="1.5" />
          <circle cx="190" cy="552" r="6" fill="#F5F5F5" />
          <circle cx="1080" cy="590" r="6" fill="#F5F5F5" />
          <circle cx="960" cy="120" r="44" fill="#F5F5F5" fillOpacity="0.07" />
          <circle cx="960" cy="120" r="18" fill="#F5F5F5" fillOpacity="0.18" />
          <circle cx="960" cy="120" r="7" fill="#FFFFFF" />
          {[
            [120, 90], [300, 180], [470, 60], [720, 210], [1110, 80], [1040, 300], [80, 330], [640, 110], [860, 340],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="#F5F5F5" fillOpacity="0.5" />
          ))}
        </svg>

        <div style={{ display: "flex", flexDirection: "column", padding: "72px 80px", position: "relative" }}>
          <div style={{ display: "flex", fontFamily: "Inter, sans-serif", fontSize: 20, letterSpacing: 8, color: "#F5F5F5" }}>PARAVAL</div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 70, fontSize: 104, lineHeight: 1, color: "#F5F5F5", letterSpacing: -2 }}>
            <div style={{ display: "flex" }}>
              AI that&nbsp;<span style={{ fontFamily: "SerifItalic" }}>sees</span>&nbsp;the
            </div>
            <div style={{ display: "flex" }}>
              whole&nbsp;<span style={{ fontFamily: "SerifItalic" }}>world.</span>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: 34, fontFamily: "Inter, sans-serif", fontSize: 24, color: "#8A8A8A" }}>
            Get paid to test and teach AI in your own language.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Serif", data: serif, style: "normal", weight: 400 },
        { name: "SerifItalic", data: serifItalic, style: "normal", weight: 400 },
      ],
    },
  );
}
