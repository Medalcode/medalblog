interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Medalblog',
    description: `Blog personal sobre programación, desarrollo web y tecnología construido con Next.js 15, TypeScript y Tailwind CSS. 
    Incluye sistema de búsqueda con Kbar, comentarios con Giscus, newsletter, modo oscuro/claro, generación automática de RSS feeds, 
    sitemap dinámico y MDX para contenido enriquecido. Arquitectura basada en App Router de Next.js con React Server Components.`,
    imgSrc: '/static/images/medalblog-screenshot.png',
    href: 'https://github.com/Medalcode/medalblog',
  },
  {
    title: 'Tuniforme',
    description: `A fake store with transbank payment gateway built for the application  development workshop. The system allows 
    you to manage inventories, add, edit and delete uniforms, and receive alerts for low stock. Users can place orders, track 
    their status, and view purchase history. The distribution of uniforms is recorded, including  assignments, deliveries and 
    returns. It has authentication and roles for administrators, employees and users with different permissions. The interface 
    is intuitive and responsive thanks to Bootstrap, optimized for mobile devices.`,
    imgSrc: '/static/images/tuniforme_pic.png',
    href: 'https://tuniforme.onrender.com',
  },
]

export default projectsData
