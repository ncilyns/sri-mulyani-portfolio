import profil from '../assets/profil.jpeg'
import { contact } from '../data/content'
import { MixedTitle, Reveal, Sparkle } from './ui'

export function Hero() {
  return (
    <header className="hero" id="top">
      <div className="container hero__grid">
        <Reveal className="hero__main">
          <p className="eyebrow">
            <Sparkle /> Portfolio · Database Technology
          </p>
          <MixedTitle
            as="h1"
            className="hero__title"
            serif="Hi, I'm"
            sans="Sri Mulyani."
          />
          <div className="gold-line" />
          <p className="hero__lead">
            Computer Science student at BINUS University (Database Technology), looking
            for a Data Engineering, Data Analytics, or Business Analytics internship.
          </p>
          <p className="hero__lead">
            I build reliable data pipelines, dashboards, and prediction models, then turn
            the results into decisions a team can act on.
          </p>
          <div className="hero__tags">
            <span className="pill pill--ghost">Open to internships</span>
            <span className="pill pill--ghost">Data Engineering</span>
            <span className="pill pill--ghost">Data Analytics</span>
            <span className="pill pill--ghost">Business Analytics</span>
          </div>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#projects">
              View My Projects
            </a>
            <a className="btn btn--outline" href="#contact">
              Let’s Connect
            </a>
            {contact.cvUrl && (
              <a className="btn btn--outline" href={contact.cvUrl} download>
                Download CV
              </a>
            )}
          </div>
        </Reveal>

        <div className="hero__side">
          <Reveal className="hero__portrait-wrap">
            <img
              className="hero__photo"
              src={profil}
              alt="Sri Mulyani, Computer Science student at Bina Nusantara University"
            />
          </Reveal>
          <Reveal className="hero__stat">
            <strong>Bina Nusantara University</strong>
            <p>Computer Science · Database Technology · Fifth semester</p>
          </Reveal>
        </div>
      </div>
    </header>
  )
}
