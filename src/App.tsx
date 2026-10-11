import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type FormEvent, type MouseEvent, type ReactNode } from 'react'
import data from './data/content.json'

type Proj = (typeof data.projects)[number]
const img = (n: string) => `/img/${n}.webp`
const EMAIL = 'sri.mulyani003@binus.ac.id'

const SKILLS = [
  ['Data Analytics', 'SQL, Python, Excel, data cleaning and exploratory analysis'],
  ['Data Engineering', 'Pentaho ETL, MySQL, star schema warehousing'],
  ['BI & Visualization', 'Power BI and Tableau dashboards'],
  ['Machine Learning', 'scikit-learn, NLP, model evaluation'],
  ['System Analysis', 'Requirements, UML modeling, draw.io'],
  ['UI/UX Design', 'Figma, user flows, HCI principles'],
]

function Icon({ n, style }: { n: string; style?: CSSProperties }) {
  return (
    <svg className="i" style={style}>
      <use href={`#${n}`} />
    </svg>
  )
}
const Ico = ({ n }: { n: string }) => (
  <span className="ic">
    <Icon n={n} />
  </span>
)

function Defs() {
  const r = (n: number) => Array.from({ length: n }, (_, k) => k)
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <symbol id="fl" viewBox="0 0 100 100">
          <g fill="currentColor">
            {r(8).map((k) => (
              <circle key={k} cx="50" cy="19" r="17" transform={`rotate(${k * 45} 50 50)`} />
            ))}
            <circle cx="50" cy="50" r="16" fill="var(--bg)" />
          </g>
        </symbol>
        <symbol id="burst" viewBox="0 0 100 100">
          {r(14).map((k) => (
            <path key={k} d={`M50 50L50 ${k % 2 ? 8 : 2}`} stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" transform={`rotate(${(k * 360) / 14} 50 50)`} />
          ))}
        </symbol>
        <symbol id="star" viewBox="0 0 100 100">
          <path fill="currentColor" d="M50 0C54 34 66 46 100 50 66 54 54 66 50 100 46 66 34 54 0 50 34 46 46 34 50 0Z" />
        </symbol>
        <symbol id="arr" viewBox="0 0 24 24">
          <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="sun" viewBox="0 0 100 100">
          {r(16).map((k) => (
            <path key={k} d="M50 6V18" stroke="currentColor" strokeWidth="5" strokeLinecap="round" transform={`rotate(${k * 22.5} 50 50)`} />
          ))}
          <circle cx="50" cy="50" r="27" fill="currentColor" />
          <circle cx="41" cy="45" r="3.2" fill="#5C1527" />
          <circle cx="59" cy="45" r="3.2" fill="#5C1527" />
          <path d="M38 56Q50 68 62 56" stroke="#5C1527" strokeWidth="3.4" fill="none" strokeLinecap="round" />
        </symbol>
      </defs>
    </svg>
  )
}

function Lap({ children, wide }: { children: ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? 'lap w' : 'lap'}>
      <div className="lap-s">{children}</div>
      <div className="lap-b" />
    </div>
  )
}

function Bars({ h }: { h: number[] }) {
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none">
      {h.map((v, k) => (
        <rect key={k} x={k * 20 + 3} y={40 - v} width="14" height={v} rx="3" fill={k === h.length - 1 ? '#8A1F35' : '#E8899C'} />
      ))}
    </svg>
  )
}

function Vis({ v }: { v: string }) {
  switch (v) {
    case 'book':
      return <Lap><img src={img('i11')} alt="Book-Crossing Power BI dashboard" /></Lap>
    case 'shop':
      return <Lap><img src={img('i9')} alt="Customer Shopping Behavior dashboard" /></Lap>
    case 'sign':
      return <Lap><img src={img('isy1')} alt="Isyaratku landing page" /></Lap>
    case 'sigma':
      return <img className="phi" src={img('i10')} alt="Sigma Coffee home screen" />
    case 'sub':
      return <Lap><div className="scr"><small>ROC-AUC</small><b>91.40%</b><Bars h={[14, 22, 26, 30, 38]} /></div></Lap>
    case 'nlp':
      return <Lap><div className="scr"><small>TEST ACCURACY</small><b>85.53%</b><Bars h={[34, 30]} /></div></Lap>
    default:
      return (
        <Lap>
          <div className="scr">
            <svg viewBox="0 0 100 60" style={{ height: '100%' }}>
              <g fill="#F4D3C6" stroke="#8A1F35" strokeWidth="1.6">
                <rect x="6" y="8" width="26" height="16" rx="3" />
                <rect x="40" y="36" width="26" height="16" rx="3" />
                <rect x="70" y="8" width="24" height="16" rx="3" />
              </g>
              <path d="M32 16H70M19 24V44H40M66 44H82V24" stroke="#8A1F35" strokeWidth="1.6" fill="none" />
            </svg>
          </div>
        </Lap>
      )
  }
}

