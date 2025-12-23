import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary-500">MEDALBLOG.</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Blog personal sobre programación, desarrollo web, y tecnología. Comparto mi
              experiencia y aprendizajes en el mundo del desarrollo.
            </p>
            <div className="flex space-x-3">
              <SocialIcon kind="github" href={siteMetadata.github} size={7} />
              <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={7} />
              <SocialIcon kind="twitter" href={siteMetadata.twitter} size={7} />
              <SocialIcon kind="x" href={siteMetadata.x} size={7} />
              <SocialIcon kind="instagram" href={siteMetadata.instagram} size={7} />
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/tags"
                  className="text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  Tags
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  Proyectos
                </Link>
              </li>
              <li>
                <Link
                  href="/noticias"
                  className="text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  Noticias
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  Sobre mí
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Newsletter</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Suscríbete para recibir las últimas publicaciones y actualizaciones directamente en tu
              correo.
            </p>
            <Link
              href="/newsletter"
              className="inline-block rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600 dark:hover:bg-primary-400"
            >
              Suscribirse
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-800">
          <div className="flex flex-col items-center justify-between space-y-4 text-sm text-gray-600 dark:text-gray-400 sm:flex-row sm:space-y-0">
            <div className="flex items-center space-x-2">
              <span>{siteMetadata.author}</span>
              <span>•</span>
              <span>© {new Date().getFullYear()}</span>
              <span>•</span>
              <Link
                href="/"
                className="transition-colors hover:text-primary-500 dark:hover:text-primary-400"
              >
                {siteMetadata.title}
              </Link>
            </div>
            <div>
              <a
                href={`mailto:${siteMetadata.email}`}
                className="transition-colors hover:text-primary-500 dark:hover:text-primary-400"
              >
                {siteMetadata.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
