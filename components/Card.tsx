import PostImage from './PostImage'
import Link from './Link'

const Card = ({ title, description, imgSrc, href }) => (
  <div className="md max-w-[544px] p-4 md:w-1/2">
    <div
      className={`${
        imgSrc && 'h-full'
      } group overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 transition-all hover:border-primary-500 hover:shadow-lg dark:border-gray-700 dark:hover:border-primary-400`}
    >
      {href ? (
        <Link href={href} aria-label={`Link to ${title}`}>
          <PostImage
            src={imgSrc}
            alt={title}
            title={title}
            className="h-48 transition-transform group-hover:scale-105 md:h-36 lg:h-48"
          />
        </Link>
      ) : (
        <PostImage src={imgSrc} alt={title} title={title} className="h-48 md:h-36 lg:h-48" />
      )}
      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
          {href ? (
            <Link
              href={href}
              aria-label={`Link to ${title}`}
              className="transition-colors hover:text-primary-500 dark:hover:text-primary-400"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
        {href && (
          <Link
            href={href}
            className="inline-flex items-center text-base font-medium leading-6 text-primary-500 transition-all hover:translate-x-1 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${title}`}
          >
            Conocer más <span className="ml-1">&rarr;</span>
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
