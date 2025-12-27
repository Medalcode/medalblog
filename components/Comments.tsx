'use client'

import { Comments as CommentsComponent } from 'pliny/comments'
import siteMetadata from '@/data/siteMetadata'

export default function Comments({ slug }: { slug: string }) {
  if (!siteMetadata.comments?.provider) {
    return null
  }

  return (
    <div id="comments" className="space-y-4">
      <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">Comentarios</h2>
      <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
    </div>
  )
}
