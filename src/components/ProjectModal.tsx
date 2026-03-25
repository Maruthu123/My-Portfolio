import { useEffect } from 'react'
import { X, Github, ExternalLink, Download } from 'lucide-react'
import { getTechIcon } from '../utils/icons'
import type { Project } from '../data/projects'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const downloadProject = () => {
    const text = `PROJECT: ${project.title}\nSubtitle: ${project.sub}\n\nDescription:\n${project.long}\n\nTech Stack: ${project.tech.join(', ')}\n\nStats:\n${Object.entries(project.stats).map(([k, v]) => k + ': ' + v).join('\n')}\n\nHighlights:\n${project.hl.map(h => '- ' + h).join('\n')}\n\nGitHub: ${project.gh}\nLive: ${project.live}`
    const a = document.createElement('a')
    a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
    a.download = project.title.replace(/\s+/g, '-').toLowerCase() + '-info.txt'
    a.click()
  }

  return (
    <div 
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-[rgba(0,0,0,0.85)] backdrop-blur-[18px] animate-[fadeIn_0.22s_ease]"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-[680px] max-h-[90vh] overflow-y-auto rounded-[28px] bg-[#0c0c1e] relative scrollbar-thin animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="w-full h-[180px] flex items-center justify-center relative rounded-t-[28px]"
          style={{ background: project.imgBg }}
        >
          <span className="text-[5rem] opacity-50">{project.emoji}</span>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% to-[#0c0c1e]" />
        </div>

        <div className="px-7 pb-8 pt-7">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-[34px] h-[34px] rounded-full bg-[rgba(0,0,0,0.5)] backdrop-blur-[10px] border-none text-[rgba(255,255,255,0.7)] flex items-center justify-center transition-all hover:bg-[rgba(255,255,255,0.2)] z-10"
          >
            <X size={16} />
          </button>

          <div className="flex gap-3.5 items-center mb-4.5">
            <div 
              className="w-[58px] h-[58px] rounded-[18px] flex items-center justify-center text-[1.9rem] flex-shrink-0"
              style={{ background: project.accent + '20' }}
            >
              {project.emoji}
            </div>
            <div>
              <div className="font-syne font-black text-[1.65rem] text-[#f1f5f9] mb-0.5">{project.title}</div>
              <div className="text-[0.88rem] font-semibold" style={{ color: project.accent }}>{project.sub}</div>
            </div>
          </div>

          <p className="text-[0.87rem] leading-[1.78] text-[rgba(255,255,255,0.56)] mb-5">{project.long}</p>

          <div className="grid grid-cols-3 gap-2.5 mb-5.5 p-3.5 rounded-2xl bg-[rgba(255,255,255,0.025)] border border-[rgba(255,255,255,0.06)]">
            {Object.entries(project.stats).map(([k, v]) => (
              <div key={k} className="text-center">
                <div className="font-syne font-black text-[1.45rem]" style={{ color: project.accent }}>{v}</div>
                <div className="text-[0.71rem] text-[rgba(255,255,255,0.36)] capitalize">{k}</div>
              </div>
            ))}
          </div>

          <div className="font-syne font-bold text-[#f1f5f9] mb-2.5">✨ Key Highlights</div>
          <div className="grid grid-cols-2 gap-2 mb-5">
            {project.hl.map((h) => (
              <div key={h} className="flex items-center gap-2 text-[0.83rem] text-[rgba(255,255,255,0.56)]">
                <span className="font-bold" style={{ color: project.accent }}>✓</span>
                {h}
              </div>
            ))}
          </div>

          <div className="font-syne font-bold text-[#f1f5f9] mb-2.5">🛠 Tech Stack</div>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span 
                key={t}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-[9px] border text-[0.79rem] font-mono"
                style={{ borderColor: project.accent + '30', background: project.accent + '12', color: project.accent }}
              >
                <img 
                  src={getTechIcon(t)} 
                  alt={t}
                  className="w-4 h-4 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-2.5">
            <a 
              href={project.gh}
              target="_blank"
              className="flex-1 py-3 rounded-[13px] border border-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.7)] text-center font-semibold text-[0.85rem] transition-all hover:bg-[rgba(255,255,255,0.05)] flex items-center justify-center gap-1.5"
            >
              <Github size={16} className="fill-current" />
              View Code
            </a>
            <a 
              href={project.live}
              target="_blank"
              className="flex-1 py-3 rounded-[13px] text-white text-center font-semibold text-[0.85rem] transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5"
              style={{ background: project.grad }}
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
            <button 
              onClick={downloadProject}
              className="px-5 py-3 rounded-[13px] border border-[rgba(52,211,153,0.35)] text-[#34d399] font-semibold text-[0.85rem] transition-all hover:bg-[rgba(52,211,153,0.1)] flex items-center gap-1.5"
            >
              <Download size={16} />
              Download Info
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.88) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}
