import { useState } from 'react'
import { getRecommendations } from '../services/recommendation'

export default function Home() {
  const [escalabilidad, setEscalabilidad] = useState(8)
  const [facilidad, setFacilidad] = useState(8)
  const [ecosistema, setEcosistema] = useState(8)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const weights = { Escalabilidad: escalabilidad, Facilidad: facilidad, Ecosistema: ecosistema }
      const res = await getRecommendations(weights, 'MVP')
      setResults(res)
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1>Stack Recommender — Demo</h1>
      <form onSubmit={handleSubmit}>
        <label>Escalabilidad: {escalabilidad}</label>
        <input type="range" min="1" max="10" value={escalabilidad} onChange={e => setEscalabilidad(Number(e.target.value))} />
        <br />
        <label>Facilidad: {facilidad}</label>
        <input type="range" min="1" max="10" value={facilidad} onChange={e => setFacilidad(Number(e.target.value))} />
        <br />
        <label>Ecosistema: {ecosistema}</label>
        <input type="range" min="1" max="10" value={ecosistema} onChange={e => setEcosistema(Number(e.target.value))} />
        <br />
        <button type="submit" disabled={loading}>{loading ? 'Buscando...' : 'Recomendar'}</button>
      </form>

      {results && (
        <section style={{ marginTop: 24 }}>
          <h2>Resultados</h2>
          {results.recommendations.map((r) => (
            <div key={r.name} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 8 }}>
              <strong>{r.name}</strong> — {r.category} — Score: {r.final_score}
              <pre style={{ whiteSpace: 'pre-wrap' }}>{r.justification}</pre>
            </div>
          ))}
        </section>
      )}
    </main>
  )
}
