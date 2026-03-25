import { useEffect, useRef } from 'react'
import { SKILLS } from '../data/skills'
import { getTechIcon } from '../utils/icons'

export const Skills = () => {
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

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="py-[110px] relative"
      style={{ background: 'radial-gradient(ellipse 60% 50% at 25% 50%,rgba(124,58,237,0.05) 0%,transparent 65%)' }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-center gap-4 mb-13 fi">
          <span className="font-mono text-[#7c3aed] text-sm">02.</span>
          <h2 className="font-syne font-black text-[clamp(1.9rem,5vw,3rem)] text-[#f1f5f9]">Skills & Tech</h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[rgba(124,58,237,0.5)] to-transparent" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((skill, i) => (
            <div 
              key={skill.cat}
              className="glass glass-hover skill-card fi p-6"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-center gap-3 mb-4.5">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: skill.bg }}
                  dangerouslySetInnerHTML={{ __html: skill.catSvg }}
                />
                <span className="font-syne font-bold text-base text-[#f1f5f9]">{skill.cat}</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {skill.items.map((item) => (
                  <span 
                    key={item}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] border transition-all hover:-translate-y-0.5 cursor-default"
                    style={{ 
                      borderColor: skill.border, 
                      background: skill.bg,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = skill.border
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = skill.bg
                      e.currentTarget.style.transform = 'none'
                    }}
                  >
                    <span className="w-5 h-5 flex-shrink-0">
                      <img 
                        src={getTechIcon(item)} 
                        alt={item}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                        }}
                      />
                    </span>
                    <span className="text-xs font-medium whitespace-nowrap" style={{ color: skill.color }}>{item}</span>
                  </span>
                ))}
              </div>
            </div> 
          ))}
        </div>
      </div>
    </section>
  )
}
