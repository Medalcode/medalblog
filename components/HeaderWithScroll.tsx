'use client'

import { useEffect, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const HeaderWithScroll = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerClass = `flex items-center w-full justify-between transition-all duration-300 ${
    siteMetadata.stickyNav ? 'sticky top-0 z-50' : ''
  } ${
    scrolled
      ? 'bg-white/80 py-4 shadow-md backdrop-blur-md dark:bg-gray-950/80 dark:shadow-gray-900/50'
      : 'bg-white py-10 dark:bg-gray-950'
  }`

  const titleClass = `transition-all duration-300 ${
    scrolled ? 'text-2xl md:text-3xl' : 'text-2xl md:text-4xl'
  }`

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="mr-3">
            <h1
              className={titleClass}
              style={{
                color: '#FF69B4',
                fontWeight: 'bold',
                fontFamily: 'var(--font-space-grotesk), sans-serif',
              }}
            >
              MEDALBLOG.
            </h1>
          </div>
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="hidden h-6 text-2xl font-semibold sm:block">
              {siteMetadata.headerTitle}
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <div className="no-scrollbar hidden max-w-40 items-center space-x-4 overflow-x-auto pr-2 sm:flex sm:space-x-6 md:max-w-72 lg:max-w-96">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="block font-medium text-gray-900 transition-colors hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
              >
                {link.title}
              </Link>
            ))}
        </div>
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default HeaderWithScroll
