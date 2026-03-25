import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"

import { Navbar } from "./components/Navbar"
import Hero from "./components/Hero"
import { About } from "./components/About"
import { Skills } from "./components/Skills"
import { Experience } from "./components/Experience"
import { Projects } from "./components/Projects"
import { Contact } from "./components/Contact"
import { Footer } from "./components/Footer"
import { ProjectModal } from "./components/ProjectModal"

import Resume from "./components/Resume"
import type { Project } from "./data/projects"

function Portfolio() {

  const [activeSection, setActiveSection] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [modalProject, setModalProject] = useState<Project | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {

    const handleScroll = () => {

      const y = window.scrollY
      setScrolled(y > 60)

      const sections = ["about", "skills", "experience", "projects", "contact"]

      for (const id of sections) {

        const el = document.getElementById(id)

        if (el) {

          const rect = el.getBoundingClientRect()

          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id)
            break
          }

        }

      }

    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)

  }, [])

  const goTo = (id: string) => {

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)

  }

  const goTop = () => {

    window.scrollTo({ top: 0, behavior: "smooth" })
    setMobileMenuOpen(false)

  }

  return (

    <div className="min-h-screen bg-[#050510] text-[#f1f5f9] font-dm overflow-x-hidden">

      <Navbar
        scrolled={scrolled}
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        goTo={goTo}
        goTop={goTop}
      />

      <main>

        <Hero goTo={goTo} />
        <About />
        <Skills />
        <Experience />
        <Projects setModalProject={setModalProject} />
        <Contact />

      </main>

      <Footer goTo={goTo} goTop={goTop} setModalProject={setModalProject} />

      {modalProject && (

        <ProjectModal
          project={modalProject}
          onClose={() => setModalProject(null)}
        />

      )}

    </div>

  )

}

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Portfolio />} />

        <Route path="/resume" element={<Resume />} />

      </Routes>

    </BrowserRouter>

  )

}