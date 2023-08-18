import express from 'express'
import { config } from './config'

const app = express()
console.log(process.env)
app.listen(config.port, () => {
  console.log(`
🚀 Server ready at: http://localhost:${config.port}`)
}
)

