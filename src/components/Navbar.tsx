import type { FC } from 'react'
import { FileText, Menu, X } from 'lucide-react'
import { useNavigate } from "react-router-dom";


interface NavbarProps {
  scrolled: boolean
  activeSection: string
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  goTo: (id: string) => void
  goTop: () => void
}

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export const Navbar: FC<NavbarProps> = ({
  scrolled,
  activeSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  goTo,
  goTop,
}) => {
    const navigate = useNavigate();
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-400 ${
        scrolled 
          ? 'bg-[rgba(5,5,16,0.92)] backdrop-blur-[22px] border-b border-[rgba(255,255,255,0.07)]' 
          : ''
      }`}
    >
      <div className="max-w-[1280px] mx-auto h-16 flex items-center justify-between px-6">
        <button 
          onClick={goTop}
          className="font-syne font-black text-[1.15rem] bg-gradient-to-r from-[#a78bfa] to-[#60a5fa] text-gradient"
        >
          &lt;Maruthu v /&gt;
        </button>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => goTo(link.id)}
              className={`relative text-sm font-medium py-1 transition-colors ${
                activeSection === link.id 
                  ? 'text-[#a78bfa] after:w-full' 
                  : 'text-[rgba(255,255,255,0.55)] hover:text-white'
              } after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:bg-gradient-to-r after:from-[#a78bfa] after:to-[#60a5fa] after:rounded-sm after:transition-all after:duration-350`}
            >
              {link.label}
            </button>
          ))}
      <button
  onClick={() => navigate("/resume")}
  className="flex items-center gap-1.5 px-4 py-1.5 rounded-[10px] text-xs font-semibold border border-[rgba(139,92,246,0.4)] text-[#c4b5fd] transition-all hover:bg-[rgba(139,92,246,0.15)] hover:border-[rgba(139,92,246,0.7)]"
>
  <FileText size={13} />
  Resume
</button>
          
          <button 
            onClick={() => goTo('contact')}
            className="px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(124,58,237,0.45)]"
          >
            Hire Me
          </button>
        </div>

        <button 
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X size={24} className="text-white/65" />
          ) : (
            <Menu size={24} className="text-white/65" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col gap-1 px-6 py-3 pb-5 bg-[rgba(5,5,16,0.98)]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => goTo(link.id)}
              className="text-left py-2.5 text-[0.9rem] text-[rgba(255,255,255,0.6)] border-b border-[rgba(255,255,255,0.05)]"
            >
              {link.label}
            </button>
          ))}
          
          <a 
            href="resume.html" 
            target="_blank"
            className="text-left py-2.5 text-[0.9rem] text-[rgba(255,255,255,0.6)] border-b border-[rgba(255,255,255,0.05)]"
          >
            View Resume
          </a>
        </div>
      )}
    </nav>
  )
}
