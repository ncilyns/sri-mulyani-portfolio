import profil2 from '../assets/profil2.jpeg'
import { aboutParagraphs } from '../data/content'
import { MixedTitle, Reveal, Sparkle } from './ui'

export function About() {
  return (
    <section className="section section--light" id="about">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">
              <Sparkle /> Introduction
            </p>
            <MixedTitle serif="About" sans="Me" />
          </div>
          <div className="section-number" aria-hidden="true">
            01
          </div>
        </div>

        <div className="about__grid">
          <Reveal className="bento-card about__visual">
            <div className="arch-frame">
              <img
                src={profil2}
                alt="Sri Mulyani portrait"
              />
            </div>
            <p className="eyebrow" style={{ margin: 0 }}>
              Personal introduction
            </p>
          </Reveal>

          <Reveal className="bento-card about__copy">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
