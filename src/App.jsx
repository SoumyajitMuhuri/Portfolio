import React, { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Menu, X } from 'lucide-react'
import projects from './data/projects.js'
import portraitSrc from './public/IMG_20261015_121436770.jpg'

const skills = {
  'Programming Languages': ['JavaScript', 'Java', 'C', 'Python', 'PHP', 'Kotlin'],
  'Core Concepts': ['Object-Oriented Programming (OOP)', 'Data Structures & Algorithms', 'System Design (LLD & HLD Fundamentals)', 'Computer Networks', 'Version Control (Git, GitHub)'],
  'Web Development': ['MERN Stack', 'RESTful APIs', 'JWT Authentication', 'WebSockets', 'HTML5', 'CSS3'],
  Databases: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'OracleDB'],
}

function safeUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return ''
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : ''
  } catch {
    return ''
  }
}

function DemoModal({ project, onClose, returnFocusRef }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const mediaType = project?.demo?.type
  const mediaSrc = project?.demo?.src

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll('button:not([disabled]), video[controls]')
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      returnFocusRef.current?.focus()
    }
  }, [onClose, returnFocusRef])

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="demo-title" ref={dialogRef}>
        <div className="modal-heading">
          <h2 id="demo-title">{project.title} demo</h2>
          <button className="icon-button" type="button" onClick={onClose} ref={closeRef} aria-label="Close demo">
            <X size={19} aria-hidden="true" />
          </button>
        </div>
        {mediaType === 'video' ? (
          <video className="demo-media" src={mediaSrc} controls muted playsInline preload="none" aria-label={`${project.title} demo video`} />
        ) : mediaType === 'gif' ? (
          <img className="demo-media" src={mediaSrc} loading="lazy" alt={`${project.title} demo`} />
        ) : null}
      </div>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDemo, setActiveDemo] = useState(null)
  const demoButtonRef = useRef(null)
  const visibleProjects = projects.filter((project) => project.visible)

  const closeDemo = () => setActiveDemo(null)
  const openDemo = (project, button) => {
    demoButtonRef.current = button
    setActiveDemo(project)
  }

  return (
    <>
      <header className="site-header">
        <nav className="nav-shell" aria-label="Main navigation">
          <button className="icon-button menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="nav-links" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
          <div className={`nav-links${menuOpen ? ' is-open' : ''}`} id="nav-links">
            <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
            <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
            <a href="#education" onClick={() => setMenuOpen(false)}>Education</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About Me</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
          <div className="nav-socials" aria-label="Social links">
            <a className="icon-button" href="https://github.com/SoumyajitMuhuri" target="_blank" rel="noopener noreferrer" aria-label="Visit Soumyajit Muhuri on GitHub">
              <Github size={19} aria-hidden="true" />
            </a>
            <a className="icon-button" href="mailto:muhurisoumyajit@gmail.com" aria-label="Email Soumyajit Muhuri">
              <Mail size={18} aria-hidden="true" />
            </a>
            <a className="icon-button" href="https://www.linkedin.com/in/soumyajit-muhuri-a09329159/" target="_blank" rel="noopener noreferrer" aria-label="Visit Soumyajit Muhuri on LinkedIn">
              <Linkedin size={18} aria-hidden="true" />
            </a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-copy-col">
            <p className="eyebrow"><span className="status-dot" aria-hidden="true" />SOFTWARE ENGINEER | FULL-STACK DEVELOPMENT(MERN)</p>
            <h1 id="hero-title">Soumyajit<br /><span>Muhuri.</span></h1>
            <p className="hero-copy">I build and deploy full-stack software applications, combining solid programming fundamentals with practical experience in backend engineering, databases, distributed systems concepts, and AI integration.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">View Projects <ArrowDownRight size={17} aria-hidden="true" /></a>
              <a className="button button-secondary" href="#contact">Contact Me <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="portrait-frame"><img src={portraitSrc} alt="Soumyajit Muhuri, seated and smiling" fetchPriority="high" /></div>
        </section>

        <section className="section-shell section-block" id="projects" aria-labelledby="projects-title">
          <div className="section-heading">
            <div><p className="eyebrow">Selected work</p><h2 id="projects-title">Projects<span className="brand-dot">.</span></h2></div>
            <span className="section-count">{String(visibleProjects.length).padStart(2, '0')} projects</span>
          </div>
          <div className="project-grid">
            {visibleProjects.map((project, index) => {
              const siteUrl = safeUrl(project.siteUrl)
              const codeUrl = safeUrl(project.codeUrl)
              const hasDemo = ['video', 'gif'].includes(project.demo?.type) && Boolean(project.demo?.src?.trim())
              return (
                <article className="project-card" key={project.id}>
                  <div className="card-topline"><span>0{index + 1} / PROJECT</span><ArrowUpRight size={17} aria-hidden="true" /></div>
                  <div className="project-title-row">
                    <img className={`project-icon${project.id === 'currency-converter' ? ' project-icon-currency' : ''}`} src={project.icon} alt="" aria-hidden="true" />
                    <h3>{project.title}</h3>
                  </div>
                  <p className="project-description">{project.description}</p>
                  {project.tech?.length > 0 && <ul className="chip-list" aria-label="Technologies used">{project.tech.map((item) => <li className="chip" key={item}>{item}</li>)}</ul>}
                  <div className="project-actions">
                    {siteUrl && <a className="text-link" href={siteUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} live site`}>Visit Site <ArrowUpRight size={15} aria-hidden="true" /></a>}
                    {codeUrl && <a className="text-link" href={codeUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source code on GitHub`}>Source Code <Github size={15} aria-hidden="true" /></a>}
                    {hasDemo && <button className="text-link" type="button" onClick={(event) => openDemo(project, event.currentTarget)}>Demo <ArrowUpRight size={15} aria-hidden="true" /></button>}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="section-shell section-block skills-section" id="skills" aria-labelledby="skills-title">
          <div className="section-heading"><div><p className="eyebrow">What I work with</p><h2 id="skills-title">Skills<span className="brand-dot">.</span></h2></div></div>
          <div className="skills-grid">
            {Object.entries(skills).map(([group, items]) => <div className="skill-group" key={group}><h3>{group}</h3><ul className="chip-list">{items.map((item) => <li className="chip" key={item}>{item}</li>)}</ul></div>)}
          </div>
        </section>

        <section className="section-shell section-block education-section" id="education" aria-labelledby="education-title">
          <div className="section-heading"><div><p className="eyebrow">Academic background</p><h2 id="education-title">Education<span className="brand-dot">.</span></h2></div></div>
          <article className="education-card">
            <div className="education-highlight">
              <h3>B.Tech in Computer Science and Engineering</h3>
              <p>9.21 CGPA</p>
            </div>
            <p className="education-details"><span>Saroj Mohan Institute of Engineering</span><span>Affiliated to Maulana Abul Kalam Azad University of Technology (MAKAUT), West Bengal</span><span>Hooghly, West Bengal · 2023</span></p>
          </article>
          <article className="education-card education-school-card">
            <div className="education-highlight">
              <h3>ISC <span>83.5%</span></h3>
              <p>Indian School Certificate Examination (Class XII)</p>
            </div>
            <p className="education-details"><span>Convent of Jesus and Mary</span><span>Ranaghat, Nadia, West Bengal · 2019</span></p>
          </article>
          <article className="education-card education-school-card">
            <div className="education-highlight">
              <h3>ICSE <span>87%</span></h3>
              <p>Indian School Certificate Examination (Class X)</p>
            </div>
            <p className="education-details"><span>Convent of Jesus and Mary</span><span>Ranaghat, Nadia, West Bengal · 2017</span></p>
          </article>
        </section>

        <section className="section-shell section-block about-section" id="about" aria-labelledby="about-title">
          <div className="section-heading"><div><p className="eyebrow">A little about me</p><h2 id="about-title">About Me<span className="brand-dot">.</span></h2></div></div>
          <div className="about-copy">
            <p className="about-intro">I'm a B.Tech graduate in Computer Science and Engineering with hands-on experience building and deploying full-stack applications. I have a solid understanding of core computer science concepts, including Object-Oriented Programming, Data Structures &amp; Algorithms, Computer Networks, and System Design fundamentals, alongside practical experience in backend engineering, databases, authentication, caching, message queues, and real-time communication.</p>
            <div className="about-outside">
              <h3>Outside the code</h3>
              <p>Outside the code, I enjoy exploring artisan food and coffee, appreciating craftsmanship, and collecting thoughtfully curated objects, from watches and fragrances to fabrics and other well-designed everyday items.</p>
            </div>
          </div>
          <dl className="about-profile-grid" aria-label="Personal profile">
            <div className="about-profile-item"><dt>Education</dt><dd><span>B.Tech in Computer Science and Engineering</span><span className="profile-secondary">9.21/10 CGPA · 2023</span></dd></div>
            <div className="about-profile-item"><dt>Languages</dt><dd><span>English · Bengali · Hindi</span><span className="profile-secondary">Speak, Read, Write</span></dd></div>
            <div className="about-profile-item"><dt>Hometown</dt><dd>Ranaghat, Nadia, West Bengal, India</dd></div>
            <div className="about-profile-item"><dt>Based In</dt><dd>West Bengal, India</dd></div>
            <div className="about-profile-item"><dt>Date of Birth</dt><dd>06 October 2001</dd></div>
            <div className="about-profile-item"><dt>Personal Interests</dt><dd>Technology · Craftsmanship · Artisan Food · Coffee · Curated Objects</dd></div>
          </dl>
        </section>

        <section className="section-shell section-block contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-copy"><p className="eyebrow">Career Opportunities</p><h2 id="contact-title">Let's talk<span className="brand-dot">.</span></h2><p>I'm interested in Software Engineer opportunities where I can contribute to meaningful products, solve challenging problems, and continue growing as an engineer. Feel free to reach out.</p></div>
          <div className="contact-links">
            <a href="mailto:muhurisoumyajit@gmail.com"><span className="contact-icon"><Mail size={18} aria-hidden="true" /></span><span>muhurisoumyajit@gmail.com</span><ArrowUpRight size={16} aria-hidden="true" /></a>
            <a href="https://www.linkedin.com/in/soumyajit-muhuri-a09329159/" target="_blank" rel="noopener noreferrer"><span className="contact-icon"><Linkedin size={18} aria-hidden="true" /></span><span>LinkedIn</span><ArrowUpRight size={16} aria-hidden="true" /></a>
            <a href="https://github.com/SoumyajitMuhuri" target="_blank" rel="noopener noreferrer"><span className="contact-icon"><Github size={18} aria-hidden="true" /></span><span>GitHub</span><ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="section-shell footer-inner"><span>© 2026 · All rights reserved.</span></div></footer>
      {activeDemo && <DemoModal project={activeDemo} onClose={closeDemo} returnFocusRef={demoButtonRef} />}
    </>
  )
}

export default App

