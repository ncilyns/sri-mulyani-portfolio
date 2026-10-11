import { useEffect, useState } from 'react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Connect' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(true)
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* storage unavailable */
    }
  }

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const mid = window.innerHeight * 0.18
      const el = document.elementFromPoint(window.innerWidth / 2, mid)
      const section = el?.closest('section, header, footer')
      const isDark =
        section?.classList.contains('section--dark') ||
        section?.classList.contains('hero') ||
        section?.classList.contains('contact-section')
      setDark(Boolean(isDark) || window.scrollY < 80)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <nav className={`nav ${scrolled ? (dark ? 'nav--dark' : 'nav--solid') : 'nav--dark'}`}>
      <div className="nav__inner">
        <a href="#top" className="nav__brand" onClick={() => setOpen(false)}>
          Sri<span>Mulyani</span>
        </a>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
          )}
        </button>
        <button
          className="nav__toggle"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
        </button>
        <ul className={`nav__links ${open ? 'is-open' : ''}`}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
