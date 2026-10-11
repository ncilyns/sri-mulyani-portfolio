import { useEffect, useRef, type ReactNode } from 'react'

export function MixedTitle({
  serif,
  sans,
  className = '',
  as: Tag = 'h2',
}: {
  serif: string
  sans: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
}) {
  return (
    <Tag className={`mixed-title ${className}`.trim()}>
      <span className="serif">{serif}</span>
      <span className="sans">{sans}</span>
    </Tag>
  )
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

export function Reveal({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className={`reveal ${className}`.trim()}>
      {children}
    </div>
  )
}

export function Sparkle() {
  return <span className="sparkle" aria-hidden="true" />
}
