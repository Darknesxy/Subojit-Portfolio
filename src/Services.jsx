// ===================== SERVICES DATA =====================
// Edit, add, or remove a service card from this list.
const services = [
  { category: 'CLOUD', icon: 'fa-cloud', title: 'Cloud Engineering', description: 'Cloud infrastructure, deployments, IAM, networking, and scalable cloud environments.', tags: ['AWS', 'Cloud', 'IAM'] },
  { category: 'SECURITY', icon: 'fa-shield-halved', title: 'Cybersecurity', description: 'Security-focused projects, vulnerability analysis, secure development, and security experimentation.', tags: ['Cybersecurity', 'Linux', 'Python'] },
  { category: 'NETWORK', icon: 'fa-network-wired', title: 'Network Security', description: 'Network architecture, protocols, traffic analysis, and hands-on network security labs.', tags: ['Networking', 'TCP/IP', 'Security'] },
  { category: 'AUTOMATION', icon: 'fa-gears', title: 'DevSecOps & Automation', description: 'Automation, CI/CD concepts, containers, and integrating security into development workflows.', tags: ['Git', 'CI/CD', 'Docker'] },
  { category: 'SOFTWARE', icon: 'fa-code', title: 'Secure Software Development', description: 'Web applications, APIs, authentication, and security-conscious software development.', tags: ['React', 'APIs', 'JavaScript'] },
  { category: 'RESEARCH', icon: 'fa-flask', title: 'Security Labs & Research', description: 'Hands-on labs, CTF learning, experiments, technical documentation, and security writeups.', tags: ['Labs', 'CTF', 'Writeups'] },
]

export default function Services() {
  // ===================== SERVICES SECTION UI =====================
  return (
    <section id="services" className="section services-section container">
      <h3 className="section-title">What I Build</h3>
      <p className="section-sub">Practical technology, secure systems, and cloud-focused solutions.</p>

      <div className="services-grid">
        {services.map((service) => (
          <article className="service-card box-glow service-tilt" key={service.title}>
            <div className="service-top">
              <span className="service-tag">{service.category}</span>
              <div className="service-icon" aria-hidden="true">
                <i className={`fa-solid ${service.icon}`} />
              </div>
            </div>
            <h4>{service.title}</h4>
            <p>{service.description}</p>
            <div className="service-tech" aria-label={`${service.title} technologies`}>
              {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <a className="service-arrow service-explore" href="#portfolio" aria-label={`Explore ${service.title} projects`}>
              <span>Explore</span><i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
