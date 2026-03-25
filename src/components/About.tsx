import { useEffect, useRef } from "react";
import { FileText, Download, Code2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { icon: "📅", value: "7+", label: "Years Experience" },
  { icon: "🚀", value: "60+", label: "Projects Shipped" },
  { icon: "😊", value: "40+", label: "Happy Clients" },
  { icon: "⭐", value: "2.8K", label: "GitHub Stars" },
];

const tags = [
  "💡 Problem Solver",
  "✨ Clean Code",
  "⚡ Performance",
  "🤝 Team Player",
];

export const About = () => {
  const sectionRef = useRef(null);

  // 👉 navigate create பண்ணணும்
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".fi");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // 👉 Resume page open
  const goToResume = () => {
    navigate("/resume");
  };

  // 👉 Resume download
  const downloadResume = () => {
    window.open("/resume.pdf", "_blank");
  };

  return (
    <section id="about" ref={sectionRef} className="py-[110px] relative">
      <div className="max-w-[1280px] mx-auto px-6">

        {/* Heading */}
        <div className="flex items-center gap-4 mb-13 fi">
          <span className="font-mono text-[#7c3aed] text-sm">01.</span>
          <h2 className="font-syne font-black text-[clamp(1.9rem,5vw,3rem)] text-[#f1f5f9]">
            About Me
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[rgba(124,58,237,0.5)] to-transparent" />
        </div>

        <div className="grid md:grid-cols-[1fr_1.6fr] gap-16 items-center mb-13">

          {/* Profile Image */}
          <div className="flex justify-center fi" style={{ transitionDelay: "0.05s" }}>
            <div className="relative w-[280px] h-[280px]">

              <div className="absolute -inset-2 rounded-full bg-[conic-gradient(#7c3aed,#3b82f6,#10b981,#f59e0b,#f43f5e,#7c3aed)] animate-spin-slow" />

              <div className="absolute inset-[3px] rounded-full bg-[#050510]" />

              <div className="absolute inset-2 rounded-full overflow-hidden">
                <img
                  src="/me1.jpeg"
                  alt="Maruthu"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute bottom-2.5 -right-2.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#059669] to-[#0d9488] text-xs font-bold text-white shadow-[0_4px_20px_rgba(5,150,105,0.4)]">
                ✓ Open to Work
              </div>

              <div className="absolute top-2.5 -left-2.5 w-11 h-11 rounded-[14px] bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] flex items-center justify-center text-xl shadow-[0_4px_20px_rgba(124,58,237,0.4)]">
                <Code2 size={22} className="text-white" />
              </div>
            </div>
          </div>

          {/* About Text */}
          <div className="fi" style={{ transitionDelay: "0.12s" }}>

            <p className="text-base leading-[1.8] text-[rgba(255,255,255,0.58)] mb-4.5">
              I'm a passionate <strong className="text-[#a78bfa]">Developer</strong> with
              experience in building scalable applications and solving real-world
              technical challenges.
            </p>

            <p className="text-base leading-[1.8] text-[rgba(255,255,255,0.58)] mb-4.5">
              I also have hands-on experience in{" "}
              <strong className="text-[#60a5fa]">Technical Support</strong> and{" "}
              <strong className="text-[#fbbf24]">Data Analysis</strong>, helping
              businesses troubleshoot systems and turn data into insights.
            </p>

            <p className="text-base leading-[1.8] text-[rgba(255,255,255,0.58)] mb-4.5">
              When I'm not coding, I'm exploring new tools and technologies.
              Based in <strong className="text-[#34d399]">India 🇮🇳</strong>.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2.5 mt-2 mb-5.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-full border border-[rgba(139,92,246,0.35)] bg-[rgba(139,92,246,0.1)] text-[#c4b5fd] text-xs font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 flex-wrap mt-2">

              {/* View Resume */}
              <button
                onClick={goToResume}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-[14px] bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white font-semibold text-sm transition-all hover:scale-[1.04] hover:shadow-[0_0_50px_rgba(124,58,237,0.5)]"
              >
                <FileText size={18} />
                View Full Resume
              </button>

              {/* Download Resume */}
              <button
                onClick={downloadResume}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-[14px] border border-[rgba(52,211,153,0.4)] text-[#34d399] font-semibold text-sm transition-all hover:bg-[rgba(52,211,153,0.1)] hover:scale-[1.04]"
              >
                <Download size={16} strokeWidth={2.5} />
                Download CV
              </button>

            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass glass-hover stat-card fi text-center py-6 px-4"
              style={{ transitionDelay: `${0.05 + i * 0.07}s` }}
            >
              <div className="text-[1.8rem] mb-2">{stat.icon}</div>

              <div className="font-syne font-black text-[2.4rem] bg-gradient-to-r from-[#a78bfa] to-[#60a5fa] text-gradient mb-1.5">
                {stat.value}
              </div>

              <div className="text-[rgba(255,255,255,0.42)] text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};