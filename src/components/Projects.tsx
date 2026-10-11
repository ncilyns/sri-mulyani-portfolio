import { useState } from 'react'
import { projects, type Project } from '../data/content'
import { CaseStudyModal } from './CaseStudyModal'
import { MixedTitle, Reveal, Sparkle } from './ui'

function ProjectVisual({ project }: { project: Project }) {
  if (project.layout === 'phone') {
    return (
      <div className="phone-frame" aria-hidden="true">
        <div className="phone-frame__screen">
          <span className="phone-chip">{project.number}</span>
          <strong>{project.title.split(':')[0]}</strong>
          <p>{project.subtitle}</p>
          <div className="skills__tags" style={{ marginTop: 'auto' }}>
            {project.tools.slice(0, 3).map((tool) => (
              <span className="phone-chip" key={tool}>
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (project.highlights) {
    return (
      <div className="highlight-grid" style={{ width: '100%' }}>
        {project.highlights.map((item) => (
          <div className="highlight-item" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="highlight-item" style={{ width: '100%', textAlign: 'center' }}>
      <strong>{project.number}</strong>
      <span>Case study</span>
    </div>
  )
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <section className="section section--light" id="projects">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">
              <Sparkle /> Selected work
            </p>
            <MixedTitle serif="My" sans="Work" />
          </div>
          <div className="section-number" aria-hidden="true">
            03
          </div>
        </div>

        <div className="projects__list">
          {projects.map((project, index) => {
            const dark = index % 2 === 1
            const alt = index % 2 === 1

            return (
              <Reveal key={project.id}>
                <article
                  className={[
                    'project-card',
                    alt ? 'project-card--alt' : '',
                    dark ? 'project-card--dark' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <div className="project-card__body">
                    <p className="project-card__meta">
                      {project.number} · {project.context}
                    </p>
                    <h3>{project.title}</h3>
                    <p className="project-card__subtitle">{project.subtitle}</p>
                    <p className="project-card__summary">{project.pitch}</p>
                    <div className="project-card__tools">
                      {project.tools.map((tool) => (
                        <span
                          className={`pill ${dark ? 'pill--ghost' : ''}`}
                          key={tool}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                    <div>
                      <button
                        className={`btn ${dark ? 'btn--primary' : 'btn--dark'}`}
                        onClick={() => setActive(project)}
                      >
                        View Case Study
                      </button>
                    </div>
                  </div>
                  <div className="project-card__visual">
                    <ProjectVisual project={project} />
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>

      {active && <CaseStudyModal project={active} onClose={() => setActive(null)} />}
    </section>
  )
}
