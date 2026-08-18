import { handle } from '@hono/node-server/vercel'
import app from '../dist/src/server.js'

export default handle(app)