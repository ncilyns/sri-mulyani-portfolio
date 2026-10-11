import { hardSkills, softSkills } from '../data/content'
import { MixedTitle, Reveal, Sparkle } from './ui'

export function Skills() {
  return (
    <section className="section section--mid" id="skills">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">
              <Sparkle /> Capabilities
            </p>
            <MixedTitle serif="My" sans="Skills" />
          </div>
          <div className="section-number" aria-hidden="true">
            02
          </div>
        </div>

        <div className="skills__grid">
          <Reveal className="bento-card skills__card">
            <h3>Hard skills</h3>
            <div className="skills__tags">
              {hardSkills.map((skill) => (
                <span className="pill" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal className="bento-card bento-card--dark skills__card">
            <h3>Soft skills</h3>
            <div className="skills__tags">
              {softSkills.map((skill) => (
                <span className="pill pill--ghost" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
