import express from 'express'
import dotenv from 'dotenv'
import { db } from './config/dbConnect'
import router from './routes'

dotenv.config()
const port = process.env.PORT || 3000

db.on('error', console.log.bind(console, 'Error DB Connection'))
db.once('open', () => console.log('Db Connected'))

const app = express()
app.use(router)

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`)
})

export default app
