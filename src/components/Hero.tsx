import { useState, useEffect, useRef } from "react";


// ─────────────────────────────────────────────────────────────

const ROLES: string[] = [
  "Full Stack Developer",
  "React Specialist",
  "Technical Support Engineer",
  "Frontend Enthusiast",
  "Open Source Contributor",
];

interface SocialItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const SOCIALS: SocialItem[] = [
  {
    label: "GitHub",
    href: "https://github.com/Maruthu123",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/maruthu-v-62929624a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
  label: "Email",
  href: "mailto:vmaruthu1437@gmail.com",
  icon: (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"/>
    </svg>
  ),
},
];

// ✅ Fix 1 & 2: `words` typed as string[], timer `t` typed as ReturnType<typeof setTimeout>
function useTypewriter(words: string[]): string {
  const [display, setDisplay] = useState<string>("");
  const ref = useRef<{ wi: number; ci: number; del: boolean; alive: boolean }>({
    wi: 0,
    ci: 0,
    del: false,
    alive: true,
  });

  useEffect(() => {
    const s = ref.current;
    s.alive = true;
    // ✅ Fix 3: typed as ReturnType<typeof setTimeout>
    let t: ReturnType<typeof setTimeout>;

    const tick = (): void => {
      if (!s.alive) return;
      const word = words[s.wi];
      if (!s.del) {
        if (s.ci < word.length) {
          s.ci++;
          setDisplay(word.slice(0, s.ci));
          t = setTimeout(tick, 80);
        } else {
          t = setTimeout(() => {
            s.del = true;
            tick();
          }, 2000);
        }
      } else {
        if (s.ci > 0) {
          s.ci--;
          setDisplay(word.slice(0, s.ci));
          t = setTimeout(tick, 40);
        } else {
          s.del = false;
          s.wi = (s.wi + 1) % words.length;
          t = setTimeout(tick, 180);
        }
      }
    };

    t = setTimeout(tick, 600);
    return () => {
      s.alive = false;
      clearTimeout(t);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return display;
}

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  dur: string;
  delay: string;
  color: string;
}

const PARTICLES: Particle[] = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  size: Math.random() * 3 + 1.5,
  x: Math.random() * 100,
  y: Math.random() * 100,
  dur: (Math.random() * 6 + 5).toFixed(1),
  delay: (Math.random() * 4).toFixed(1),
  color: (["rgba(139,92,246,.6)", "rgba(96,165,250,.5)", "rgba(52,211,153,.45)", "rgba(251,113,133,.4)"] as const)[i % 4],
}));

// ✅ Fix 4: `goTo` properly typed with optional
interface HeroProps {
  goTo?: (section: string) => void;
}

