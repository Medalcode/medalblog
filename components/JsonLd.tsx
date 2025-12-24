import React from 'react'

interface Article {
  '@type': 'BlogPosting'
  headline: string
  image?: string[]
  datePublished: string
  dateModified?: string
  author: {
    '@type': 'Person'
    name: string
    url?: string
  }
  publisher: {
    '@type': 'Organization'
    name: string
    logo: {
      '@type': 'ImageObject'
      url: string
    }
  }
  description?: string
  url: string
}

interface Breadcrumb {
  '@type': 'BreadcrumbList'
  itemListElement: Array<{
    '@type': 'ListItem'
    position: number
    name: string
    item?: string
  }>
}

interface Person {
  '@type': 'Person'
  name: string
  url?: string
  sameAs?: string[]
  jobTitle?: string
  description?: string
}

interface Website {
  '@type': 'WebSite'
  url: string
  name: string
  description: string
  potentialAction?: {
    '@type': 'SearchAction'
    target: string
    'query-input': string
  }
}

type Schema = Article | Breadcrumb | Person | Website

interface JsonLdProps {
  data: Schema | Schema[]
}

/**
 * JsonLd Component
 *
 * Adds structured data (JSON-LD) to pages for better SEO and rich results in Google.
 * Supports Article, Breadcrumb, Person, and Website schemas.
 *
 * @example
 * <JsonLd data={{
 *   '@type': 'BlogPosting',
 *   headline: 'Post Title',
 *   datePublished: '2025-01-01',
 *   author: { '@type': 'Person', name: 'Author' },
 *   // ... more fields
 * }} />
 */
export default function JsonLd({ data }: JsonLdProps) {
  const jsonLdData = Array.isArray(data) ? data : [data]

  return (
    <>
      {jsonLdData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              ...schema,
            }),
          }}
        />
      ))}
    </>
  )
}

/**
 * Helper function to create Article schema for blog posts
 */
export function createArticleSchema({
  title,
  description,
  date,
  lastmod,
  url,
  images,
  authorName,
  authorUrl,
  siteName,
  siteUrl,
}: {
  title: string
  description?: string
  date: string
  lastmod?: string
  url: string
  images?: string[]
  authorName: string
  authorUrl?: string
  siteName: string
  siteUrl: string
}): Article {
  return {
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: images || [],
    datePublished: date,
    dateModified: lastmod || date,
    author: {
      '@type': 'Person',
      name: authorName,
      url: authorUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/static/images/pink_logo.svg`,
      },
    },
    url: url,
  }
}

/**
 * Helper function to create Breadcrumb schema
 */
export function createBreadcrumbSchema(items: Array<{ name: string; url?: string }>): Breadcrumb {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Helper function to create Person schema
 */
export function createPersonSchema({
  name,
  url,
  sameAs,
  jobTitle,
  description,
}: {
  name: string
  url?: string
  sameAs?: string[]
  jobTitle?: string
  description?: string
}): Person {
  return {
    '@type': 'Person',
    name,
    url,
    sameAs,
    jobTitle,
    description,
  }
}

/**
 * Helper function to create Website schema
 */
export function createWebsiteSchema({
  url,
  name,
  description,
  searchUrl,
}: {
  url: string
  name: string
  description: string
  searchUrl?: string
}): Website {
  const schema: Website = {
    '@type': 'WebSite',
    url,
    name,
    description,
  }

  if (searchUrl) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: `${searchUrl}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    }
  }

  return schema
}
