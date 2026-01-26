async function getRecommendations(weights, proyecto = 'Proyecto') {
  const payload = { weights, proyecto }
  const resp = await fetch(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/recommend-stack/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!resp.ok) {
    const text = await resp.text()
    throw new Error(`API error: ${resp.status} ${text}`)
  }
  return resp.json()
}

export { getRecommendations }