export default function Hero({ goTo }: HeroProps) {
  const role = useTypewriter(ROLES);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #03030f;
          --surface: rgba(255,255,255,.04);
          --border: rgba(255,255,255,.08);
          --violet: #7c3aed;
          --blue: #3b82f6;
          --mint: #34d399;
          --text: rgba(255,255,255,.9);
          --muted: rgba(255,255,255,.42);
        }

        @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatUp  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
        @keyframes spin360  { to{transform:rotate(360deg)} }
        @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse2   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.45;transform:scale(.8)} }
        @keyframes particle { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-22px) scale(1.12)} }
        @keyframes glowPulse{ 0%,100%{opacity:.5} 50%{opacity:.9} }
        @keyframes scrollDot{ 0%,100%{transform:translateY(0);opacity:1} 65%{transform:translateY(14px);opacity:0} }
        @keyframes shimmer  { 0%{background-position:200% center} 100%{background-position:-200% center} }

        .a1{animation:fadeUp .65s cubic-bezier(.16,1,.3,1) both .05s}
        .a2{animation:fadeUp .65s cubic-bezier(.16,1,.3,1) both .18s}
        .a3{animation:fadeUp .65s cubic-bezier(.16,1,.3,1) both .30s}
        .a4{animation:fadeUp .65s cubic-bezier(.16,1,.3,1) both .42s}
        .a5{animation:fadeUp .65s cubic-bezier(.16,1,.3,1) both .54s}
        .a6{animation:fadeUp .65s cubic-bezier(.16,1,.3,1) both .66s}

        .hero-root {
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
          padding: 80px 24px 60px;
          background: var(--bg);
          font-family: 'DM Sans', sans-serif;
        }
        .bg-mesh {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 70% 55% at 50% 0%, rgba(124,58,237,.22) 0%, transparent 60%),
            radial-gradient(ellipse 55% 45% at 90% 85%, rgba(59,130,246,.15) 0%, transparent 55%),
            radial-gradient(ellipse 40% 35% at 8% 70%, rgba(52,211,153,.10) 0%, transparent 50%);
        }
        .bg-grid {
          position: absolute; inset: 0; pointer-events: none; opacity: .055;
          background-image:
            linear-gradient(rgba(139,92,246,.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,.5) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .hero-inner {
          position: relative; z-index: 10;
          max-width: 1080px; width: 100%;
          display: flex; align-items: center;
          justify-content: space-between; gap: 56px;
        }
        @media(max-width:820px){
          .hero-inner { flex-direction: column-reverse; text-align: center; gap: 40px; }
          .socials-row, .btns-row, .role-row, .chips-row { justify-content: center !important; }
        }
        .hero-text { flex: 1 1 380px; min-width: 280px; }
        .avail-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 5px 14px; border-radius: 999px;
          border: 1px solid rgba(52,211,153,.35);
          background: rgba(52,211,153,.08);
          color: #6ee7b7; font-size: 11.5px; font-weight: 700;
          letter-spacing: .05em; text-transform: uppercase;
          margin-bottom: 22px;
        }
        .avail-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #34d399; animation: pulse2 2s infinite;
        }
        .hero-h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.5rem,6vw,4.8rem);
          font-weight: 900; line-height: 1.03;
          letter-spacing: -.025em;
          color: var(--text); margin-bottom: 6px;
        }
        .name-grad {
          background: linear-gradient(100deg, #c4b5fd 0%, #60a5fa 48%, #34d399 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .role-row {
          height: 46px; display: flex; align-items: center;
          gap: 6px; overflow: hidden; margin-bottom: 18px;
        }
        .role-prefix {
          font-family: 'Syne', sans-serif;
          font-size: clamp(.95rem,2.4vw,1.4rem);
          font-weight: 700; color: var(--muted); white-space: nowrap;
        }
        .role-word {
          font-family: 'Syne', sans-serif;
          font-size: clamp(.95rem,2.4vw,1.4rem);
          font-weight: 800; color: #a78bfa; white-space: nowrap;
        }
        .type-cursor {
          display: inline-block; width: 2px; height: 1.15em;
          background: #7c3aed; border-radius: 2px;
          vertical-align: middle; margin-left: 2px;
          animation: blink 1.1s step-end infinite;
        }
        .chips-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 18px; }
        .chip {
          display: flex; align-items: center; gap: 6px;
          padding: 5px 12px; border-radius: 8px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.07);
          font-size: 12px; font-weight: 600; color: rgba(255,255,255,.48);
        }
        .chip-dot { width: 6px; height: 6px; border-radius: 50%; }
        .hero-desc {
          max-width: 480px; color: var(--muted);
          font-size: 1rem; line-height: 1.8; margin-bottom: 30px;
        }
        .btns-row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 28px; }
        .btn-p {
          display: flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 12px;
          font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 14px;
          background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 55%, #2563eb 100%);
          color: #fff; border: none; cursor: pointer;
          box-shadow: 0 4px 30px rgba(124,58,237,.4), inset 0 1px 0 rgba(255,255,255,.15);
          transition: transform .2s, box-shadow .2s;
        }
        .btn-p:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 8px 48px rgba(124,58,237,.55); }
        .btn-g {
          display: flex; align-items: center; gap: 8px;
          padding: 13px 26px; border-radius: 12px;
          font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 14px;
          background: rgba(255,255,255,.04); color: rgba(255,255,255,.72); cursor: pointer;
          border: 1px solid rgba(255,255,255,.1);
          transition: transform .2s, background .2s, border-color .2s;
        }
        .btn-g:hover { transform: translateY(-2px); background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.2); }
        .btn-m {
          display: flex; align-items: center; gap: 8px;
          padding: 13px 22px; border-radius: 12px;
          font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 14px;
          background: rgba(52,211,153,.07); color: #34d399; text-decoration: none;
          border: 1px solid rgba(52,211,153,.35);
          transition: transform .2s, background .2s;
        }
        .btn-m:hover { transform: translateY(-2px); background: rgba(52,211,153,.14); }
        .socials-row { display: flex; gap: 10px; }
        .social-a {
          width: 42px; height: 42px; border-radius: 12px;
          border: 1px solid var(--border); background: var(--surface);
          display: flex; align-items: center; justify-content: center;
          color: var(--muted); text-decoration: none;
          transition: transform .2s, border-color .2s, color .2s, background .2s;
        }
        .social-a:hover {
          transform: translateY(-3px);
          border-color: rgba(139,92,246,.5);
          background: rgba(139,92,246,.12);
          color: #c4b5fd;
        }
        .photo-col {
          flex-shrink: 0; position: relative;
          animation: floatUp 5.5s ease-in-out infinite;
        }
        .photo-size { width: 270px; height: 270px; border-radius: 50%; position: relative; }
        @media(max-width:520px){ .photo-size{ width:210px; height:210px; } }
        .p-spin {
          position: absolute; inset: -4px; border-radius: 50%;
          background: conic-gradient(from 0deg, #7c3aed, #3b82f6, #34d399, #f472b6, #7c3aed);
          animation: spin360 7s linear infinite;
        }
        .p-gap { position: absolute; inset: 4px; border-radius: 50%; background: var(--bg); }
        .p-img {
          position: absolute; inset: 8px; border-radius: 50%; overflow: hidden;
          background: linear-gradient(135deg,#1e1240,#0f1729);
        }
        .p-img img { width:100%; height:100%; object-fit:cover; border-radius:50%; display:block; }
        .p-glow {
          position: absolute; bottom: -28px; left: 50%; transform: translateX(-50%);
          width: 190px; height: 55px;
          background: radial-gradient(ellipse, rgba(124,58,237,.55) 0%, transparent 70%);
          filter: blur(16px);
          animation: glowPulse 3s ease-in-out infinite;
        }
        .stat-card {
          position: absolute; border-radius: 14px;
          padding: 10px 16px; backdrop-filter: blur(14px);
          box-shadow: 0 8px 32px rgba(0,0,0,.5); z-index: 4;
          display: flex; flex-direction: column; align-items: center;
        }
        .sc-exp { bottom: 12px; right: -18px; background: rgba(5,5,16,.92); border: 1px solid rgba(52,211,153,.4); }
        .sc-proj { top: 16px; left: -18px; background: rgba(5,5,16,.92); border: 1px solid rgba(139,92,246,.4); }
        .stat-num { font-family: 'Syne', sans-serif; font-size: 1.65rem; font-weight: 900; line-height: 1; }
        .stat-lbl { font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: rgba(255,255,255,.42); margin-top: 3px; white-space: nowrap; }
        .scroll-wrap {
          position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 7px;
        }
        .scroll-mouse { width: 23px; height: 37px; border-radius: 12px; border: 2px solid rgba(255,255,255,.17); display: flex; align-items: flex-start; justify-content: center; padding-top: 5px; }
        .scroll-ball { width: 3px; height: 7px; border-radius: 2px; background: #a78bfa; animation: scrollDot 1.6s ease-in-out infinite; }
        .scroll-lbl { font-size: 10px; font-weight: 700; letter-spacing: .08em; color: rgba(255,255,255,.2); text-transform: uppercase; }
      `}</style>

      <section className="hero-root" id="hero">
        <div className="bg-mesh" />
        <div className="bg-grid" />

        {/* particles */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          {PARTICLES.map((p) => (
            <div
              key={p.id}
              style={{
                position: "absolute",
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: `${p.x}%`,
                top: `${p.y}%`,
                borderRadius: "50%",
                background: p.color,
                filter: "blur(1px)",
                opacity: 0.7,
                animation: `particle ${p.dur}s ease-in-out ${p.delay}s infinite`,
              }}
            />
          ))}
        </div>

        <div className="hero-inner">
          {/* ── TEXT ── */}
          <div className="hero-text">
            <div className="avail-badge a1">
              <span className="avail-dot" />
              Available for new projects
            </div>

            <h1 className="hero-h1 a2">
              Hi, I'm <span className="name-grad">Maruthu</span>
            </h1>

            <div className="role-row a3">
              <span className="role-prefix">I'm a&nbsp;</span>
              <span className="role-word">{role}</span>
              <span className="type-cursor" />
            </div>

            <div className="chips-row a4">
              {[
                { color: "#a78bfa", label: "1 yr Experience" },
                { color: "#60a5fa", label: "React · Node · TypeScript" },
                { color: "#34d399", label: "Open to Work" },
              ].map((c) => (
                <div className="chip" key={c.label}>
                  <span className="chip-dot" style={{ background: c.color }} />
                  {c.label}
                </div>
              ))}
            </div>

            <p className="hero-desc a4">
              Building scalable, user-focused web applications with clean code and modern design.
              Passionate about turning ideas into real-world digital solutions that look great and
              perform even better.
            </p>

            <div className="btns-row a5">
              <button className="btn-p" onClick={() => goTo?.("projects")}>
                View My Work
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="btn-g" onClick={() => goTo?.("contact")}>
                Let's Talk
              </button>
              <a href="resume.tsx" target="_blank" rel="noreferrer" className="btn-m">
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M12 15V3m0 12-4-4m4 4 4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Resume
              </a>
            </div>

            <div className="socials-row a6">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-a" title={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── PHOTO ── */}
          <div className="photo-col a2">
            <div className="photo-size">
              <div className="p-spin" />
              <div className="p-gap" />
              <div className="p-img">
                <img src="/me4.jpeg" alt="Maruthu" />
              </div>
            </div>

            <div className="p-glow" />

            <div className="stat-card sc-proj">
              <span
                className="stat-num"
                style={{
                  background: "linear-gradient(135deg,#a78bfa,#60a5fa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                12+
              </span>
              <span className="stat-lbl">Projects</span>
            </div>

            <div className="stat-card sc-exp">
              <span
                className="stat-num"
                style={{
                  background: "linear-gradient(135deg,#34d399,#60a5fa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                1+
              </span>
              <span className="stat-lbl">Yrs Exp.</span>
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div className="scroll-wrap">
          <div className="scroll-mouse">
            <div className="scroll-ball" />
          </div>
          <span className="scroll-lbl">Scroll</span>
        </div>
      </section>
    </>
  );
}