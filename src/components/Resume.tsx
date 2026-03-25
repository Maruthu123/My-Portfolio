import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import React from "react";

// ─────────────────────────────────────────────────────────────────────────────
// ALL styles are inside Shadow DOM — 100% isolated, zero leakage to portfolio
// ─────────────────────────────────────────────────────────────────────────────

const RESUME_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :host { display: block; }
  .root { min-height:100vh; background:#050510; color:#f1f5f9; font-family:'DM Sans',sans-serif; overflow-x:hidden; position:relative; }
  a { text-decoration:none; color:inherit; }
  @keyframes hfade { from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);} }
  @keyframes rotate360 { from{transform:rotate(0deg);}to{transform:rotate(360deg);} }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:.5;transform:scale(.9);} }
  @keyframes gradientShift { 0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;} }

  .page-bg { position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse 70% 50% at 15% 20%,rgba(124,58,237,.18) 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 85% 80%,rgba(59,130,246,.13) 0%,transparent 55%),#050510; }
  .grid-overlay { position:fixed;inset:0;z-index:0;opacity:.05;pointer-events:none;background-image:linear-gradient(rgba(139,92,246,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,.4) 1px,transparent 1px);background-size:64px 64px; }
  .wrapper { position:relative;z-index:1;max-width:960px;margin:0 auto;padding:48px 24px 80px; }

  .back-btn { display:inline-flex;align-items:center;gap:8px;padding:8px 18px;border-radius:10px;border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.5);font-size:.8rem;font-weight:500;margin-bottom:36px;transition:all .3s;cursor:pointer;background:none;font-family:'DM Sans',sans-serif; }
  .back-btn:hover { border-color:rgba(139,92,246,.5);color:#c4b5fd;background:rgba(139,92,246,.08); }

  .header-card { position:relative;overflow:hidden;border-radius:24px;border:1px solid rgba(255,255,255,.09);background:rgba(255,255,255,.028);backdrop-filter:blur(24px);padding:40px 44px;margin-bottom:24px;animation:hfade .7s ease forwards; }
  .header-glow { position:absolute;top:-80px;right:-60px;width:320px;height:280px;border-radius:50%;background:rgba(124,58,237,.2);filter:blur(80px);pointer-events:none; }
  .header-glow2 { position:absolute;bottom:-60px;left:-40px;width:260px;height:220px;border-radius:50%;background:rgba(59,130,246,.12);filter:blur(80px);pointer-events:none; }
  .header-top-bar { height:2px;background:linear-gradient(90deg,#7c3aed,#3b82f6,#10b981);background-size:200% 100%;animation:gradientShift 4s ease infinite;border-radius:2px;margin-bottom:32px; }
  .header-inner { display:grid;grid-template-columns:auto 1fr auto;gap:32px;align-items:center; }
  @media(max-width:680px){ .header-inner{grid-template-columns:1fr;text-align:center;gap:20px;} .header-actions{align-items:center !important;} }

  .avatar-wrap { position:relative;width:100px;height:100px;flex-shrink:0; }
  .avatar-ring { position:absolute;inset:-6px;border-radius:50%;background:conic-gradient(#7c3aed,#3b82f6,#10b981,#f59e0b,#7c3aed);animation:rotate360 6s linear infinite; }
  .avatar-ring-inner { position:absolute;inset:2px;border-radius:50%;background:#050510; }
  .avatar-img { position:absolute;inset:6px;border-radius:50%;background:linear-gradient(135deg,rgba(124,58,237,.35),rgba(59,130,246,.35));display:flex;align-items:center;justify-content:center;overflow:hidden; }
  .avatar-img svg { width:54px;height:54px;fill:rgba(167,139,250,.6); }
  .status-dot { position:absolute;bottom:4px;right:4px;width:14px;height:14px;border-radius:50%;background:#10b981;border:2px solid #050510;animation:pulse 2s ease-in-out infinite; }

  .header-name { font-family:'Syne',sans-serif;font-weight:900;font-size:clamp(1.8rem,5vw,2.8rem);line-height:1.1;margin-bottom:6px; }
  .header-name span { background:linear-gradient(135deg,#a78bfa,#60a5fa,#34d399);-webkit-background-clip:text;-webkit-text-fill-color:transparent; }
  .header-role { font-family:'Syne',sans-serif;font-weight:700;font-size:1rem;color:rgba(255,255,255,.5);margin-bottom:14px; }
  .header-tags { display:flex;flex-wrap:wrap;gap:8px; }
  .htag  { padding:4px 12px;border-radius:99px;border:1px solid rgba(139,92,246,.35);background:rgba(139,92,246,.1);color:#c4b5fd;font-size:.7rem;font-weight:600; }
  .htag-g{ padding:4px 12px;border-radius:99px;border:1px solid rgba(16,185,129,.35);background:rgba(16,185,129,.1);color:#6ee7b7;font-size:.7rem;font-weight:600; }
  .htag-b{ padding:4px 12px;border-radius:99px;border:1px solid rgba(96,165,250,.35);background:rgba(96,165,250,.1);color:#93c5fd;font-size:.7rem;font-weight:600; }

  .header-actions { display:flex;flex-direction:column;gap:10px;align-items:flex-end; }
  .btn-dl { display:flex;align-items:center;gap:8px;padding:10px 20px;border-radius:12px;font-weight:600;font-size:.8rem;background:linear-gradient(135deg,#7c3aed,#3b82f6);color:#fff;box-shadow:0 0 30px rgba(124,58,237,.3);transition:transform .2s,box-shadow .2s;border:none;cursor:pointer;font-family:'DM Sans',sans-serif; }
  .btn-dl:hover { transform:scale(1.05);box-shadow:0 0 50px rgba(124,58,237,.5); }
  .btn-dl:disabled { opacity:0.7;cursor:not-allowed;transform:none; }
  .btn-port { display:flex;align-items:center;gap:6px;padding:9px 18px;border-radius:12px;font-weight:600;font-size:.78rem;border:1px solid rgba(52,211,153,.35);color:#34d399;transition:all .3s;background:none;cursor:pointer;font-family:'DM Sans',sans-serif; }
  .btn-port:hover { background:rgba(52,211,153,.1);transform:scale(1.04); }

  .contact-strip { display:flex;flex-wrap:wrap;gap:16px;margin-top:28px;padding-top:24px;border-top:1px solid rgba(255,255,255,.07); }
  .ci { display:flex;align-items:center;gap:8px;font-size:.8rem;color:rgba(255,255,255,.5); }
  .ci svg { width:14px;height:14px;flex-shrink:0;opacity:.7; }
  .ci a { color:rgba(255,255,255,.5);transition:color .2s; }
  .ci a:hover { color:#a78bfa; }

  .section { margin-bottom:20px;border-radius:20px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.026);backdrop-filter:blur(20px);overflow:hidden;transition:border-color .3s; }
  .section:hover { border-color:rgba(255,255,255,.14); }
  .sec-head { display:flex;align-items:center;gap:14px;padding:22px 32px;border-bottom:1px solid rgba(255,255,255,.06); }
  .sec-icon { width:38px;height:38px;border-radius:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
  .sec-icon svg { width:18px;height:18px; }
  .sec-title { font-family:'Syne',sans-serif;font-weight:800;font-size:1rem;color:#f1f5f9;flex:1; }
  .sec-num { font-family:monospace;font-size:.75rem;color:rgba(255,255,255,.25); }
  .sec-body { padding:24px 32px; }
  @media(max-width:580px){ .sec-body{padding:18px 20px;} .sec-head{padding:16px 20px;} .header-card{padding:28px 22px;} }

  .about-text { font-size:.92rem;line-height:1.85;color:rgba(255,255,255,.58); }
  .about-text strong { color:#a78bfa; }

  .details-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px; }
  .d-item { display:flex;flex-direction:column;gap:3px; }
  .d-label { font-size:.67rem;color:rgba(255,255,255,.28);text-transform:uppercase;letter-spacing:.08em;font-weight:600; }
  .d-val { font-size:.88rem;color:rgba(255,255,255,.75);font-weight:500; }
  .d-val a { color:#a78bfa;transition:color .2s; }
  .d-val a:hover { color:#c4b5fd; }

  .timeline { position:relative;padding-left:28px; }
  .timeline::before { content:'';position:absolute;left:7px;top:8px;bottom:8px;width:1px;background:linear-gradient(180deg,rgba(124,58,237,.6),rgba(59,130,246,.3),transparent); }
  .ti { position:relative;margin-bottom:24px; }
  .ti:last-child { margin-bottom:0; }
  .ti::before { content:'';position:absolute;left:-24px;top:10px;width:10px;height:10px;border-radius:50%;border:2px solid #7c3aed;background:#050510;box-shadow:0 0 12px rgba(124,58,237,.6); }
  .tc { padding:22px 24px;border-radius:16px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.025);transition:all .3s; }
  .tc:hover { border-color:rgba(139,92,246,.35);background:rgba(139,92,246,.06);transform:translateX(4px); }
  .tc-top { display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:6px;flex-wrap:wrap; }
  .tc-role { font-family:'Syne',sans-serif;font-weight:800;font-size:.95rem;color:#f1f5f9; }
  .tc-period { padding:3px 10px;border-radius:99px;background:rgba(124,58,237,.15);border:1px solid rgba(124,58,237,.3);color:#c4b5fd;font-size:.68rem;font-weight:600;white-space:nowrap;font-family:monospace; }
  .tc-org { font-size:.82rem;color:#a78bfa;font-weight:600;margin-bottom:6px; }
  .tc-loc { font-size:.78rem;color:rgba(255,255,255,.35);margin-bottom:10px; }
  .tc-desc { font-size:.84rem;line-height:1.75;color:rgba(255,255,255,.5); }
  .tc-desc ul { padding-left:16px;margin-top:6px; }
  .tc-desc ul li { margin-bottom:4px; }
  .tc-chips { display:flex;flex-wrap:wrap;gap:6px;margin-top:12px; }
  .tc-grade { display:inline-flex;align-items:center;gap:6px;margin-top:10px;padding:5px 12px;border-radius:99px;background:rgba(52,211,153,.1);border:1px solid rgba(52,211,153,.3);color:#34d399;font-size:.73rem;font-weight:700; }

  .ck  { padding:3px 10px;border-radius:99px;font-size:.68rem;font-weight:600;border:1px solid rgba(139,92,246,.3);background:rgba(139,92,246,.1);color:#c4b5fd; }
  .ck-g{ padding:3px 10px;border-radius:99px;font-size:.68rem;font-weight:600;border:1px solid rgba(16,185,129,.3);background:rgba(16,185,129,.1);color:#6ee7b7; }
  .ck-b{ padding:3px 10px;border-radius:99px;font-size:.68rem;font-weight:600;border:1px solid rgba(96,165,250,.3);background:rgba(96,165,250,.1);color:#93c5fd; }
  .ck-a{ padding:3px 10px;border-radius:99px;font-size:.68rem;font-weight:600;border:1px solid rgba(245,158,11,.3);background:rgba(245,158,11,.1);color:#fcd34d; }
  .ck-r{ padding:3px 10px;border-radius:99px;font-size:.68rem;font-weight:600;border:1px solid rgba(244,63,94,.3);background:rgba(244,63,94,.1);color:#fda4af; }

  .sk-cats { display:flex;flex-direction:column;gap:18px; }
  .sk-row { display:flex;flex-direction:column;gap:8px; }
  .sk-head { display:flex;align-items:center;gap:10px; }
  .sk-icon { width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
  .sk-icon svg { width:14px;height:14px; }
  .sk-label { font-size:.78rem;font-weight:700;font-family:'Syne',sans-serif;text-transform:uppercase;letter-spacing:.06em; }
  .sk-chips { display:flex;flex-wrap:wrap;gap:7px; }
  .skc { display:flex;align-items:center;gap:6px;padding:5px 13px;border-radius:99px;font-size:.76rem;font-weight:600;border:1px solid;transition:all .2s;cursor:default; }
  .skc:hover { transform:translateY(-2px); }
  .skc img { width:15px;height:15px;object-fit:contain; }

  .ach-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px; }
  .ach-card { padding:16px 18px;border-radius:14px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.022);display:flex;gap:12px;align-items:flex-start;transition:all .3s; }
  .ach-card:hover { border-color:rgba(139,92,246,.35);transform:translateY(-3px); }
  .ach-e { font-size:1.4rem;flex-shrink:0; }
  .ach-t { font-family:'Syne',sans-serif;font-weight:700;font-size:.82rem;color:#f1f5f9;margin-bottom:3px; }
  .ach-s { font-size:.72rem;color:rgba(255,255,255,.38); }

  .lang-row { display:flex;flex-wrap:wrap;gap:12px; }
  .lang-item { display:flex;align-items:center;gap:10px;padding:10px 16px;border-radius:12px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.022); }
  .lang-n { font-size:.84rem;font-weight:600;color:rgba(255,255,255,.7); }
  .lang-l { font-size:.7rem;color:rgba(255,255,255,.35); }

  .foot-note { text-align:center;margin-top:40px;color:rgba(255,255,255,.2);font-size:.75rem;font-family:monospace; }
  .foot-note a { color:#7c3aed; }
  .foot-note span { color:#f43f5e; }

  /* Loading overlay for PDF generation */
  .pdf-loading { position:fixed;inset:0;z-index:9999;background:rgba(5,5,16,.85);backdrop-filter:blur(8px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px; }
  .pdf-spinner { width:48px;height:48px;border:3px solid rgba(124,58,237,.2);border-top-color:#7c3aed;border-radius:50%;animation:rotate360 .8s linear infinite; }
  .pdf-loading-text { font-family:'Syne',sans-serif;font-weight:700;font-size:.95rem;color:rgba(255,255,255,.6); }
`;

const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

// ── Shadow DOM Wrapper ───────────────────────────────────────────────────────
function IsolatedShell({ children }: { children: React.ReactNode }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = React.useState(false);

  useEffect(() => {
    if (!hostRef.current || mountRef.current) return;
    const shadow = hostRef.current.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = RESUME_CSS;
    const mount = document.createElement("div");
    shadow.appendChild(style);
    shadow.appendChild(mount);
    mountRef.current = mount;
    setReady(true);
  }, []);

  return (
    <div ref={hostRef} style={{ display: "block", minHeight: "100vh" }}>
      {ready && mountRef.current && ReactDOM.createPortal(children, mountRef.current)}
    </div>
  );
}

// ── PDF Download — clones content outside Shadow DOM so html2pdf can render it
const downloadPDF = async (setLoading: (v: boolean) => void) => {
  setLoading(true);

  try {
    // Dynamically import html2pdf to avoid SSR issues
    const html2pdf = (await import("html2pdf.js")).default;

    // ── Build a self-contained clone of the resume ──────────────────────────
    const container = document.createElement("div");
    container.style.cssText =
      "position:fixed;left:-9999px;top:0;width:960px;background:#050510;color:#f1f5f9;font-family:'DM Sans',sans-serif;z-index:-1;";

    // Inject Google Fonts + all resume CSS into a <style> tag
    const styleTag = document.createElement("style");
    styleTag.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
      ${RESUME_CSS
        .replace(/:host\s*\{[^}]*\}/g, "")          // remove :host rule (invalid outside shadow)
        .replace(/@import[^;]+;/g, "")               // remove @import (already added above)
      }
      /* PDF overrides */
      .page-bg,.grid-overlay { display:none !important; }
      .root { background:#050510 !important; }
      .wrapper { padding:32px 24px 60px !important; }
      .back-btn,.btn-port { display:none !important; }
      * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    `;
    container.appendChild(styleTag);

    // Clone the resume .wrapper content
    const shadow = document.querySelector("[data-resume-host]")?.shadowRoot;
    const wrapperSource = shadow
      ? shadow.querySelector(".wrapper")
      : document.querySelector(".wrapper");

    if (!wrapperSource) {
      // Fallback: try reading directly from any shadow root on page
      const allHosts = document.querySelectorAll("*");
      let found: Element | null = null;
      allHosts.forEach((el) => {
        if ((el as any).shadowRoot?.querySelector(".wrapper")) {
          found = (el as any).shadowRoot.querySelector(".wrapper");
        }
      });
      if (found) {
        const clone = (found as Element).cloneNode(true) as HTMLElement;
        clone.style.cssText = "max-width:960px;margin:0 auto;padding:32px 24px;";
        container.appendChild(clone);
      }
    } else {
      const clone = wrapperSource.cloneNode(true) as HTMLElement;
      clone.style.cssText = "max-width:960px;margin:0 auto;padding:32px 24px;";
      container.appendChild(clone);
    }

    document.body.appendChild(container);

    const opt = {
      margin: [8, 8, 8, 8],
      filename: "Maruthu_Resume.pdf",
      image: { type: "jpeg", quality: 0.97 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#050510",
        logging: false,
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    await html2pdf().set(opt).from(container).save();
    document.body.removeChild(container);
  } catch (err) {
    console.error("PDF generation failed:", err);
    // Fallback: open print dialog
    window.print();
  } finally {
    setLoading(false);
  }
};

// ── Resume Component ─────────────────────────────────────────────────────────
export default function Resume() {
  const navigate = useNavigate();
  const [pdfLoading, setPdfLoading] = React.useState(false);
  const hostRef = useRef<HTMLDivElement>(null);

  const content = (
    <div className="root">
      {pdfLoading && (
        <div className="pdf-loading">
          <div className="pdf-spinner" />
          <div className="pdf-loading-text">Generating PDF…</div>
        </div>
      )}
      <div className="page-bg" />
      <div className="grid-overlay" />
      <div className="wrapper">

        {/* BACK */}
        <button className="back-btn" onClick={() => navigate("/")}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Portfolio
        </button>

        {/* HEADER */}
        <div className="header-card">
          <div className="header-glow" /><div className="header-glow2" /><div className="header-top-bar" />
          <div className="header-inner">
            <div className="avatar-wrap">
              <div className="avatar-ring" /><div className="avatar-ring-inner" />
              <div className="avatar-img">
                <svg viewBox="0 0 100 100"><circle cx={50} cy={35} r={22} /><ellipse cx={50} cy={85} rx={35} ry={25} /></svg>
              </div>
              <div className="status-dot" />
            </div>
            <div>
              <h1 className="header-name"><span>Maruthu v</span></h1>
              <div className="header-role">Full Stack Developer &nbsp;·&nbsp; Open Source Contributor</div>
              <div className="header-tags">
                <span className="htag">✅ Open to Work</span>
                <span className="htag-g">⚡ Available Freelance</span>
                <span className="htag-b">🇮🇳 India</span>
              </div>
            </div>
            <div className="header-actions">
              {/* ✅ Download button — triggers PDF generation */}
              <button
                className="btn-dl"
                disabled={pdfLoading}
                onClick={() => downloadPDF(setPdfLoading)}
              >
                {pdfLoading ? (
                  <>
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ animation: "rotate360 .8s linear infinite" }}>
                      <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" opacity=".25" /><path d="M21 12a9 9 0 0 0-9-9" />
                    </svg>
                    Generating…
                  </>
                ) : (
                  <>
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1={12} y1={15} x2={12} y2={3} />
                    </svg>
                    Download PDF
                  </>
                )}
              </button>
              <button className="btn-port" onClick={() => navigate("/")}>
                <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                View Portfolio
              </button>
            </div>
          </div>
          <div className="contact-strip">
            <div className="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><a href="mailto:vmaruthu1437@gmail.com">vmaruthu1437@gmail.com</a></div>
            <div className="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>+91 6383718976</div>
            <div className="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx={12} cy={10} r={3}/></svg>Aruppukkottai, Tamil Nadu, India</div>
            <div className="ci"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg><a href="https://github.com/Maruthu123" target="_blank" rel="noreferrer">github.com/Maruthu123</a></div>
            <div className="ci"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx={4} cy={4} r={2}/></svg><a href="https://www.linkedin.com/in/maruthu-v-62929624a" target="_blank" rel="noreferrer">linkedin.com/in/maruthu</a></div>
          </div>
        </div>

        {/* 01 · SUMMARY */}
        <div className="section">
          <div className="sec-head">
            <div className="sec-icon" style={{background:"rgba(167,139,250,.12)"}}><svg viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth={2}><circle cx={12} cy={8} r={4}/><path d="M20 21a8 8 0 1 0-16 0"/></svg></div>
            <span className="sec-title">Professional Summary</span><span className="sec-num">01</span>
          </div>
          <div className="sec-body">
            <p className="about-text">Passionate <strong>Full Stack Developer</strong> with 1x+ years of experience building scalable, high-performance web applications. Specialized in <strong>React, Node.js, and cloud-native architectures</strong>. I love turning complex business problems into clean, elegant solutions — from pixel-perfect UIs to robust distributed backends.</p>
          </div>
        </div>

        {/* 02 · PERSONAL DETAILS */}
        <div className="section">
          <div className="sec-head">
            <div className="sec-icon" style={{background:"rgba(96,165,250,.12)"}}><svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth={2}><rect x={3} y={4} width={18} height={18} rx={2}/><path d="M16 2v4M8 2v4M3 10h18"/></svg></div>
            <span className="sec-title">Personal Details</span><span className="sec-num">02</span>
          </div>
          <div className="sec-body">
            <div className="details-grid">
              {[["Full Name","Maruthu v"],["Date of Birth","25 / 02 / 2003"],["Gender","Male"],["Nationality","Indian 🇮🇳"],["Languages Known","Tamil, English"],["Marital Status","Single"],["Address","Aruppukkottai, Viruthunagar District, Tamil Nadu - 625001"],["Email","vmaruthu1437@gmail.com","mailto:vmaruthu1437@gmail.com"],["Phone","+91 6383718976"],["LinkedIn","linkedin.com/in/maruthu","https://www.linkedin.com/in/maruthu-v-62929624a"],["GitHub","github.com/Maruthu123","https://github.com/Maruthu123"],["Portfolio","Maruthu.dev","https://panum.dev"]].map(([l,v,href])=>(
                <div className="d-item" key={l}><span className="d-label">{l}</span><span className="d-val">{href?<a href={href as string} target={(href as string).startsWith("http")?"_blank":undefined} rel="noreferrer">{v}</a>:v}</span></div>
              ))}
            </div>
          </div>
        </div>

        {/* 03 · SKILLS */}
        <div className="section">
          <div className="sec-head">
            <div className="sec-icon" style={{background:"rgba(52,211,153,.12)"}}><svg viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth={2}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></div>
            <span className="sec-title">Technical Skills</span><span className="sec-num">03</span>
          </div>
          <div className="sec-body">
            <div className="sk-cats">
              {[
                {l:"Frontend",c:"#818cf8",bg:"rgba(129,140,248,.15)",cs:{borderColor:"rgba(129,140,248,.35)",background:"rgba(129,140,248,.1)",color:"#c7d2fe"},svg:<svg viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth={2}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,items:[{n:"React",s:`${DI}/react/react-original.svg`},{n:"Next.js",s:`${DI}/nextjs/nextjs-original.svg`},{n:"TypeScript",s:`${DI}/typescript/typescript-original.svg`},{n:"JavaScript",s:`${DI}/javascript/javascript-original.svg`},{n:"Redux",s:`${DI}/redux/redux-original.svg`},{n:"HTML5/CSS3"}]},
                {l:"Backend",c:"#34d399",bg:"rgba(52,211,153,.12)",cs:{borderColor:"rgba(52,211,153,.3)",background:"rgba(52,211,153,.1)",color:"#6ee7b7"},svg:<svg viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth={2}><rect x={2} y={3} width={20} height={14} rx={2}/><line x1={8} y1={21} x2={16} y2={21}/><line x1={12} y1={17} x2={12} y2={21}/></svg>,items:[{n:"Node.js",s:`${DI}/nodejs/nodejs-original.svg`},{n:"Express",s:`${DI}/express/express-original.svg`},{n:"Python",s:`${DI}/python/python-original.svg`},{n:"Django",s:`${DI}/django/django-plain.svg`},{n:"GraphQL",s:`${DI}/graphql/graphql-plain.svg`},{n:"REST APIs"}]},
                {l:"Databases",c:"#f59e0b",bg:"rgba(245,158,11,.12)",cs:{borderColor:"rgba(245,158,11,.3)",background:"rgba(245,158,11,.1)",color:"#fcd34d"},svg:<svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth={2}><ellipse cx={12} cy={5} rx={9} ry={3}/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,items:[{n:"PostgreSQL",s:`${DI}/postgresql/postgresql-original.svg`},{n:"MongoDB",s:`${DI}/mongodb/mongodb-original.svg`},{n:"MySQL",s:`${DI}/mysql/mysql-original.svg`},{n:"Redis",s:`${DI}/redis/redis-original.svg`},{n:"Firebase",s:`${DI}/firebase/firebase-plain.svg`}]},
                {l:"DevOps & Cloud",c:"#60a5fa",bg:"rgba(96,165,250,.12)",cs:{borderColor:"rgba(96,165,250,.3)",background:"rgba(96,165,250,.1)",color:"#93c5fd"},svg:<svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth={2}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,items:[{n:"AWS",s:`${DI}/amazonwebservices/amazonwebservices-original.svg`},{n:"Docker",s:`${DI}/docker/docker-original.svg`},{n:"Kubernetes",s:`${DI}/kubernetes/kubernetes-plain.svg`},{n:"Git",s:`${DI}/git/git-original.svg`},{n:"Linux",s:`${DI}/linux/linux-original.svg`},{n:"CI/CD"}]},
                {l:"Soft Skills",c:"#fb7185",bg:"rgba(251,113,133,.1)",cs:{borderColor:"rgba(251,113,133,.3)",background:"rgba(251,113,133,.1)",color:"#fda4af"},svg:<svg viewBox="0 0 24 24" fill="none" stroke="#fb7185" strokeWidth={2}><circle cx={12} cy={12} r={10}/><line x1={2} y1={12} x2={22} y2={12}/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,items:[{n:"Problem Solving"},{n:"Team Leadership"},{n:"Agile / Scrum"},{n:"Communication"},{n:"Time Management"}]},
              ].map(({l,c,bg,cs,svg,items})=>(
                <div className="sk-row" key={l}>
                  <div className="sk-head"><div className="sk-icon" style={{background:bg}}>{svg}</div><span className="sk-label" style={{color:c}}>{l}</span></div>
                  <div className="sk-chips">{items.map(({n,s}:any)=><span key={n} className="skc" style={cs}>{s&&<img src={s} alt={n}/>}{n}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 04 · WORK EXPERIENCE */}
        <div className="section">
          <div className="sec-head">
            <div className="sec-icon" style={{background:"rgba(124,58,237,.15)"}}><svg viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth={2}><rect x={2} y={7} width={20} height={14} rx={2}/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></div>
            <span className="sec-title">Work Experience</span><span className="sec-num">04</span>
          </div>
          <div className="sec-body">
            <div className="timeline">
              {[
                {r:"Full Stack Developer",p:"2025 – 2026",o:"Growwake Private Limited",l:"📍 Trichy, Tamil Nadu (Full Time)",pts:["Developed and maintained scalable full-stack web applications used by thousands of active users","Built responsive UI components using React and optimized frontend performance for faster loading","Designed RESTful APIs with Node.js and integrated them with modern frontend frameworks","Implemented secure authentication, role-based access control and data validation","Collaborated with designers and backend teams to deliver high-quality production features on time"],chips:[["React","ck"],["Node.js","ck"],["AWS","ck-b"],["Docker","ck-b"],["PostgreSQL","ck-g"],["Kubernetes","ck-a"]]},
                {r:"Data Operator & Technical Support",p:"2020 – 2022",o:"NB Media Tech Private Limited",l:"📍 Madurai, Tamil Nadu (On-site)",pts:["Handled large volumes of data entry, validation and database updates with high accuracy and efficiency","Provided technical support to clients by diagnosing software, system and display related issues","Maintained system records, reports and documentation to ensure smooth operational workflow","Assisted users with troubleshooting hardware and application problems through calls and remote support","Collaborated with internal teams to resolve technical issues quickly and improve service response time"],chips:[["Technical Support","ck"],["Data Management","ck-g"],["System Troubleshooting","ck-a"],["Customer Support","ck-b"]]},
              ].map(({r,p,o,l,pts,chips})=>(
                <div className="ti" key={r}><div className="tc">
                  <div className="tc-top"><span className="tc-role">{r}</span><span className="tc-period">{p}</span></div>
                  <div className="tc-org">{o}</div><div className="tc-loc">{l}</div>
                  <div className="tc-desc"><ul>{pts.map(pt=><li key={pt}>{pt}</li>)}</ul></div>
                  <div className="tc-chips">{chips.map(([n,c])=><span key={n} className={c}>{n}</span>)}</div>
                </div></div>
              ))}
            </div>
          </div>
        </div>

        {/* 05 · INTERNSHIP */}
        <div className="section">
          <div className="sec-head">
            <div className="sec-icon" style={{background:"rgba(16,185,129,.12)"}}><svg viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth={2}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
            <span className="sec-title">Internship</span><span className="sec-num">05</span>
          </div>
          <div className="sec-body">
            <div className="timeline">
              {[
                {r:"Web Development Intern",p:"Jun 2023 – Aug 2023 · 3 months",o:"Crystal Delta",l:"📍 Chennai, Tamil Nadu",pts:["Completed a 3-month internship at Crystal Delta, working on frontend web development projects using HTML, CSS and JavaScript","Developed responsive web pages and UI components ensuring compatibility across different devices and browsers","Assisted the development team in building and improving website layouts and user interface features","Debugged and fixed UI issues while optimizing page structure and styling for better performance","Collaborated with senior developers to understand real-world development workflows and version control practices"],chips:[["HTML","ck"],["CSS","ck-g"],["JavaScript","ck-a"],["Responsive Design","ck"]]},
                {r:"Java Full Stack Developer Intern",p:"3 Months Internship",o:"Inmakes Infotech Private Limited",l:"📍 Cochin, Kerala (On-site)",pts:["Completed a 3-month internship focused on Java full stack development and modern web application practices","Developed responsive web pages using HTML, CSS and JavaScript integrated with Java backend components","Built and tested RESTful APIs using Java and Spring Boot for handling application data","Worked with MySQL database to perform CRUD operations and manage structured data efficiently","Collaborated with senior developers to debug issues, optimize code and understand real-world software development workflows"],chips:[["Java","ck-r"],["Spring Boot","ck-b"],["MySQL","ck-g"],["HTML/CSS","ck"],["JavaScript","ck-a"]]},
              ].map(({r,p,o,l,pts,chips})=>(
                <div className="ti" key={r}><div className="tc">
                  <div className="tc-top"><span className="tc-role">{r}</span><span className="tc-period">{p}</span></div>
                  <div className="tc-org">{o}</div><div className="tc-loc">{l}</div>
                  <div className="tc-desc"><ul>{pts.map(pt=><li key={pt}>{pt}</li>)}</ul></div>
                  <div className="tc-chips">{chips.map(([n,c])=><span key={n} className={c}>{n}</span>)}</div>
                </div></div>
              ))}
            </div>
          </div>
        </div>

        {/* 06 · COLLEGE */}
        <div className="section">
          <div className="sec-head">
            <div className="sec-icon" style={{background:"rgba(245,158,11,.12)"}}><svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth={2}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></div>
            <span className="sec-title">College / University</span><span className="sec-num">06</span>
          </div>
          <div className="sec-body">
            <div className="timeline"><div className="ti"><div className="tc">
              <div className="tc-top"><span className="tc-role">B.E. Computer Science &amp; Engineering</span><span className="tc-period">2013 – 2017</span></div>
              <div className="tc-org">Anna University – Sree Sowdambike College of Engineering, Madurai</div>
              <div className="tc-loc">📍 Aruppukkottai, Tamil Nadu</div>
              <div className="tc-desc">Focused on data structures, algorithms, software engineering, DBMS and web technologies. Actively participated in hackathons and coding competitions.</div>
              <div className="tc-grade">🎓 CGPA: 7.10 / 10 &nbsp;·&nbsp; First Class with Distinction</div>
              <div className="tc-chips"><span className="ck">Data Structures</span><span className="ck">Algorithms</span><span className="ck-b">DBMS</span><span className="ck-g">OS</span><span className="ck-a">Networks</span><span className="ck">OOP</span></div>
            </div></div></div>
          </div>
        </div>

        {/* 07 · SCHOOL */}
        <div className="section">
          <div className="sec-head">
            <div className="sec-icon" style={{background:"rgba(251,113,133,.1)"}}><svg viewBox="0 0 24 24" fill="none" stroke="#fb7185" strokeWidth={2}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
            <span className="sec-title">School Details</span><span className="sec-num">07</span>
          </div>
          <div className="sec-body">
            <div className="timeline">
              {[
                {r:"Higher Secondary (Class XII) – HSC",p:"2019 – 2020",o:"Govt High School Tamilpadi, Viruthunagar District",l:"📍 Aruppukkottai, TN · Tamil Nadu State Board",d:"Completed Higher Secondary with Computer Science as main subject. Secured high marks in Mathematics and Science.",g:"📊 Percentage: 54.86% · Grade: A+",chips:[["Computer Science","ck-r"],["Mathematics","ck-a"],["Physics","ck-b"],["Chemistry","ck-g"]]},
                {r:"Secondary School (Class X) – SSLC",p:"2018 – 2019",o:"Govt High School Tamilpadi, Viruthunagar District",l:"📍 Aruppukkottai, TN · Tamil Nadu State Board",d:"Completed SSLC with excellent scores. Participated in science fairs and inter-school quiz competitions.",g:"📊 Percentage: 74% · Grade: B+",chips:[["Science","ck"],["Maths","ck-a"],["Social Science","ck-b"],["Tamil","ck-r"],["English","ck-g"]]},
              ].map(({r,p,o,l,d,g,chips})=>(
                <div className="ti" key={r}><div className="tc">
                  <div className="tc-top"><span className="tc-role">{r}</span><span className="tc-period">{p}</span></div>
                  <div className="tc-org">{o}</div><div className="tc-loc">{l}</div>
                  <div className="tc-desc">{d}</div>
                  <div className="tc-grade">{g}</div>
                  <div className="tc-chips">{chips.map(([n,c])=><span key={n} className={c}>{n}</span>)}</div>
                </div></div>
              ))}
            </div>
          </div>
        </div>

        {/* 08 · ACHIEVEMENTS */}
        <div className="section">
          <div className="sec-head">
            <div className="sec-icon" style={{background:"rgba(96,165,250,.12)"}}><svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth={2}><circle cx={12} cy={8} r={6}/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg></div>
            <span className="sec-title">Achievements &amp; Certifications</span><span className="sec-num">08</span>
          </div>
          <div className="sec-body">
            <div className="ach-grid">
              {[{e:"🥇",t:"Best Intern Award",s:"Infosys BPM Ltd · 2017"},{e:"☁️",t:"AWS Certified Developer",s:"Amazon Web Services · 2021"},{e:"⚛️",t:"Meta React Certification",s:"Meta / Coursera · 2020"},{e:"🏆",t:"Hackathon Winner",s:"Smart India Hackathon · 2016"},{e:"🐍",t:"Python for Data Science",s:"IBM / Coursera · 2019"},{e:"⭐",t:"2.8K GitHub Stars",s:"Open Source Projects · 2023"}].map(({e,t,s})=>(
                <div className="ach-card" key={t}><span className="ach-e">{e}</span><div><div className="ach-t">{t}</div><div className="ach-s">{s}</div></div></div>
              ))}
            </div>
          </div>
        </div>

        {/* 09 · LANGUAGES */}
        <div className="section">
          <div className="sec-head">
            <div className="sec-icon" style={{background:"rgba(167,139,250,.12)"}}><svg viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth={2}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
            <span className="sec-title">Languages</span><span className="sec-num">09</span>
          </div>
          <div className="sec-body">
            <div className="lang-row">
              {[{f:"🇮🇳",n:"Tamil",l:"Native"},{f:"🇬🇧",n:"English",l:"Professional Fluency"}].map(({f,n,l})=>(
                <div className="lang-item" key={n}><span style={{fontSize:"1.2rem"}}>{f}</span><div><div className="lang-n">{n}</div><div className="lang-l">{l}</div></div></div>
              ))}
            </div>
          </div>
        </div>

        <div className="foot-note">Made with <span>♥</span> · Last updated March 2026 · <a href="#" onClick={(e)=>{e.preventDefault();navigate("/");}}>View Portfolio →</a></div>
      </div>
    </div>
  );

  return (
    <div ref={hostRef} data-resume-host="true">
      <IsolatedShell>{content}</IsolatedShell>
    </div>
  );
}