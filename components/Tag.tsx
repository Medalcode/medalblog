import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mr-2 inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 transition-all hover:scale-105 hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-300 dark:hover:bg-primary-900/50"
    >
      #{text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
