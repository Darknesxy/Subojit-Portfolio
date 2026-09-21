// ===================== APP IMPORTS =====================
import { useEffect } from 'react'
import Portfolio from './Portfolio.jsx'

// ===================== HERO ROLE TYPING DATA =====================
const roles = ['Cybersecurity Learner', 'Cloud Security Learner', 'Web Developer', 'AWS & Linux Learner', 'Ethical Hacking Learner']

// ===================== CHATBOT RESPONSE LOGIC =====================
function getReply(message) {
  const text = message.toLowerCase().trim()
  if (/hello|hi|hey/.test(text)) return "Hey! 👋 I'm Subojit's portfolio assistant. Ask me about his skills, projects, services, education, or contact details."
  if (/skill|technology/.test(text)) return "💻 Subojit's current skills include HTML, CSS, JavaScript, Web Development, Cloud Computing, Linux, and Cybersecurity fundamentals."
  if (/project|portfolio/.test(text)) return "🚀 Explore Subojit's projects in the Portfolio section. He is currently building web projects and exploring Cloud & Cybersecurity."
  if (/service/.test(text)) return '🛠️ Current services include Website Development, Web Apps & JavaScript Utilities, basic Flutter App Development, and cybersecurity-focused web practices.'
  if (/education|study|college|bca/.test(text)) return '🎓 Subojit is currently pursuing a BCA in Cloud Computing & Cyber Security.'
  if (/cyber|security|hacking/.test(text)) return '🛡️ Subojit is learning Cybersecurity and Ethical Hacking through safe, hands-on practice.'
  if (/cloud|aws|linux/.test(text)) return '☁️ Subojit is exploring Cloud Computing, AWS, Linux, and Cloud Security.'
  if (/hire|contact|work|freelance/.test(text)) return '🤝 Interested in working with Subojit? Use the Contact section to send a message.'
  if (/help/.test(text)) return '💡 Try asking about skills, projects, services, education, or how to get in touch.'
  return "🤖 I'm still learning! Try asking about Skills, Projects, Services, Education, Cybersecurity, Cloud, or Contact."
}

