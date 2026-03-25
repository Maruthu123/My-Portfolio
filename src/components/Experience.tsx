import { useEffect, useRef } from 'react'
import { EXPERIENCE, INTERNSHIP } from '../data/experience'
import { getTechIcon } from '../utils/icons'

export const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll('.fi')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const renderTimeline = (data: any[]) => (
    <div className="relative max-w-[820px]">
      <div className="absolute left-[23px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#7c3aed] via-[rgba(59,130,246,0.25)] to-transparent" />

      <div className="flex flex-col gap-5.5">
        {data.map((exp, i) => (
          <div
            key={exp.company + i}
            className="relative pl-[58px] fi"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="absolute left-4 top-6 w-3.5 h-3.5 rounded-full bg-[#050510] border-2 border-[#7c3aed] shadow-[0_0_14px_rgba(124,58,237,0.75)] -translate-x-1/2" />

            <div className="glass glass-hover exp-card p-5.5 group">
              <div className="flex items-start gap-3.5 mb-2.5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 border border-[rgba(255,255,255,0.1)]"
                  style={{ background: exp.iconBg }}
                >
                  {exp.icon}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <div className="font-syne font-extrabold text-[1.1rem] text-[#f1f5f9] mb-0.5">
                        {exp.role}
                      </div>
                      <div className="text-[#a78bfa] font-semibold text-sm">
                        {exp.company}
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full border border-[rgba(124,58,237,0.35)] bg-[rgba(124,58,237,0.1)] text-[#c4b5fd] text-xs font-mono whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm leading-[1.72] text-[rgba(255,255,255,0.52)] mb-3">
                {exp.desc}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {exp.tech.map((t: string) => (
                  <span
                    key={t}
                    className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[rgba(96,165,250,0.1)] text-[#93c5fd] text-xs font-mono"
                  >
                    <img
                      src={getTechIcon(t)}
                      alt={t}
                      className="w-3.5 h-3.5 object-contain"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <section id="experience" ref={sectionRef} className="py-[110px] relative">
      <div className="max-w-[1280px] mx-auto px-6">

        {/* Experience Title */}
        <div className="flex items-center gap-4 mb-10 fi">
          <span className="font-mono text-[#7c3aed] text-sm">03.</span>
          <h2 className="font-syne font-black text-[clamp(1.9rem,5vw,3rem)] text-[#f1f5f9]">
            Experience
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[rgba(124,58,237,0.5)] to-transparent" />
        </div>

        {renderTimeline(EXPERIENCE)}

        {/* Internship Title */}
        <div className="flex items-center gap-4 mt-20 mb-10 fi">
          <span className="font-mono text-[#7c3aed] text-sm">04.</span>
          <h2 className="font-syne font-black text-[clamp(1.7rem,5vw,2.6rem)] text-[#f1f5f9]">
            Internship
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[rgba(124,58,237,0.5)] to-transparent" />
        </div>

        {renderTimeline(INTERNSHIP)}

      </div>
    </section>
  )
}