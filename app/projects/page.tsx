import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-4 pb-8 pt-6 md:space-y-5">
          <h1 className="animate-fade-in text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Proyectos
          </h1>
          <p className="animate-fade-in-delay-1 text-lg leading-7 text-gray-500 dark:text-gray-400">
            Explora mis proyectos personales y contribuciones de código abierto
          </p>
          <div className="animate-fade-in-delay-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900 dark:text-primary-300">
              {projectsData.length} proyectos
            </span>
          </div>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {projectsData.map((d, index) => (
              <div
                key={d.title}
                className="animate-fade-in"
                style={{ animationDelay: `${(index + 3) * 0.1}s`, animationFillMode: 'both' }}
              >
                <Card title={d.title} description={d.description} imgSrc={d.imgSrc} href={d.href} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
