import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import NewsCard from '@/components/NewsCard'
import PageTitle from '@/components/PageTitle'

export const metadata: Metadata = {
  title: `Noticias de Tecnología - ${siteMetadata.title}`,
  description: 'Últimas noticias sobre tecnología, programación y desarrollo de software',
}

// Revalidar cada hora
export const revalidate = 3600

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

async function getTechNews(): Promise<NewsArticle[]> {
  try {
    // Usando NewsAPI - Puedes obtener una API key gratuita en https://newsapi.org
    const apiKey = process.env.NEWS_API_KEY

    if (!apiKey) {
      console.warn('NEWS_API_KEY no configurada, mostrando noticias de ejemplo')
      return getMockNews()
    }

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=technology&language=es&pageSize=12&apiKey=${apiKey}`,
      {
        next: { revalidate: 3600 },
      }
    )

    if (!response.ok) {
      console.error('Error fetching news:', response.status)
      return getMockNews()
    }

    const data = await response.json()
    return data.articles || []
  } catch (error) {
    console.error('Error fetching tech news:', error)
    return getMockNews()
  }
}

// Noticias de ejemplo si no hay API key
function getMockNews(): NewsArticle[] {
  return [
    {
      title: 'Configura tu NEWS_API_KEY para ver noticias reales',
      description:
        'Obtén tu API key gratuita en newsapi.org y agrégala a tu archivo .env.local como NEWS_API_KEY',
      url: 'https://newsapi.org',
      urlToImage: '/static/images/news-placeholder.jpg',
      publishedAt: new Date().toISOString(),
      source: { name: 'Configuración' },
      author: 'Medalblog',
    },
    {
      title: 'Next.js 15 trae mejoras significativas en rendimiento',
      description:
        'La nueva versión de Next.js incluye mejoras en el App Router, mejor caching y soporte mejorado para Server Components.',
      url: 'https://nextjs.org',
      urlToImage: '/static/images/news-placeholder.jpg',
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      source: { name: 'Next.js' },
      author: 'Vercel',
    },
    {
      title: 'React 19 en el horizonte con nuevas características',
      description:
        'El equipo de React anuncia nuevas características que mejorarán la experiencia de desarrollo y el rendimiento.',
      url: 'https://react.dev',
      urlToImage: '/static/images/news-placeholder.jpg',
      publishedAt: new Date(Date.now() - 172800000).toISOString(),
      source: { name: 'React' },
      author: 'Meta',
    },
  ]
}

export default async function NoticiasPage() {
  const news = await getTechNews()

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <PageTitle>Noticias de Tecnología</PageTitle>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Las últimas noticias sobre tecnología, programación y desarrollo de software.
            Actualizado cada hora.
          </p>
        </div>

        {news.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No se pudieron cargar las noticias en este momento.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {news.map((article, index) => (
              <NewsCard key={`${article.url}-${index}`} article={article} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 rounded-lg bg-gray-50 p-6 dark:bg-gray-800/50">
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          ℹ️ Configuración
        </h3>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Para mostrar noticias reales, necesitas configurar una API key gratuita:
        </p>
        <ol className="list-inside list-decimal space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>
            Regístrate en{' '}
            <a
              href="https://newsapi.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            >
              newsapi.org
            </a>{' '}
            (es gratis)
          </li>
          <li>Obtén tu API key desde el dashboard</li>
          <li>
            Agrégala a tu archivo{' '}
            <code className="rounded bg-gray-200 px-1 dark:bg-gray-700">.env.local</code>:
            <br />
            <code className="mt-1 block rounded bg-gray-200 p-2 dark:bg-gray-700">
              NEWS_API_KEY=tu_api_key_aqui
            </code>
          </li>
          <li>Reinicia el servidor de desarrollo</li>
        </ol>
      </div>
    </>
  )
}
