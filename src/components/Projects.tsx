import { useState, useEffect, useRef } from 'react'
import { PROJECTS } from '../data/projects'
import { getTechIcon } from '../utils/icons'
import { Github, ExternalLink, Search, Download } from 'lucide-react'
import type { Project } from '../data/projects'

interface ProjectsProps {
  setModalProject: (project: Project | null) => void
}

const categories = ['All', ...Array.from(new Set(PROJECTS.map(p => p.cat)))]

export const Projects = ({ setModalProject }: ProjectsProps) => {
  const [filter, setFilter] = useState('All')
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
  }, [filter])

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.cat === filter)

  const downloadProject = (title: string) => {
    const p = PROJECTS.find(x => x.title === title)
    if (!p) return
    const text = `PROJECT: ${p.title}\nSubtitle: ${p.sub}\n\nDescription:\n${p.long}\n\nTech Stack: ${p.tech.join(', ')}\n\nStats:\n${Object.entries(p.stats).map(([k, v]) => k + ': ' + v).join('\n')}\n\nHighlights:\n${p.hl.map(h => '- ' + h).join('\n')}\n\nGitHub: ${p.gh}\nLive: ${p.live}`
    const a = document.createElement('a')
    a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
    a.download = p.title.replace(/\s+/g, '-').toLowerCase() + '-info.txt'
    a.click()
  }

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="py-[110px] relative"
      style={{ background: 'radial-gradient(ellipse 70% 60% at 75% 50%,rgba(59,130,246,0.055) 0%,transparent 65%)' }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-center gap-4 mb-13 fi">
          <span className="font-mono text-[#7c3aed] text-sm">04.</span>
          <h2 className="font-syne font-black text-[clamp(1.9rem,5vw,3rem)] text-[#f1f5f9]">Real Time Projects</h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[rgba(124,58,237,0.5)] to-transparent" />
        </div>

        <p className="text-[rgba(255,255,255,0.4)] text-[0.98rem] mb-7 max-w-[540px] fi">
          A curated showcase of real-world applications — click any card to explore details.
        </p>

        <div className="flex flex-wrap gap-2.5 mb-8.5 fi">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-xl font-semibold text-xs border transition-all ${
                filter === cat 
                  ? 'bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white border-transparent scale-105' 
                  : 'border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] text-[rgba(255,255,255,0.45)] hover:bg-[rgba(255,255,255,0.08)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p, i) => (
            <div 
              key={p.id}
              className="proj-card fi rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(10,10,28,0.88)] backdrop-blur-[20px] overflow-hidden relative cursor-pointer transition-all duration-[450ms] flex flex-col"
              style={{ transitionDelay: `${i * 0.08}s` }}
              onMouseEnter={(e) => {
                const card = e.currentTarget
                card.style.borderColor = p.accent + '40'
                card.style.boxShadow = `0 24px 64px ${p.accent}20, 0 0 0 1px ${p.accent}25`
                card.style.transform = 'translateY(-8px)'
                const title = card.querySelector('.proj-title') as HTMLElement
                if (title) title.style.color = p.accent
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget
                card.style.borderColor = 'rgba(255,255,255,0.08)'
                card.style.boxShadow = '0 4px 24px rgba(0,0,0,0.25)'
                card.style.transform = 'translateY(0)'
                const title = card.querySelector('.proj-title') as HTMLElement
                if (title) title.style.color = '#f1f5f9'
              }}
              onClick={() => setModalProject(p)}
            >
              {p.featured && (
                <div className="absolute -top-px right-[60px] z-[5] px-3 py-1 rounded-b-[10px] bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-xs font-bold text-white">
                  ⭐ Featured
                </div>
              )}
              
              <div 
                className="absolute top-0 right-0 w-[180px] h-[180px] rounded-full blur-[55px] opacity-0 transition-opacity duration-400 pointer-events-none"
                style={{ background: p.accent + '20' }}
              />

              <div className="relative h-[180px] overflow-hidden">
                <div 
                  className="w-full h-full flex items-center justify-center relative"
                  style={{ background: p.imgBg }}
                >
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] text-[3.5rem] opacity-60">{p.emoji}</span>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% to-[rgba(10,10,28,0.95)]" />
                </div>
                <div 
                  className="absolute top-3 left-3 px-3 py-1 rounded-full text-[0.7rem] font-bold backdrop-blur-[10px]"
                  style={{ background: p.accent + '22', color: p.accent, border: `1px solid ${p.accent}40` }}
                >
                  {p.cat}
                </div>
                <a 
                  href={p.gh} 
                  target="_blank"
                  className="absolute top-3 right-[52px] w-[34px] h-[34px] rounded-[10px] bg-[rgba(0,0,0,0.5)] backdrop-blur-[10px] border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-[rgba(255,255,255,0.7)] transition-all hover:bg-[rgba(255,255,255,0.2)] hover:text-white hover:scale-110"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={14} className="text-white" />
                </a>
                <a 
                  href={p.live} 
                  target="_blank"
                  className="absolute top-3 right-3 w-[34px] h-[34px] rounded-[10px] bg-[rgba(0,0,0,0.5)] backdrop-blur-[10px] border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-[rgba(255,255,255,0.7)] transition-all hover:bg-[rgba(255,255,255,0.2)] hover:text-white hover:scale-110"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={13} strokeWidth={2.5} className="text-white" />
                </a>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-2.5">
                  <span 
                    className="px-2.5 py-0.5 rounded-md text-[0.68rem] font-mono font-bold"
                    style={{ background: p.accent + '18', color: p.accent }}
                  >
                    {p.cat}
                  </span>
                </div>
                <div className="proj-title font-syne font-black text-[1.18rem] text-[#f1f5f9] mb-0.5 transition-colors">{p.title}</div>
                <div className="text-[rgba(255,255,255,0.35)] text-[0.78rem] font-medium mb-2">{p.sub}</div>
                <p className="text-[rgba(255,255,255,0.52)] text-[0.83rem] leading-[1.65] mb-3.5 flex-1">{p.desc}</p>
                
                <div className="grid grid-cols-3 gap-1.5 p-2.5 rounded-xl bg-[rgba(255,255,255,0.026)] border border-[rgba(255,255,255,0.06)] mb-3">
                  {Object.entries(p.stats).map(([k, v]) => (
                    <div key={k} className="text-center">
                      <div className="font-syne font-black text-[0.86rem]" style={{ color: p.accent }}>{v}</div>
                      <div className="text-[0.62rem] text-[rgba(255,255,255,0.3)] capitalize">{k}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1 mb-3.5">
                  {p.tech.slice(0, 4).map((t) => (
                    <span 
                      key={t}
                      className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[0.68rem] font-mono border"
                      style={{ borderColor: p.accent + '28', background: p.accent + '10', color: p.accent + 'cc' }}
                    >
                      <img 
                        src={getTechIcon(t)} 
                        alt={t}
                        className="w-3 h-3 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                        }}
                      />
                      {t}
                    </span>
                  ))}
                  {p.tech.length > 4 && (
                    <span className="text-[rgba(255,255,255,0.3)] text-[0.68rem] px-1 py-0.5 font-mono">+{p.tech.length - 4}</span>
                  )}
                </div>

                <div className="flex gap-2 mt-2.5">
                  <button 
                    className="flex-1 py-2 rounded-[10px] text-[0.76rem] font-semibold flex items-center justify-center gap-1 transition-all"
                    style={{ background: p.accent + '15', color: p.accent, border: `1px solid ${p.accent}30` }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setModalProject(p)
                    }}
                  >
                    <Search size={13} strokeWidth={2} />
                    View Details
                  </button>
                  <a 
                    href={p.live}
                    target="_blank"
                    className="flex-1 py-2 rounded-[10px] text-[0.76rem] font-semibold flex items-center justify-center gap-1 transition-all bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.65)] border border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.1)]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={13} strokeWidth={2} />
                    Live Demo
                  </a>
                  <button 
                    className="flex-1 py-2 rounded-[10px] text-[0.76rem] font-semibold flex items-center justify-center gap-1 transition-all bg-[rgba(52,211,153,0.08)] text-[#34d399] border border-[rgba(52,211,153,0.25)] hover:bg-[rgba(52,211,153,0.15)]"
                    onClick={(e) => {
                      e.stopPropagation()
                      downloadProject(p.title)
                    }}
                  >
                    <Download size={13} strokeWidth={2} />
                    Info
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
