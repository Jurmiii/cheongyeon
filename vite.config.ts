import { defineConfig, loadEnv, type Plugin } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

function kakaoAuthDevApi(): Plugin {
  return {
    name: 'kakao-auth-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/kakao-auth', async (req, res) => {
        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          res.end()
          return
        }

        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        try {
          const chunks: Buffer[] = []
          await new Promise<void>((resolve, reject) => {
            req.on('data', (chunk: Buffer) => chunks.push(chunk))
            req.on('end', () => resolve())
            req.on('error', reject)
          })

          const body = JSON.parse(Buffer.concat(chunks).toString('utf8'))
          const { handleKakaoAuth } = await import('./server/kakaoAuthHandler')
          const data = await handleKakaoAuth(body)

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(data))
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unexpected server error.'
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: message }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  process.env.KAKAO_REST_API_KEY = env.KAKAO_REST_API_KEY
  process.env.KAKAO_CLIENT_SECRET = env.KAKAO_CLIENT_SECRET
  process.env.SUPABASE_URL = env.SUPABASE_URL || env.VITE_SUPABASE_URL
  process.env.SUPABASE_SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY
  process.env.VITE_SUPABASE_URL = env.VITE_SUPABASE_URL

  return {
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      kakaoAuthDevApi(),
    ],
  }
})
