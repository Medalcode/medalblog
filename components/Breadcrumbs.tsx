'use client'

import { usePathname } from 'next/navigation'
import Link from './Link'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/solid'
import JsonLd, { createBreadcrumbSchema } from './JsonLd'

interface BreadcrumbItem {
  name: string
  href?: string
}

/**
 * Breadcrumbs Component
 *
 * Displays breadcrumb navigation with:
 * - Auto-generated from current path
 * - Schema.org markup (JSON-LD)
 * - Responsive design
 * - Custom separator icon
 *
 * @example
 * // In a blog post: Home > Blog > Post Title
 * <Breadcrumbs />
 */
export default function Breadcrumbs() {
  const pathname = usePathname()

  // Generate breadcrumb items from pathname
  const breadcrumbItems = generateBreadcrumbs(pathname)

  // Don't show breadcrumbs on homepage
  if (pathname === '/') {
    return null
  }

  // Create schema for SEO
  const breadcrumbSchema = createBreadcrumbSchema(
    breadcrumbItems.map((item) => ({
      name: item.name,
      url: item.href ? `${process.env.NEXT_PUBLIC_SITE_URL || ''}${item.href}` : undefined,
    }))
  )

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1

            return (
              <li key={item.href || item.name} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRightIcon className="h-4 w-4 text-gray-400 dark:text-gray-600" />
                )}

                {item.href ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 transition-colors hover:text-primary-500 dark:hover:text-primary-400"
                  >
                    {index === 0 && <HomeIcon className="h-4 w-4" />}
                    <span>{item.name}</span>
                  </Link>
                ) : (
                  <span
                    className={`flex items-center gap-1 ${
                      isLast
                        ? 'font-medium text-gray-900 dark:text-gray-100'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {index === 0 && <HomeIcon className="h-4 w-4" />}
                    <span>{item.name}</span>
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

/**
 * Generate breadcrumb items from pathname
 */
function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const paths = pathname.split('/').filter(Boolean)

  const breadcrumbs: BreadcrumbItem[] = [
    {
      name: 'Inicio',
      href: '/',
    },
  ]

  let currentPath = ''

  paths.forEach((path, index) => {
    currentPath += `/${path}`

    // Decode URI component and format name
    const name = formatBreadcrumbName(decodeURIComponent(path))

    // Don't add link to the last item (current page)
    const isLast = index === paths.length - 1

    breadcrumbs.push({
      name,
      href: isLast ? undefined : currentPath,
    })
  })

  return breadcrumbs
}

/**
 * Format breadcrumb name by capitalizing and replacing dashes
 */
function formatBreadcrumbName(name: string): string {
  // Special cases for known routes
  const specialCases: Record<string, string> = {
    blog: 'Blog',
    tags: 'Tags',
    projects: 'Proyectos',
    about: 'Sobre Mí',
    noticias: 'Noticias',
  }

  if (specialCases[name]) {
    return specialCases[name]
  }

  // Replace dashes with spaces and capitalize
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
