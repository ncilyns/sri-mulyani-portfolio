import { useEffect } from 'react'
import type { Project } from '../data/content'

export function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__top">
          <div>
            <p className="eyebrow">Case study · {project.number}</p>
            <h2 id="case-study-title">{project.title}</h2>
            <p>{project.context}</p>
          </div>
          <button className="modal__close" onClick={onClose} aria-label="Close case study">
            ×
          </button>
        </div>

        <h3>Why this project matters</h3>
        <p>{project.pitch}</p>

        <h3>Project details</h3>
        <p>{project.summary}</p>

        {project.highlights && (
          <>
            <h3>Key figures</h3>
            <div className="highlight-grid" style={{ color: 'inherit' }}>
              {project.highlights.map((item) => (
                <div
                  className="highlight-item"
                  key={item.label}
                >
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <h3>Process</h3>
        <ol>
          {project.process.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>

        {project.metrics && (
          <>
            <h3>Details</h3>
            <div className="metric-list">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.label}</strong>
                  <span>{metric.detail}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {project.table && (
          <>
            <h3>Reference table</h3>
            <table>
              <thead>
                <tr>
                  {project.table.headers.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {project.table.rows.map((row) => (
                  <tr key={row.join('-')}>
                    {row.map((cell) => (
                      <td key={cell}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <h3>Tools</h3>
        <div className="skills__tags">
          {project.tools.map((tool) => (
            <span className="pill" key={tool}>
              {tool}
            </span>
          ))}
        </div>

        <h3>Insights</h3>
        <ul>
          {project.insights.map((insight) => (
            <li key={insight}>{insight}</li>
          ))}
        </ul>

        {project.links && project.links.length > 0 && (
          <>
            <h3>Links</h3>
            <div className="hero__actions">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  className="btn btn--dark"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
