import React from 'react'

export default function TechPage({ techs, sanityConfigured }) {
  return (
    <main style={{ padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1>Tecnologías (desde Sanity/GROQ)</h1>
      {!sanityConfigured && (
        <div style={{ marginBottom: 16, color: '#b33' }}>
          SANITY_PROJECT_ID no configurado. Define variables de entorno para ver contenido real.
        </div>
      )}
      {techs.length === 0 ? (
        <p>No se encontraron tecnologías.</p>
      ) : (
        techs.map((t) => (
          <div key={t._id || t.name} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 8 }}>
            <strong>{t.name}</strong>
            <div style={{ fontSize: 13, color: '#555' }}>{t.category?.name}</div>
            <p>{t.description}</p>
          </div>
        ))
      )}
    </main>
  )
}

export async function getStaticProps() {
  let techs = []
  let sanityConfigured = !!process.env.SANITY_PROJECT_ID
  if (sanityConfigured) {
    try {
      const client = require('../lib/groqClient')
      const query = `*[_type == "technology"]{_id, name, description, category->{name}}`
      techs = await client.fetch(query)
    } catch (err) {
      console.error('GROQ fetch error', err)
      techs = []
    }
  }

  return { props: { techs, sanityConfigured }, revalidate: 60 }
}
