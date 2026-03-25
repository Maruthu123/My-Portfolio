import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, MapPin, Github, FileText, ArrowRight, Send, Loader2 } from 'lucide-react'

export const Contact = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 1800))
    setIsSubmitting(false)
    setIsSuccess(true)
    setTimeout(() => {
      setIsSuccess(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 4000)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-[110px] relative"
      style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 90%,rgba(124,58,237,0.07) 0%,transparent 65%)' }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-center gap-4 mb-13 fi">
          <span className="font-mono text-[#7c3aed] text-sm">05.</span>
          <h2 className="font-syne font-black text-[clamp(1.9rem,5vw,3rem)] text-[#f1f5f9]">Get In Touch</h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[rgba(124,58,237,0.5)] to-transparent" />
        </div>

        <div className="grid md:grid-cols-[2fr_3fr] gap-12">

          {/* LEFT SIDE — Info cards + Resume */}
          <div className="fi">
            <p className="text-base leading-[1.78] text-[rgba(255,255,255,0.5)] mb-7">
              Have a project in mind? Let's build something extraordinary together. I'm always open to exciting opportunities.
            </p>

            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3.5 p-3.5 rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] transition-all hover:border-[rgba(124,58,237,0.3)] hover:bg-[rgba(124,58,237,0.05)]">
                <div className="w-[38px] h-[38px] rounded-[11px] flex items-center justify-center flex-shrink-0 bg-[rgba(124,58,237,0.15)]">
                  <Mail size={18} className="text-[#a78bfa]" />
                </div>
                <div>
                  <div className="text-[0.7rem] text-[rgba(255,255,255,0.3)] mb-0.5">Email</div>
                  <a href="mailto:vmaruthu1437@gmail.com" className="text-[0.86rem] text-[rgba(255,255,255,0.7)] font-medium hover:text-[#a78bfa] transition-colors">vmaruthu1437@gmail.com</a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] transition-all hover:border-[rgba(124,58,237,0.3)] hover:bg-[rgba(124,58,237,0.05)]">
                <div className="w-[38px] h-[38px] rounded-[11px] flex items-center justify-center flex-shrink-0 bg-[rgba(16,185,129,0.15)]">
                  <MapPin size={18} className="text-[#34d399]" />
                </div>
                <div>
                  <div className="text-[0.7rem] text-[rgba(255,255,255,0.3)] mb-0.5">Location</div>
                  <div className="text-[0.86rem] text-[rgba(255,255,255,0.7)] font-medium">Aruppukkottai</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] transition-all hover:border-[rgba(124,58,237,0.3)] hover:bg-[rgba(124,58,237,0.05)]">
                <div className="w-[38px] h-[38px] rounded-[11px] flex items-center justify-center flex-shrink-0 bg-[rgba(59,130,246,0.15)]">
                  <Github size={18} className="text-[#93c5fd]" />
                </div>
                <div>
                  <div className="text-[0.7rem] text-[rgba(255,255,255,0.3)] mb-0.5">GitHub</div>
                  <a href="https://github.com/Maruthu123" target="_blank" rel="noreferrer" className="text-[0.86rem] text-[rgba(255,255,255,0.7)] font-medium hover:text-[#a78bfa] transition-colors">github.com/Maruthu123</a>
                </div>
              </div>
            </div>

            <div
              className="mt-5 p-4 rounded-2xl flex items-center gap-3 transition-all cursor-pointer"
              style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.2),rgba(59,130,246,0.2))', border: '1px solid rgba(124,58,237,0.3)' }}
              onClick={() => navigate('/resume')}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg,rgba(124,58,237,0.3),rgba(59,130,246,0.3))'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg,rgba(124,58,237,0.2),rgba(59,130,246,0.2))'
                e.currentTarget.style.transform = 'none'
              }}
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                <FileText size={22} className="text-white" />
              </div>
              <div>
                <h4 className="font-syne font-bold text-[#f1f5f9] text-[0.95rem] mb-0.5">View / Download Resume</h4>
                <p className="text-[0.78rem] text-[rgba(255,255,255,0.45)]">Full CV with detailed work history & skills</p>
              </div>
              <ArrowRight size={20} className="text-[rgba(255,255,255,0.4)] ml-auto" />
            </div>
          </div>

          {/* RIGHT SIDE — Contact Form */}
          <div className="fi" style={{ transitionDelay: '0.12s' }}>
            <div className="glass glass-hover form-card p-7">
              {!isSuccess ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-3.5 mb-4">
                    <div>
                      <label className="block text-[0.7rem] text-[rgba(255,255,255,0.35)] tracking-wider uppercase mb-1.5">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl text-sm text-[#f1f5f9] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] outline-none transition-all focus:border-[rgba(124,58,237,0.55)] focus:bg-[rgba(124,58,237,0.08)] focus:shadow-[0_0_22px_rgba(124,58,237,0.12)]"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.7rem] text-[rgba(255,255,255,0.35)] tracking-wider uppercase mb-1.5">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl text-sm text-[#f1f5f9] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] outline-none transition-all focus:border-[rgba(124,58,237,0.55)] focus:bg-[rgba(124,58,237,0.08)] focus:shadow-[0_0_22px_rgba(124,58,237,0.12)]"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-[0.7rem] text-[rgba(255,255,255,0.35)] tracking-wider uppercase mb-1.5">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Project collaboration"
                      className="w-full px-4 py-3 rounded-xl text-sm text-[#f1f5f9] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] outline-none transition-all focus:border-[rgba(124,58,237,0.55)] focus:bg-[rgba(124,58,237,0.08)] focus:shadow-[0_0_22px_rgba(124,58,237,0.12)]"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-[0.7rem] text-[rgba(255,255,255,0.35)] tracking-wider uppercase mb-1.5">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="w-full px-4 py-3 rounded-xl text-sm text-[#f1f5f9] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] outline-none transition-all resize-none focus:border-[rgba(124,58,237,0.55)] focus:bg-[rgba(124,58,237,0.08)] focus:shadow-[0_0_22px_rgba(124,58,237,0.12)]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-[13px] font-bold text-sm bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white border-none cursor-pointer shadow-[0_0_40px_rgba(124,58,237,0.28)] transition-all hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(124,58,237,0.45)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <><Loader2 size={16} className="animate-spin" />Sending...</>
                    ) : (
                      <><Send size={16} />Send Message</>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-11">
                  <div className="text-[3.5rem] mb-4">🎉</div>
                  <div className="font-syne font-black text-[1.55rem] text-[#f1f5f9] mb-2">Message Sent!</div>
                  <p className="text-[rgba(255,255,255,0.45)]">Thanks! I'll get back to you within 24 hours.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}