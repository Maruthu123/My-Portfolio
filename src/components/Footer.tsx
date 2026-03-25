import { useEffect, useRef } from 'react'
import { Github, Linkedin, Twitter, Mail, FileText, Eye, Download, Home, User, Wrench, Briefcase, FolderGit2, MessageSquare, MapPin, ChevronUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PROJECTS } from '../data/projects'
import { FOOTER_TECH } from '../data/skills'
import { getTechIcon } from '../utils/icons'
import type { Project } from '../data/projects'

interface FooterProps {
  goTo: (id: string) => void
  goTop: () => void
  setModalProject: (project: Project | null) => void
}

const navLinks = [
  { id: 'about', label: 'About Me', icon: User },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'contact', label: 'Contact', icon: MessageSquare },
]

const projectEmojis = ['🧠', '💎', '🌸', '🔥', '🌍', '🌿']

export const Footer = ({ goTo, goTop, setModalProject }: FooterProps) => {
  const footerRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()

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

    const elements = footerRef.current?.querySelectorAll('.fi')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // ✅ View Resume — opens /resume route in new tab
  const viewResume = () => {
    window.open('/resume', '_blank')
  }

  // ✅ Download Resume — triggers file download
  const downloadResume = () => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'       // put your actual PDF path here (e.g. /Maruthu_Resume.pdf)
    link.download = 'Maruthu_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-[#06060f] border-t border-[rgba(255,255,255,0.06)]">
      <div className="absolute -left-[100px] -bottom-[80px] w-[400px] h-[300px] rounded-full bg-[rgba(124,58,237,0.12)] blur-[80px] pointer-events-none" />
      <div className="absolute -right-[80px] -top-[60px] w-[360px] h-[280px] rounded-full bg-[rgba(59,130,246,0.1)] blur-[80px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#7c3aed] via-[#3b82f6] via-[#10b981] via-[#f59e0b] to-transparent bg-[length:200%_100%] animate-gradient-shift" />

      <div className="max-w-[1280px] mx-auto px-6 pt-[60px] pb-10">

        {/* ✅ Resume Banner */}
        <div
          className="flex items-center justify-between gap-5 p-5 rounded-[18px] mb-8 flex-wrap fi"
          style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.15),rgba(59,130,246,0.15))', border: '1px solid rgba(124,58,237,0.25)' }}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-[46px] h-[46px] rounded-[13px] bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
              <FileText size={22} className="text-white" />
            </div>
            <div>
              <h4 className="font-syne font-bold text-[#f1f5f9] text-[0.95rem] mb-0.5">📋 My Resume is Available</h4>
              <p className="text-[0.78rem] text-[rgba(255,255,255,0.4)]">View my full work history, skills, projects & achievements</p>
            </div>
          </div>
          <div className="flex gap-2.5 flex-wrap">
            {/* ✅ View — opens /resume page */}
            <button
              onClick={viewResume}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-[11px] bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white text-[0.82rem] font-semibold transition-all hover:scale-[1.04] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
            >
              <Eye size={14} />
              View Resume
            </button>
            {/* ✅ Download — downloads PDF */}
            <button
              onClick={downloadResume}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-[11px] border border-[rgba(52,211,153,0.35)] text-[#34d399] text-[0.82rem] font-semibold transition-all hover:bg-[rgba(52,211,153,0.1)] hover:scale-[1.04]"
            >
              <Download size={14} />
              Download CV
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">

          {/* Brand */}
          <div className="fi">
            <div className="font-syne font-black text-[1.6rem] bg-gradient-to-r from-[#a78bfa] to-[#60a5fa] text-gradient mb-2.5">&lt;Maruthu v /&gt;</div>
            <p className="text-[0.9rem] text-[rgba(255,255,255,0.45)] leading-[1.65] mb-5 max-w-[280px]">
              Full Stack Developer crafting beautiful, performant digital experiences. Open to exciting opportunities worldwide.
            </p>
            <div className="flex gap-2.5 flex-wrap">
              <a href="https://github.com/Maruthu123" target="_blank" rel="noreferrer" className="w-[38px] h-[38px] rounded-[11px] border border-[rgba(255,255,255,0.1)] flex items-center justify-center transition-all hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] group relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-[#2d2d2d] to-[#484848]" />
                <Github size={17} className="text-[rgba(255,255,255,0.45)] group-hover:text-white transition-colors relative z-10" />
              </a>
              <a href="https://www.linkedin.com/in/maruthu-v-62929624a" target="_blank" rel="noreferrer" className="w-[38px] h-[38px] rounded-[11px] border border-[rgba(255,255,255,0.1)] flex items-center justify-center transition-all hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] group relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-[#0077b5] to-[#00a0dc]" />
                <Linkedin size={17} className="text-[rgba(255,255,255,0.45)] group-hover:text-white transition-colors relative z-10" />
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="w-[38px] h-[38px] rounded-[11px] border border-[rgba(255,255,255,0.1)] flex items-center justify-center transition-all hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] group relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-[#1da1f2] to-[#0d8ecf]" />
                <Twitter size={17} className="text-[rgba(255,255,255,0.45)] group-hover:text-white transition-colors relative z-10" />
              </a>
              <a href="mailto:vmaruthu1437@gmail.com" className="w-[38px] h-[38px] rounded-[11px] border border-[rgba(255,255,255,0.1)] flex items-center justify-center transition-all hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] group relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-[#7c3aed] to-[#3b82f6]" />
                <Mail size={17} className="text-[rgba(255,255,255,0.45)] group-hover:text-white transition-colors relative z-10" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="fi" style={{ transitionDelay: '0.08s' }}>
            <div className="font-syne font-bold text-[0.82rem] text-[#f1f5f9] uppercase tracking-wider mb-4.5 flex items-center gap-2">
              Navigation
              <span className="flex-1 h-[1px] bg-gradient-to-r from-[rgba(255,255,255,0.1)] to-transparent" />
            </div>
            <nav className="flex flex-col gap-2.5">
              <button onClick={goTop} className="flex items-center gap-2 text-[0.86rem] text-[rgba(255,255,255,0.45)] transition-all hover:text-[#a78bfa] hover:pl-1 text-left">
                <Home size={14} className="opacity-50" />
                Home
              </button>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => goTo(link.id)}
                  className="flex items-center gap-2 text-[0.86rem] text-[rgba(255,255,255,0.45)] transition-all hover:text-[#a78bfa] hover:pl-1 text-left"
                >
                  <link.icon size={14} className="opacity-50" />
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Projects */}
          <div className="fi" style={{ transitionDelay: '0.14s' }}>
            <div className="font-syne font-bold text-[0.82rem] text-[#f1f5f9] uppercase tracking-wider mb-4.5 flex items-center gap-2">
              Projects
              <span className="flex-1 h-[1px] bg-gradient-to-r from-[rgba(255,255,255,0.1)] to-transparent" />
            </div>
            <nav className="flex flex-col gap-2.5">
              {PROJECTS.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setModalProject(p)}
                  className="flex items-center gap-2 text-[0.86rem] text-[rgba(255,255,255,0.45)] transition-all hover:text-[#a78bfa] hover:pl-1 text-left"
                >
                  <span className="text-[0.9rem]">{projectEmojis[i]}</span>
                  {p.title}
                </button>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="fi" style={{ transitionDelay: '0.2s' }}>
            <div className="font-syne font-bold text-[0.82rem] text-[#f1f5f9] uppercase tracking-wider mb-4.5 flex items-center gap-2">
              Connect
              <span className="flex-1 h-[1px] bg-gradient-to-r from-[rgba(255,255,255,0.1)] to-transparent" />
            </div>
            <div className="flex flex-col gap-2.5">
              <a href="mailto:vmaruthu1437@gmail.com" className="flex items-center gap-2 text-[0.86rem] text-[rgba(255,255,255,0.45)] transition-all hover:text-[#a78bfa] hover:pl-1">
                <Mail size={14} className="opacity-50" />
                vmaruthu1437@gmail.com
              </a>
              <a href="https://github.com/Maruthu123" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[0.86rem] text-[rgba(255,255,255,0.45)] transition-all hover:text-[#a78bfa] hover:pl-1">
                <Github size={14} />
                github.com/Maruthu123
              </a>
              <a href="https://www.linkedin.com/in/maruthu-v-62929624a" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[0.86rem] text-[rgba(255,255,255,0.45)] transition-all hover:text-[#a78bfa] hover:pl-1">
                <Linkedin size={14} />
                linkedin.com/in/Maruthu
              </a>
              {/* ✅ Resume link — navigates to /resume route */}
              <button
                onClick={() => navigate('/resume')}
                className="flex items-center gap-2 text-[0.86rem] text-[rgba(255,255,255,0.45)] transition-all hover:text-[#a78bfa] hover:pl-1 text-left"
              >
                <FileText size={14} className="opacity-50" />
                Resume / CV
              </button>
              <span className="flex items-center gap-2 text-[0.86rem] text-[rgba(255,255,255,0.45)]">
                <MapPin size={14} className="opacity-50" />
                Aruppukkottai, Tamilnadu, India.
              </span>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="py-6 border-t border-b border-[rgba(255,255,255,0.06)] mb-8 fi">
          <div className="text-[0.72rem] text-[rgba(255,255,255,0.3)] uppercase tracking-wider mb-3.5 font-semibold">🛠️ Built with & proficient in</div>
          <div className="flex flex-wrap gap-3 items-center">
            {FOOTER_TECH.map((name) => (
              <div key={name} className="flex flex-col items-center gap-1 cursor-default transition-transform hover:-translate-y-1 group">
                <img
                  src={getTechIcon(name)}
                  alt={name}
                  className="w-7 h-7 object-contain opacity-65 grayscale-[30%] group-hover:opacity-100 group-hover:grayscale-0 transition-all"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                <span className="text-[0.58rem] text-[rgba(255,255,255,0.3)] font-mono group-hover:text-[rgba(255,255,255,0.6)] transition-colors">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap pt-5 border-t border-[rgba(255,255,255,0.05)]">
          <div className="text-[0.78rem] text-[rgba(255,255,255,0.28)] flex items-center gap-1.5 flex-wrap">
            <span>© 2026</span>
            <strong className="text-[rgba(255,255,255,0.5)]">Maruthu v</strong>
            <span>— All rights reserved.</span>
            <span>Made with <span className="text-[#f43f5e] animate-pulse">❤</span> and <span className="text-[#f59e0b]">☕</span> in India.</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-md text-[0.68rem] font-semibold font-mono bg-[rgba(124,58,237,0.15)] text-[#a78bfa] border border-[rgba(124,58,237,0.25)]">🔒 Open to Work</span>
            <span className="px-2.5 py-1 rounded-md text-[0.68rem] font-semibold font-mono bg-[rgba(16,185,129,0.12)] text-[#34d399] border border-[rgba(16,185,129,0.25)]">✅ Available Freelance</span>
          </div>
          <button
            onClick={goTop}
            className="flex items-center gap-1.5 text-[0.78rem] text-[rgba(255,255,255,0.35)] transition-all hover:text-[#a78bfa]"
          >
            Back to Top
            <ChevronUp size={16} className="transition-transform hover:-translate-y-[3px]" />
          </button>
        </div>
      </div>
    </footer>
  )
}