'use client'

interface TimelineItem {
  year: string
  title: string
  company: string
  description: string
}

const timelineData: TimelineItem[] = [
  {
    year: '2024 - Presente',
    title: 'Full Stack Developer',
    company: 'Freelance & Proyectos Personales',
    description:
      'Desarrollo de aplicaciones web escalables con Next.js y React. Creación de este blog y mantenimiento de proyectos open source. Enfoque en performance y SEO.',
  },
  {
    year: '2023 - 2024',
    title: 'Desarrollador Backend Python',
    company: 'Tuniforme (Proyecto)',
    description:
      'Lideré el desarrollo del sistema de gestión para Tuniforme usando Django y Python. Integración exitosa con pasarela de pagos Webpay Plus (Transbank) y automatización de procesos.',
  },
  {
    year: '2022 - 2023',
    title: 'Aprendizaje Intensivo',
    company: 'Autodidacta',
    description:
      'Inmersión profunda en ciencias de la computación. Dominio de algoritmos, estructuras de datos y fundamentos de la web. Creación de múltiples proyectos de práctica.',
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
