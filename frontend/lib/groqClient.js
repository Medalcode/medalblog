const sanityClient = require('@sanity/client')

// Configure via env: SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_VERSION, SANITY_TOKEN (optional)
const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID || '',
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: process.env.SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_TOKEN || undefined,
})

module.exports = client