export default function App() {
  // ===================== SITE INTERACTIONS =====================
  // Typing roles, mobile navigation, skill progress, chatbot and footer year.
  useEffect(() => {
    const cleanups = []
    const addListener = (element, event, handler) => {
      element?.addEventListener(event, handler)
      if (element) cleanups.push(() => element.removeEventListener(event, handler))
    }

    const roleEl = document.getElementById('dynamicRole')
    let roleIndex = 0, charIndex = 0, typing = true, timer
    const typeRole = () => {
      if (!roleEl) return
      const word = roles[roleIndex]
      charIndex += typing ? 1 : -1
      roleEl.textContent = word.slice(0, charIndex)
      if (typing && charIndex === word.length) { typing = false; timer = setTimeout(typeRole, 1200) }
      else if (!typing && charIndex === 0) { typing = true; roleIndex = (roleIndex + 1) % roles.length; timer = setTimeout(typeRole, 300) }
      else timer = setTimeout(typeRole, typing ? 70 : 40)
    }
    typeRole()

    const nav = document.getElementById('navLinks')
    addListener(document.getElementById('hamburger'), 'click', () => nav?.classList.toggle('is-open'))
    document.querySelectorAll('.nav-links a').forEach((link) => addListener(link, 'click', () => nav?.classList.remove('is-open')))

    const progressObserver = new IntersectionObserver((entries) => entries.forEach(({ isIntersecting, target }) => {
      if (isIntersecting) { target.querySelector('span').style.width = `${target.dataset.percent || 0}%`; progressObserver.unobserve(target) }
    }), { threshold: 0.25 })
    document.querySelectorAll('.progress').forEach((item) => progressObserver.observe(item))

    const toggle = document.getElementById('chatToggle'), windowEl = document.getElementById('chatWindow')
    const chatBody = document.getElementById('chatBody')
    const addMessage = (content, type = 'bot') => {
      if (!chatBody) return
      const item = document.createElement('div')
      item.className = `msg ${type}`
      item.textContent = content
      chatBody.append(item)
      chatBody.scrollTop = chatBody.scrollHeight
    }
    const showTyping = () => {
      if (!chatBody) return null
      const item = document.createElement('div')
      item.className = 'msg bot chat-typing'
      item.setAttribute('aria-label', 'Assistant is typing')
      item.innerHTML = '<span></span><span></span><span></span>'
      chatBody.append(item)
      chatBody.scrollTop = chatBody.scrollHeight
      return item
    }
    const ask = (question) => {
      addMessage(question, 'user')
      const typing = showTyping()
      window.setTimeout(() => { typing?.remove(); addMessage(getReply(question)) }, 550)
    }
    const quickReplies = document.createElement('div')
    quickReplies.className = 'chat-suggestions'
    ;['My skills', 'Projects', 'Contact me'].forEach((label) => {
      const button = document.createElement('button')
      button.type = 'button'; button.textContent = label
      button.addEventListener('click', () => ask(label))
      quickReplies.append(button)
    })
    chatBody?.append(quickReplies)
    const setChat = (open) => { windowEl?.classList.toggle('is-open', open); windowEl?.setAttribute('aria-hidden', String(!open)); if (open) document.getElementById('chatInput')?.focus() }
    addListener(toggle, 'click', () => setChat(!windowEl?.classList.contains('is-open')))
    addListener(document.getElementById('chatClose'), 'click', () => setChat(false))
    const form = document.getElementById('chatForm')
    addListener(form, 'submit', (event) => {
      event.preventDefault(); const input = document.getElementById('chatInput'); const value = input?.value.trim(); if (!value) return
      input.value = ''; ask(value)
    })

    const year = document.getElementById('current-year'); if (year) year.textContent = new Date().getFullYear()
    return () => { clearTimeout(timer); progressObserver.disconnect(); quickReplies.remove(); cleanups.forEach((cleanup) => cleanup()) }
  }, [])

  // ===================== PARTICLE CURSOR =====================
  // Enabled only on desktop mouse devices; mobile and reduced-motion users skip it.
  useEffect(() => {
    const canUseCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canUseCursor) return undefined

    const canvas = document.createElement('canvas')
    canvas.className = 'particle-cursor'
    document.body.append(canvas)
    const context = canvas.getContext('2d')
    const particles = []
    let pointer = { x: -100, y: -100 }
    let lastSpawn = 0
    let frame

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * scale
      canvas.height = window.innerHeight * scale
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.setTransform(scale, 0, 0, scale, 0, 0)
    }
    const move = (event) => { pointer = { x: event.clientX, y: event.clientY } }
    const leave = () => { pointer = { x: -100, y: -100 } }
    const render = (time) => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)
      if (pointer.x >= 0 && time - lastSpawn > 40) {
        particles.push({ x: pointer.x, y: pointer.y, vx: (Math.random() - 0.5) * 1.2, vy: (Math.random() - 0.5) * 1.2, size: Math.random() * 2.6 + 1.2, life: 1 })
        lastSpawn = time
      }
      particles.forEach((particle, index) => {
        particle.x += particle.vx; particle.y += particle.vy; particle.vy -= 0.01; particle.life -= 0.028
        if (particle.life <= 0) { particles.splice(index, 1); return }
        context.beginPath()
        context.fillStyle = `rgba(74, 191, 255, ${particle.life * 0.75})`
        context.shadowBlur = 10
        context.shadowColor = '#2da7ff'
        context.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2)
        context.fill()
      })
      context.shadowBlur = 0
      frame = requestAnimationFrame(render)
    }
    resize(); window.addEventListener('resize', resize); window.addEventListener('pointermove', move); document.addEventListener('mouseleave', leave); frame = requestAnimationFrame(render)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', move); document.removeEventListener('mouseleave', leave); canvas.remove() }
  }, [])

  return <Portfolio />
}
