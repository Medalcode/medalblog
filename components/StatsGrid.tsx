'use client'

import { useEffect, useState } from 'react'

interface StatProps {
  value: number
  label: string
  suffix?: string
}

const AnimatedStat = ({ value, label, suffix = '' }: StatProps) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-primary-500 dark:text-primary-400">
        {count}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  )
}

interface StatsGridProps {
  posts: number
  tags: number
  projects: number
}

const StatsGrid = ({ posts, tags, projects }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-8 rounded-lg border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <AnimatedStat value={posts} label="Publicaciones" suffix="+" />
      <AnimatedStat value={tags} label="Temas" suffix="+" />
      <AnimatedStat value={projects} label="Proyectos" />
    </div>
  )
}

export default StatsGrid