function Modal({ p, onClose }: { p: Proj | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [gi, setGi] = useState(0)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (p) {
      setGi(0)
      if (!d.open) d.showModal()
      document.body.style.overflow = 'hidden'
    } else {
      if (d.open) d.close()
      document.body.style.overflow = ''
    }
  }, [p])
  const n = p?.imgs.length ?? 0
  return (
    <dialog ref={ref} onClick={(e) => e.target === ref.current && onClose()} onClose={onClose}>
      {p && (
        <div className="mo" key={p.title}>
          <button className="x" aria-label="Close" onClick={onClose}>×</button>
          <h1>{p.title}</h1>
          <div className="lk">
            {p.links.map((l) => (
              <a key={l[1]} className="btn o" target="_blank" rel="noreferrer" href={l[1]}>{l[0]}</a>
            ))}
          </div>
          <div className="doc">
            <div dangerouslySetInnerHTML={{ __html: p.meta }} />
            {n > 0 && (
              <div className="gal">
                {p.vis === 'sigma' ? (
                  <div className="row">{p.imgs.map((g) => <img key={g[0]} src={img(g[0])} alt={g[1]} />)}</div>
                ) : (
                  <>
                    <Lap wide={p.imgs[gi][0] === 'isy2' || p.imgs[gi][0] === 'isy3'}><img src={img(p.imgs[gi][0])} alt={p.imgs[gi][1]} /></Lap>
                    {n > 1 && (
                      <>
                        <div className="cap">{p.imgs[gi][1]}</div>
                        <div className="ctl">
                          <button aria-label="Previous" onClick={() => setGi((gi + n - 1) % n)}>‹</button>
                          <span>{gi + 1} / {n}</span>
                          <button aria-label="Next" onClick={() => setGi((gi + 1) % n)}>›</button>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            )}
            <div dangerouslySetInnerHTML={{ __html: p.body }} />
          </div>
        </div>
      )}
    </dialog>
  )
}

function ThemeToggle() {
  const toggle = () => {
    const R = document.documentElement
    const t = R.dataset.theme === 'dark' ? 'light' : 'dark'
    R.dataset.theme = t
    try { localStorage.setItem('theme', t) } catch { /* ignore */ }
  }
  return (
    <button className="tg" aria-label="Toggle light and dark mode" onClick={toggle}>
      <svg className="s" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
      </svg>
      <svg className="m" viewBox="0 0 24 24" fill="currentColor"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z" /></svg>
    </button>
  )
}

const TOOLS = ['SQL', 'Python', 'Power BI', 'Tableau', 'Pentaho ETL', 'MySQL', 'scikit-learn', 'Figma', 'UML', 'Excel']
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function useReveal() {
  useLayoutEffect(() => {
    if (reduced()) return
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-rv]'))
    els.forEach((el) => {
      el.classList.add('rv')
      const idx = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0
      el.style.setProperty('--d', `${Math.min(idx, 6) * 70}ms`)
    })
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
      { threshold: 0.05, rootMargin: '0px 0px -6% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function Count({ to }: { to: number }) {
  const ref = useRef<HTMLElement>(null)
  const [v, setV] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced()) { setV(to); return }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const step = (t: number) => {
        const p = Math.min((t - t0) / 1500, 1)
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [to])
  return <b ref={ref}>{v.toLocaleString('en-US')}</b>
}

function Progress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const f = () => {
      const h = document.documentElement
      setP(h.scrollTop / (h.scrollHeight - h.clientHeight || 1))
    }
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  return <div className="pg" style={{ transform: `scaleX(${p})` }} />
}

function Marquee() {
  const list = [...TOOLS, ...TOOLS, ...TOOLS, ...TOOLS]
  return (
    <div className="mq" aria-hidden="true">
      <div className="mt">
        {list.map((t, i) => <span key={i}>{t}<Icon n="star" /></span>)}
      </div>
    </div>
  )
}

function Exp() {
  const [open, setOpen] = useState<number[]>([0])
  const tog = (i: number) => setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]))
  return (
    <div className="tl" data-rv>
      {data.exp.map((e, i) => {
        const on = open.includes(i)
        return (
          <article key={e.role} className={on ? 'ti open' : 'ti'} data-rv>
            <span className="tm" />
            <div className="xc2">
              <h3>{e.role}</h3>
              <p className="xo">{e.org}</p>
              {e.period && <p className="xd">{e.period}</p>}
              <p className="xs">{e.bullets[0]}</p>
              <div className="xx">
                <div>
                  <ul>{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                  {e.imgs.length > 0 && (
                    <div className="xp">{e.imgs.map((m) => <img key={m} src={img(m)} alt={`${e.role}, ${e.org}`} loading="lazy" />)}</div>
                  )}
                  {e.link && <a className="btn o" href={e.link} target="_blank" rel="noreferrer">Certificate / documentation</a>}
                </div>
              </div>
              <button className="xt" aria-expanded={on} onClick={() => tog(i)}>{on ? 'SHOW LESS' : 'VIEW DETAILS'}</button>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default function App() {
  const [cur, setCur] = useState<number | null>(null)
  useReveal()
  const move = (e: MouseEvent<HTMLElement>) => {
    const s = e.currentTarget.style
    s.setProperty('--mx', String(e.clientX / window.innerWidth - 0.5))
    s.setProperty('--my', String(e.clientY / window.innerHeight - 0.5))
  }
  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const subject = encodeURIComponent(`Portfolio message from ${f.get('n')}`)
    const body = encodeURIComponent(`${f.get('m')}\n\n${f.get('n')} (${f.get('e')})`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }
  const contactLinks: [string, string][] = [
    [`mailto:${EMAIL}`, EMAIL],
    ['https://www.linkedin.com/in/sri-mulyani-6a5914260', 'LinkedIn: Sri Mulyani'],
    ['https://www.instagram.com/ncilyns_/', '@ncilyns_'],
  ]
  return (
    <>
      <Defs />
      <Progress />
      <header>
        <div className="nav">
          <a className="logo" href="#top">SRI<br />MULYANI</a>
          <nav className="links">
            <a href="#work">WORK</a><a href="#skills">SKILLS</a><a href="#about">ABOUT</a><a href="#experience">EXPERIENCE</a><a href="#contact">CONTACT</a>
          </nav>
          <a className="btn cta" href="#contact">LET'S TALK <Icon n="burst" /></a>
          <ThemeToggle />
        </div>
      </header>

      <main className="wrap" id="top">
        <section className="hero" onMouseMove={move}>
          <div>
            <h1><span>DATA</span><span className="l2">INSIGHT</span><span className="l3">THAT<i>Matters</i></span></h1>
            <p className="lead">{data.lead}</p>
            <div className="cta-row">
              <a className="btn" href="#work">VIEW MY WORK <Icon n="arr" /></a>
              <a className="btn ghost" href="#about">ABOUT ME <Icon n="arr" /></a>
            </div>
          </div>
          <div className="hr">
            <div className="qc" />
            <svg className="dec i spin" style={{ left: -40, top: 20, width: 44, height: 44 }}><use href="#fl" /></svg>
            <svg className="dec i tw" style={{ right: -6, top: '48%', width: 34, height: 34 }}><use href="#star" /></svg>
            <svg className="dec i pulse" style={{ right: '6%', top: '6%', width: 120, height: 120, color: '#fff', opacity: 0.85 }}><use href="#burst" /></svg>
            <div className="arch"><img src={img('me')} alt="Sri Mulyani" /></div>
            <div className="badge">COMPUTER<br />SCIENCE<br />· BINUS ·</div>
          </div>
        </section>

        <Marquee />

        <section className="intro" id="about" data-rv>
          <div className="pf"><img src={img('me2')} alt="Sri Mulyani" /></div>
          <div>
            <h2 className="d">HI, I'M SRI.</h2>
            <h3>DATA &amp; ANALYTICS STUDENT</h3>
            <div dangerouslySetInnerHTML={{ __html: data.about }} />
            <div className="sig">Sri</div>
          </div>
          <ul className="sk">
            {SKILLS.slice(0, 5).map((s, k) => <li key={s[0]}><Ico n={k % 2 ? 'star' : 'fl'} />{s[0]}</li>)}
          </ul>
        </section>

        <section className="band" id="work" data-rv>
          <div className="band-h"><h2 className="d">SELECTED WORKS</h2><span>{data.projects.length} PROJECTS</span></div>
          <div className="grid">
            {data.projects.map((p, i) => (
              <button key={p.title} data-rv className="card" aria-label={`Open ${p.title}`} onClick={() => setCur(i)}>
                <small>{p.tag}</small>
                <h3>{p.short}</h3>
                <em>{p.sub}</em>
                <div className="vis"><Vis v={p.vis} /></div>
                <span className="go"><Icon n="arr" /></span>
              </button>
            ))}
            <a className="more" data-rv href="#contact">
              <Icon n="burst" style={{ width: 46, height: 46, color: 'var(--rose)' }} />
              <b className="d" style={{ fontSize: 18 }}>LET'S COLLABORATE</b>
              <span style={{ fontSize: 12 }}>Open to internships in data and technology</span>
            </a>
          </div>
        </section>

        <section className="two" id="skills">
          <div className="panel" data-rv>
            <h2 className="d">WHAT I WORK WITH</h2>
            <div className="svc">
              {SKILLS.map((s, k) => (
                <div key={s[0]}><Ico n={k % 2 ? 'star' : 'fl'} /><p><b>{s[0]}</b><span>{s[1]}</span></p></div>
              ))}
            </div>
            <svg className="dec i" style={{ left: -30, bottom: -30, width: 90, height: 90 }}><use href="#fl" /></svg>
          </div>
          <div className="panel" data-rv>
            <h2 className="d">PROJECTS BY THE NUMBERS</h2>
            <div className="nums">
              <div style={{ background: 'var(--t1)' }}><Count to={7} /><span>PROJECTS DOCUMENTED</span></div>
              <div style={{ background: 'var(--t2)' }}><Count to={111585} /><span>RATINGS VALIDATED IN THE WAREHOUSE</span></div>
              <div style={{ background: 'var(--t3)' }}><Count to={50000} /><span>MOVIE REVIEWS CLASSIFIED</span></div>
              <div style={{ background: 'var(--t4)' }}><Count to={3900} /><span>CUSTOMER RECORDS ANALYZED</span></div>
            </div>
            <svg className="dec i" style={{ right: -34, top: -30, width: 130, height: 130, opacity: 0.9 }}><use href="#fl" /></svg>
          </div>
        </section>

        <h2 className="d sec-h" data-rv>WHAT DRIVES ME <Icon n="star" style={{ color: 'var(--rose)' }} /></h2>
        <div className="cards3">
          {data.values.map((v, k) => (
            <div className="q" data-rv key={v.n}>
              <Icon n={k % 2 ? 'star' : 'fl'} style={{ width: 34, height: 34, color: 'var(--rose)' }} />
              <h3>{v.n}</h3>
              <p>{v.t}</p>
            </div>
          ))}
        </div>

        <div className="eb" id="experience" data-rv>
          <span><Icon n="star" /> LEADERSHIP &amp; ORGANIZATIONS</span>
          <h2><i>My</i> <b className="d">EXPERIENCE</b></h2>
        </div>
        <Exp />

        <section className="talk" id="contact" data-rv>
          <div>
            <h2 className="d">LET'S TALK</h2>
            <span className="sc">Data Together!</span>
            <div className="ct">
              {contactLinks.map((c) => (
                <a key={c[0]} href={c[0]} target={c[0].startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  <Icon n="star" style={{ color: 'var(--head)' }} />{c[1]}
                </a>
              ))}
            </div>
          </div>
          <div className="sun"><svg viewBox="0 0 100 100"><use href="#sun" /></svg></div>
          <form className="fc" onSubmit={send}>
            <h3>HAVE A PROJECT OR OPPORTUNITY IN MIND?</h3>
            <input name="n" placeholder="Your name" required autoComplete="name" />
            <input name="e" type="email" placeholder="Your email" required autoComplete="email" />
            <textarea name="m" rows={4} placeholder="Your message" required />
            <button className="btn" type="submit">SEND MESSAGE <Icon n="arr" /></button>
          </form>
        </section>
      </main>
      <footer>© {new Date().getFullYear()} Sri Mulyani · Computer Science, BINUS University</footer>
      <Modal p={cur === null ? null : data.projects[cur]} onClose={() => setCur(null)} />
    </>
  )
}
