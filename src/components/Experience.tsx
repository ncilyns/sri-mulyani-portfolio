import { useState } from 'react'
import alumniLegacy1 from '../assets/alumni-legacy-1.jpeg'
import alumniLegacy2 from '../assets/alumni-legacy-2.jpeg'
import freshmenPartner1 from '../assets/freshmen-partner-1.jpeg'
import freshmenPartner2 from '../assets/freshmen-partner-2.jpeg'
import { experiences } from '../data/content'
import { MixedTitle, Reveal, Sparkle } from './ui'

const experienceImages: Record<string, string> = {
  'alumni-legacy-1': alumniLegacy1,
  'alumni-legacy-2': alumniLegacy2,
  'freshmen-partner-1': freshmenPartner1,
  'freshmen-partner-2': freshmenPartner2,
}

export function Experience() {
  const [expanded, setExpanded] = useState<string | null>(experiences[0]?.id ?? null)

  return (
    <section className="section section--mid" id="experience">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">
              <Sparkle /> Leadership & organizations
            </p>
            <MixedTitle serif="My" sans="Experience" />
          </div>
          <div className="section-number" aria-hidden="true">
            04
          </div>
        </div>

        <div className="timeline">
          {experiences.map((item) => {
            const open = expanded === item.id
            return (
              <Reveal key={item.id} className="timeline__item">
                <div className="timeline__dot" aria-hidden="true">
                  <span />
                </div>
                <article className="timeline__card">
                  <h3>{item.role}</h3>
                  <p className="timeline__org">{item.org}</p>
                  {item.period && <p className="timeline__period">{item.period}</p>}

                  {item.images && item.images.length > 0 && (
                    <div className="timeline__photos">
                      {item.images.map((imageKey) => (
                        <img
                          key={imageKey}
                          src={experienceImages[imageKey]}
                          alt={`${item.role} — ${item.org}`}
                        />
                      ))}
                    </div>
                  )}

                  {open ? (
                    <ul>
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ margin: 0, color: 'var(--muted)' }}>{item.bullets[0]}</p>
                  )}

                  {open && item.links && item.links.length > 0 && (
                    <div className="timeline__links">
                      {item.links.map((link) => (
                        <a
                          key={link.label}
                          className="pill"
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}

                  <button
                    className="timeline__toggle"
                    onClick={() => setExpanded(open ? null : item.id)}
                    aria-expanded={open}
                  >
                    {open ? 'Show less' : 'View details'}
                  </button>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
