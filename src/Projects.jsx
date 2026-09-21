import { useEffect, useRef, useState } from 'react'
import './Arsenal.css'

const projectHubUrl = 'https://darknesxy.github.io/project-hub/'

// Add image paths later, e.g. image: '/project-previews/cogniva.png'.
const projects = [
  { number: '01', category: 'SOFTWARE PROJECT', name: 'Cogniva Software', description: 'Cogniva is a software project in my project collection.', tags: ['Software Project'], image: null, href: null },
  { number: '02', category: 'PROJECT COLLECTION', name: 'Project Hub', description: 'A growing collection of projects, experiments and learning journey. Explore the technologies I use, the problems I solve, and what I learn while building each project.', tags: ['Live Demos', 'Project Details', 'Tech Stack'], image: null, href: projectHubUrl },
  { number: '03', category: 'PERSONAL PORTFOLIO', name: 'Current Portfolio', description: 'My personal portfolio website: a space to present my work, technical interests, and ongoing journey in cloud computing and cybersecurity.', tags: ['React', 'Vite', 'Portfolio'], image: null, href: 'https://darknesxy.github.io/Subojit-Portfolio/' },
]

export default function Projects() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const frameRef = useRef(0)
  const [progress, setProgress] = useState(0)
  const [details, setDetails] = useState(null)
  const activeIndex = Math.min(projects.length - 1, Math.floor(Math.min(.9999, progress) * projects.length))
  const active = projects[activeIndex]

  const selectProject = (index) => {
    const section = sectionRef.current
    if (!section) return
    const distance = Math.max(1, section.offsetHeight - window.innerHeight)
    window.scrollTo({ top: section.offsetTop + distance * ((index + .12) / projects.length), behavior: 'smooth' })
  }

  useEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    if (!section || !stage) return undefined
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const update = () => {
      frameRef.current = 0
      const rect = section.getBoundingClientRect()
      const distance = Math.max(1, section.offsetHeight - window.innerHeight)
      const next = Math.max(0, Math.min(.9999, -rect.top / distance))
      stage.style.setProperty('--arsenal-shift', `${(next - .5) * -12}px`)
      stage.style.setProperty('--arsenal-scale', `${1 - Math.abs(next - .5) * .025}`)
      setProgress((current) => Math.abs(current - next) < .001 ? current : next)
    }
    const requestUpdate = () => { if (!frameRef.current) frameRef.current = requestAnimationFrame(update) }
    const move = (event) => {
      if (reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
      const rect = stage.getBoundingClientRect()
      stage.style.setProperty('--arsenal-x', `${((event.clientY - rect.top) / rect.height - .5) * -3}deg`)
      stage.style.setProperty('--arsenal-y', `${((event.clientX - rect.left) / rect.width - .5) * 4}deg`)
    }
    const reset = () => { stage.style.setProperty('--arsenal-x', '0deg'); stage.style.setProperty('--arsenal-y', '0deg') }
    update(); window.addEventListener('scroll', requestUpdate, { passive: true }); window.addEventListener('resize', requestUpdate); stage.addEventListener('pointermove', move); stage.addEventListener('pointerleave', reset)
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); window.removeEventListener('scroll', requestUpdate); window.removeEventListener('resize', requestUpdate); stage.removeEventListener('pointermove', move); stage.removeEventListener('pointerleave', reset) }
  }, [])

  return <section id="portfolio" className="section arsenal-showcase" ref={sectionRef}>
    <div className="container arsenal-heading"><h3 className="section-title">My Arsenal</h3><p className="section-sub">A selected collection of software, experiments, and work in progress.</p></div>
    <div className="arsenal-scroll"><div className="container arsenal-sticky"><div className="arsenal-stage" ref={stageRef}><div className="arsenal-grid" aria-hidden="true" />
      <article className="arsenal-project" key={active.name}><div className="arsenal-preview">{active.image ? <img src={active.image} alt={`${active.name} preview`} /> : <div className="arsenal-placeholder"><i className="fa-solid fa-window-maximize" /><strong>{active.name}</strong><span>Project preview</span></div>}</div><div className="arsenal-info"><p className="arsenal-meta">{active.number} / 03 · {active.category}</p><h4>{active.name}</h4><p>{active.description}</p><div className="arsenal-tags">{active.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="arsenal-actions">{active.href ? <a className="btn primary" href={active.href} target="_blank" rel="noreferrer">View Project <i className="fa-solid fa-arrow-right" /></a> : <span className="arsenal-private"><i className="fa-solid fa-lock" /> Private / coming soon</span>}<button type="button" className="arsenal-more" onClick={() => setDetails(active)}>View More <i className="fa-solid fa-arrow-up-right-from-square" /></button></div></div></article>
    </div><nav className="arsenal-navigation" aria-label="Project navigation">{projects.map((project, index) => <button key={project.name} type="button" className={index === activeIndex ? 'active' : ''} onClick={() => selectProject(index)} aria-current={index === activeIndex ? 'true' : undefined}><span>{project.number}</span>{project.name}</button>)}</nav></div></div>
    {details && <div className="arsenal-modal" role="dialog" aria-modal="true" aria-label={`${details.name} details`} onMouseDown={() => setDetails(null)}><div className="arsenal-modal-panel" onMouseDown={(event) => event.stopPropagation()}><button className="arsenal-close" type="button" onClick={() => setDetails(null)} aria-label="Close details">×</button><p className="arsenal-meta">{details.category}</p><h4>{details.name}</h4><p>{details.description}</p><div className="arsenal-tags">{details.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><p className="arsenal-modal-note">More project documentation, screenshots, and links can be added here as this project grows.</p></div></div>}
  </section>
}
