import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import StatsGrid from '@/components/StatsGrid'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  const totalTags = new Set(posts.flatMap((post) => post.tags || [])).size

  return (
    <>
      {/* Hero Section Mejorado */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100 opacity-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" />
        <div className="relative space-y-6 pb-12 pt-10 md:space-y-8 md:pb-16 md:pt-12">
          <div className="space-y-4">
            <h1 className="animate-fade-in text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Hola, soy</span>
              <span className="block bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
                Jonatthan Medalla
              </span>
            </h1>
            <p className="animate-fade-in-delay-1 max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-gray-300 md:text-2xl">
              Full Stack Developer | Estudiante de Ingeniería Informática
            </p>
            <p className="animate-fade-in-delay-2 max-w-2xl text-lg leading-7 text-gray-500 dark:text-gray-400">
              {siteMetadata.description ||
                'Compartiendo conocimiento sobre programación, desarrollo web y tecnología.'}
            </p>
          </div>

          {/* Stats with animations */}
          <div className="animate-fade-in-delay-3 pt-6">
            <StatsGrid posts={posts.length} tags={totalTags} projects={2} />
          </div>

          {/* CTA Buttons */}
          <div className="animate-fade-in-delay-4 flex flex-wrap gap-4 pt-4">
            <Link
              href="/blog"
              className="group inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-base font-medium text-white transition-all hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/50 dark:bg-primary-500 dark:hover:bg-primary-600 md:px-8 md:py-4 md:text-lg"
            >
              Ver todos los posts
              <svg
                className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 transition-all hover:border-primary-500 hover:text-primary-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-primary-400 dark:hover:text-primary-400 md:px-8 md:py-4 md:text-lg"
            >
              Conóceme más
            </Link>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-12 md:space-y-5">
          <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            Últimos Posts
          </h2>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No se encontraron posts.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Publicado el</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Leer más: "${title}"`}
                        >
                          Leer más &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="Todos los posts"
          >
            Todos los posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
