import express from 'express'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import { db } from './config/dbConnect'
import router from './routes'
import swaggerFile from '../swagger.json'

dotenv.config()
const port = process.env.PORT || 3000

db.on('error', console.log.bind(console, 'Error DB Connection'))
db.once('open', () => console.log('Db Connected'))

const app = express()
app.use(express.json())
app.use(router)
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`)
})

export default app
