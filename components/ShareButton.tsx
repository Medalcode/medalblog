'use client'

import { useState } from 'react'
import { ShareIcon, ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline'

interface ShareButtonProps {
  title: string
  url: string
  text?: string
}

/**
 * ShareButton Component
 *
 * Share button with:
 * - Web Share API for mobile (native share dialog)
 * - Copy link fallback for desktop
 * - Visual feedback on copy
 * - Accessible and responsive
 *
 * @example
 * <ShareButton
 *   title="Post Title"
 *   url="https://example.com/post"
 *   text="Check out this post!"
 * />
 */
export default function ShareButton({ title, url, text }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    // Check if Web Share API is available (mobile browsers)
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: text || title,
          url,
        })
      } catch (error) {
        // User cancelled or error occurred
        console.log('Share cancelled or failed:', error)
      }
    } else {
      // Fallback: Copy link to clipboard
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        console.error('Failed to copy:', error)
      }
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:shadow-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      aria-label={copied ? 'Link copiado' : 'Compartir post'}
    >
      {copied ? (
        <>
          <CheckIcon className="h-5 w-5 text-green-500" />
          <span className="text-green-500">¡Copiado!</span>
        </>
      ) : (
        <>
          {navigator.share ? (
            <ShareIcon className="h-5 w-5" />
          ) : (
            <ClipboardDocumentIcon className="h-5 w-5" />
          )}
          <span>Compartir</span>
        </>
      )}
    </button>
  )
}

/**
 * SocialShareButtons Component
 *
 * Social media share buttons for Twitter, LinkedIn, Facebook, etc.
 */
interface SocialShareButtonsProps {
  url: string
  title: string
  hashtags?: string[]
}

export function SocialShareButtons({ url, title, hashtags = [] }: SocialShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedHashtags = hashtags.map((tag) => encodeURIComponent(tag)).join(',')

  const shareLinks = [
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}${encodedHashtags ? `&hashtags=${encodedHashtags}` : ''}`,
      icon: '𝕏',
      color: 'hover:bg-black hover:text-white',
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: 'in',
      color: 'hover:bg-blue-600 hover:text-white',
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: 'f',
      color: 'hover:bg-blue-700 hover:text-white',
    },
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: 'W',
      color: 'hover:bg-green-500 hover:text-white',
    },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {shareLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-lg font-bold transition-all dark:border-gray-600 dark:bg-gray-800 ${social.color}`}
          aria-label={`Compartir en ${social.name}`}
        >
          {social.icon}
        </a>
      ))}
    </div>
  )
}
