'use client'

interface TimelineItem {
  year: string
  title: string
  company: string
  description: string
}

const timelineData: TimelineItem[] = [
  {
    year: '2024',
    title: 'Desarrollador Full Stack',
    company: 'Empresa Actual',
    description:
      'Desarrollo de aplicaciones web modernas con Next.js, TypeScript y Node.js. Implementación de arquitecturas escalables y mejores prácticas.',
  },
  {
    year: '2023',
    title: 'Desarrollador Frontend',
    company: 'Tech Startup',
    description:
      'Creación de interfaces de usuario interactivas con React y Tailwind CSS. Optimización de rendimiento y experiencia de usuario.',
  },
  {
    year: '2022',
    title: 'Junior Developer',
    company: 'Agencia Digital',
    description:
      'Primeros pasos en desarrollo web profesional. Aprendizaje de frameworks modernos y metodologías ágiles.',
  },
]

const ExperienceTimeline = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Experiencia
      </h2>
      <div className="relative border-l-2 border-primary-500 pl-8">
        {timelineData.map((item, index) => (
          <div key={index} className="relative mb-8 pb-8">
            {/* Timeline dot */}
            <div className="absolute -left-10 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 ring-4 ring-white dark:ring-gray-950">
              <div className="h-2 w-2 rounded-full bg-white"></div>
            </div>

            {/* Content */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                  {item.year}
                </span>
              </div>
              <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-gray-100">
                {item.title}
              </h3>
              <p className="mb-2 text-sm font-medium text-primary-500 dark:text-primary-400">
                {item.company}
              </p>
              <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExperienceTimeline
