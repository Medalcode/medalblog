import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const getTagSize = (count: number) => {
    const max = Math.max(...Object.values(tagCounts))
    const min = Math.min(...Object.values(tagCounts))
    const ratio = (count - min) / (max - min)
    return 0.875 + ratio * 0.875 // 0.875rem to 1.75rem
  }

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-4 pb-8 pt-6 md:space-y-5">
          <h1 className="animate-fade-in text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Etiquetas
          </h1>
          <p className="animate-fade-in-delay-1 text-lg leading-7 text-gray-500 dark:text-gray-400">
            Explora el contenido por temas
          </p>
          <div className="animate-fade-in-delay-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900 dark:text-primary-300">
              {tagKeys.length} etiquetas
            </span>
          </div>
        </div>
        <div className="py-12">
          {tagKeys.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No se encontraron etiquetas.
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-4">
            {sortedTags.map((t, index) => {
              const count = tagCounts[t]
              const size = getTagSize(count)
              return (
                <Link
                  key={t}
                  href={`/tags/${slug(t)}`}
                  className="animate-fade-in group transition-all hover:scale-110"
                  style={{
                    fontSize: `${size}rem`,
                    animationDelay: `${index * 0.05}s`,
                    animationFillMode: 'both',
                  }}
                  aria-label={`Ver ${count} publicaciones con la etiqueta ${t}`}
                >
                  <span className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 transition-all group-hover:border-primary-500 group-hover:bg-primary-50 group-hover:text-primary-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:group-hover:border-primary-400 dark:group-hover:bg-primary-900/30 dark:group-hover:text-primary-400">
                    {t}
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                      {count}
                    </span>
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
