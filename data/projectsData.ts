interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
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
