'use client'

import { useEffect, useState } from 'react'
import { ListBulletIcon } from '@heroicons/react/24/outline'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  showOnMobile?: boolean
}

/**
 * TableOfContents Component
 *
 * Floating table of contents for blog posts with:
 * - Auto-generated from H2 and H3 headings
 * - Scroll spy (highlights active section)
 * - Smooth scroll on click
 * - Sticky positioning
 * - Responsive (hidden on mobile by default)
 *
 * @example
 * <TableOfContents />
 */
export default function TableOfContents({ showOnMobile = false }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    // Get all H2 and H3 headings from the article
    const article = document.querySelector('article')
    if (!article) return

    const headings = article.querySelectorAll('h2, h3')
    const tocItems: TocItem[] = []

    headings.forEach((heading) => {
      const id = heading.id
      const text = heading.textContent || ''
      const level = parseInt(heading.tagName.substring(1))

      if (id && text) {
        tocItems.push({ id, text, level })
      }
    })

    setToc(tocItems)

    // Scroll spy observer
    const observerOptions = {
      rootMargin: '-80px 0px -80% 0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }, observerOptions)

    headings.forEach((heading) => {
      if (heading.id) {
        observer.observe(heading)
      }
    })

    return () => {
      headings.forEach((heading) => {
        if (heading.id) {
          observer.unobserve(heading)
        }
      })
    }
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })

      // Update URL without scrolling
      history.pushState(null, '', `#${id}`)
    }
  }

  // Don't render if no headings found
  if (toc.length === 0) {
    return null
  }

  return (
    <div
      className={`${
        showOnMobile ? '' : 'hidden lg:block'
      } sticky top-24 ml-8 max-h-[calc(100vh-6rem)] w-64 overflow-y-auto`}
    >
      <div className="rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
        {/* Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between p-4 text-left font-semibold text-gray-900 dark:text-gray-100"
        >
          <span className="flex items-center gap-2">
            <ListBulletIcon className="h-5 w-5 text-primary-500" />
            Tabla de Contenidos
          </span>
          <svg
            className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* TOC List */}
        {isOpen && (
          <nav className="px-4 pb-4">
            <ul className="space-y-2 text-sm">
              {toc.map((item) => {
                const isActive = activeId === item.id
                const isH3 = item.level === 3

                return (
                  <li key={item.id} className={`${isH3 ? 'ml-4' : ''} transition-all duration-200`}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleClick(e, item.id)}
                      className={`block py-1 transition-colors ${
                        isActive
                          ? 'font-medium text-primary-600 dark:text-primary-400'
                          : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                      }`}
                    >
                      {item.text}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        )}
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="mt-4 w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      >
        ↑ Volver arriba
      </button>
    </div>
  )
}
