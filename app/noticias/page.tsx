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

interface DevToArticle {
  title: string
  description: string
  url: string
  cover_image: string | null
  social_image: string | null
  published_at: string
  user: {
    name: string
  }
}

async function getTechNews(): Promise<NewsArticle[]> {
  try {
    // Usando NewsAPI - Puedes obtener una API key gratuita en https://newsapi.org
    const apiKey = process.env.NEWS_API_KEY

    // Fallback con Dev.to API (No requiere key y tiene imágenes)
    const devToResponse = await fetch(
      'https://dev.to/api/articles?tag=programming&top=1&per_page=9',
      { next: { revalidate: 3600 } }
    )

    if (devToResponse.ok) {
      const devToData = await devToResponse.json()
      // Adaptar formato Dev.to a nuestra interfaz
      return devToData.map((article: DevToArticle) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.cover_image || article.social_image,
        publishedAt: article.published_at,
        source: { name: 'Dev.to' },
        author: article.user.name,
      }))
    }

    return []
  } catch (error) {
    console.error('Error fetching tech news:', error)
    return []
  }
}

function getMockNews(): NewsArticle[] {
  return []
}

export default async function NoticiasPage() {
  const news = await getTechNews()

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <PageTitle>Noticias de Tecnología</PageTitle>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Las últimas novedades del mundo del desarrollo, seleccionadas para ti.
          </p>
        </div>

        {news.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mb-4 text-6xl">📰</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Cargando noticias...
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Estamos buscando lo último en tecnología. Actualiza en unos segundos.
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
    </>
  )
}
