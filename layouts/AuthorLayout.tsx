import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import ExperienceTimeline from '@/components/ExperienceTimeline'
import SkillsGrid from '@/components/SkillsGrid'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } = content

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Sobre mí
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8">
            {avatar && (
              <div className="relative">
                <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-r from-primary-400 to-primary-600 opacity-75 blur"></div>
                <Image
                  src={avatar}
                  alt="avatar"
                  width={192}
                  height={192}
                  className="relative h-48 w-48 rounded-full ring-4 ring-white dark:ring-gray-950"
                />
              </div>
            )}
            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} size={7} />
              <SocialIcon kind="github" href={github} size={7} />
              <SocialIcon kind="linkedin" href={linkedin} size={7} />
              <SocialIcon kind="x" href={twitter} size={7} />
              <SocialIcon kind="bluesky" href={bluesky} size={7} />
            </div>
          </div>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
            {children}
          </div>
        </div>

        {/* New Enhanced Sections */}
        <div className="space-y-12 py-12">
          <SkillsGrid />
          <ExperienceTimeline />
        </div>
      </div>
    </>
  )
}
