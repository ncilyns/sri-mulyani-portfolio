import { useState, type FormEvent } from 'react'
import profil from '../assets/profil.jpeg'
import profil2 from '../assets/profil2.jpeg'
import { contact } from '../data/content'
import { MixedTitle, Reveal, Sparkle } from './ui'

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

type Status = 'idle' | 'sending' | 'success' | 'error'

function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Fallback: no API key configured, so open the visitor's email app.
    if (!WEB3FORMS_KEY) {
      const subject = encodeURIComponent(`Portfolio message from ${data.get('name')}`)
      const body = encodeURIComponent(`${data.get('message')}\n\n${data.get('name')} (${data.get('email')})`)
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
      return
    }

    setStatus('sending')
    try {
      data.append('access_key', WEB3FORMS_KEY)
      data.append('subject', `Portfolio message from ${data.get('name')}`)
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      const json = await res.json()
      if (json.success) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="contact__form" onSubmit={onSubmit}>
      <div className="contact__row">
        <label>
          Name
          <input name="name" type="text" required maxLength={80} autoComplete="name" placeholder="Your name" />
        </label>
        <label>
          Email
          <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
        </label>
      </div>
      <label>
        Message
        <textarea name="message" required rows={5} maxLength={2000} placeholder="Hi Sri, I’d like to talk about…" />
      </label>
      <input type="checkbox" name="botcheck" className="contact__honeypot" tabIndex={-1} autoComplete="off" />
      <button className="btn btn--primary" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
      <p className="contact__status" role="status" aria-live="polite">
        {status === 'success' && 'Thank you! Your message has been sent. I’ll reply soon.'}
        {status === 'error' && `Something went wrong. Please email me directly at ${contact.email}.`}
      </p>
    </form>
  )
}

export function Contact() {
  return (
    <section className="section section--light contact-section" id="contact">
      <div className="container contact">
        <Reveal className="contact__panel">
          <div className="contact__photos">
            <img src={profil} alt="Sri Mulyani" />
            <img src={profil2} alt="Sri Mulyani over-the-shoulder portrait" />
          </div>
          <p className="eyebrow" style={{ color: 'var(--peach-200)', justifyContent: 'center' }}>
            <Sparkle /> Let’s connect
          </p>
          <MixedTitle className="contact__title" serif="Let’s" sans="Connect." />
          <p className="contact__text">
            I’m open to internships in Data Engineering, Data Analytics, and Business
            Analytics. Send me a message and I’ll get back to you.
          </p>
          <ContactForm />
          <div className="contact__links">
            <a className="btn btn--outline" href={contact.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="btn btn--outline" href={contact.instagram} target="_blank" rel="noreferrer">
              Instagram {contact.instagramHandle}
            </a>
            <a className="btn btn--outline" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">© {new Date().getFullYear()} Sri Mulyani · Built with React &amp; Vite</div>
    </footer>
  )
}
