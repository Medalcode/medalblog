import NextImage from 'next/image'
import Link from './Link'

interface NewsArticle {
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  source: {
    name: string
  }
  author: string
}

interface NewsCardProps {
  article: NewsArticle
}

export default function NewsCard({ article }: NewsCardProps) {
  const { title, description, url, urlToImage, publishedAt, source, author } = article

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
      if (diffHours < 1) {
        const diffMinutes = Math.ceil(diffTime / (1000 * 60))
        return `Hace ${diffMinutes} minuto${diffMinutes !== 1 ? 's' : ''}`
      }
      return `Hace ${diffHours} hora${diffHours !== 1 ? 's' : ''}`
    } else if (diffDays === 1) {
      return 'Ayer'
    } else if (diffDays < 7) {
      return `Hace ${diffDays} días`
    } else {
      return date.toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    }
  }

  return (
    <article className="group overflow-hidden rounded-lg border-2 border-gray-200 border-opacity-60 transition-all duration-200 hover:border-primary-500 dark:border-gray-700 dark:hover:border-primary-500">
      {urlToImage && (
        <Link href={url} target="_blank" rel="noopener noreferrer" aria-label={`Leer: ${title}`}>
          <div className="relative h-48 w-full overflow-hidden">
            <NextImage
              alt={title}
              src={urlToImage}
              fill
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
      )}

      <div className="p-6">
        {/* Fuente y fecha */}
        <div className="mb-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span className="font-medium">{source.name}</span>
          <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
        </div>

        {/* Título */}
        <h2 className="mb-3 line-clamp-2 text-xl font-bold leading-tight tracking-tight">
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 transition-colors hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400"
            aria-label={`Leer: ${title}`}
          >
            {title}
          </Link>
        </h2>

        {/* Descripción */}
        {description && (
          <p className="prose mb-4 line-clamp-3 max-w-none text-gray-600 dark:text-gray-400">
            {description}
          </p>
        )}

        {/* Autor y enlace */}
        <div className="flex items-center justify-between">
          {author && author !== 'null' && (
            <span className="text-xs text-gray-500 dark:text-gray-400">Por {author}</span>
          )}
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Leer más: ${title}`}
          >
            Leer más →
          </Link>
        </div>
      </div>
    </article>
  )
}
