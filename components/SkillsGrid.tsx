'use client'

interface Skill {
  name: string
  icon: string
  category: 'frontend' | 'backend' | 'tools' | 'other'
}

const skills: Skill[] = [
  // Frontend
  { name: 'React', icon: '⚛️', category: 'frontend' },
  { name: 'Next.js', icon: '▲', category: 'frontend' },
  { name: 'TypeScript', icon: '📘', category: 'frontend' },
  { name: 'Tailwind CSS', icon: '🎨', category: 'frontend' },

  // Backend
  { name: 'Node.js', icon: '🟢', category: 'backend' },
  { name: 'Python', icon: '🐍', category: 'backend' },
  { name: 'Django', icon: '🎸', category: 'backend' },
  { name: 'PostgreSQL', icon: '🐘', category: 'backend' },

  // Tools
  { name: 'Git', icon: '📦', category: 'tools' },
  { name: 'Docker', icon: '🐳', category: 'tools' },
  { name: 'Power Automate', icon: '⚡', category: 'tools' },
  { name: 'VS Code', icon: '💻', category: 'tools' },
  { name: 'Vercel', icon: '▲', category: 'tools' },
]

const categoryTitles = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Herramientas',
  other: 'Otros',
}

const SkillsGrid = () => {
  const categories = ['frontend', 'backend', 'tools'] as const

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Habilidades
      </h2>
      {categories.map((category) => {
        const categorySkills = skills.filter((skill) => skill.category === category)
        return (
          <div key={category} className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {categoryTitles[category]}
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {categorySkills.map((skill) => (
                <div
                  key={skill.name}
                  className="group flex flex-col items-center space-y-2 rounded-lg border border-gray-200 bg-white p-4 text-center transition-all hover:scale-105 hover:border-primary-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:hover:border-primary-400"
                >
                  <span className="text-3xl transition-transform group-hover:scale-110">
                    {skill.icon}
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SkillsGrid
