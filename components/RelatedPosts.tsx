import { slug } from 'github-slugger'
import { allBlogs } from 'contentlayer/generated'
import Link from './Link'
import Image from './Image'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'

interface RelatedPostsProps {
  currentSlug: string
  currentTags?: string[]
  maxPosts?: number
}

/**
 * RelatedPosts Component
 *
 * Displays related blog posts based on:
 * - Tag similarity (posts with most matching tags)
 * - Fallback to recent posts if no tag matches
 * - Excludes current post
 *
 * @example
 * <RelatedPosts
 *   currentSlug="my-post"
 *   currentTags={['react', 'nextjs']}
 *   maxPosts={3}
 * />
 */
export default function RelatedPosts({
  currentSlug,
  currentTags = [],
  maxPosts = 3,
}: RelatedPostsProps) {
  // Filter out current post and drafts
  const eligiblePosts = allBlogs.filter(
    (post) => post.slug !== currentSlug && !post.draft && post.date
  )

  // Calculate similarity score based on matching tags
  const postsWithScore = eligiblePosts.map((post) => {
    const postTags = post.tags || []
    const matchingTags = postTags.filter((tag) =>
      currentTags.some((currentTag) => slug(currentTag) === slug(tag))
    )

    return {
      post,
      score: matchingTags.length,
    }
  })

  // Sort by score (most matching tags first), then by date (newest first)
  const sortedPosts = postsWithScore
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score
      }
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
    })
    .slice(0, maxPosts)
    .map((item) => item.post)

  // Don't render if no related posts found
  if (sortedPosts.length === 0) {
    return null
  }

  return (
    <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Posts Relacionados
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedPosts.map((post) => {
          const { slug, date, title, summary, tags, images } = post
          const imageSrc = images && images[0] ? images[0] : '/static/images/twitter-card.png'

          return (
            <article
              key={slug}
              className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              {/* Image */}
              <Link href={`/blog/${slug}`} className="block overflow-hidden">
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>

              {/* Content */}
              <div className="p-4">
                {/* Date */}
                <time dateTime={date} className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(date, siteMetadata.locale)}
                </time>

                {/* Title */}
                <h3 className="mt-2 text-lg font-semibold">
                  <Link
                    href={`/blog/${slug}`}
                    className="text-gray-900 transition-colors hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400"
                  >
                    {title}
                  </Link>
                </h3>

                {/* Summary */}
                {summary && (
                  <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                    {summary}
                  </p>
                )}

                {/* Tags */}
                {tags && tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tags.slice(0, 2).map((tag) => (
                      <Link
                        key={tag}
                        href={`/tags/${slug(tag)}`}
                        className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-primary-100 hover:text-primary-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-primary-900 dark:hover:text-primary-300"
                      >
                        {tag}
                      </Link>
                    ))}
                    {tags.length > 2 && (
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        +{tags.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
