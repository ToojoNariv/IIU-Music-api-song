import { serve } from '@hono/node-server'
import app from './server'

const port = Number(process.env.PORT) || 3001

serve(
  {
    fetch: app.fetch,
    port
  },
  (info) => {
    console.log(`🚀 IIU-Music-API (NepoTune) server running at: http://localhost:${info.port}`)
    console.log(`📖 API Documentation available at: http://localhost:${info.port}/docs`)
  }
)
