import express from 'express'
import path from 'path'
import carRouter from '../src/routes/carRouter.js'
import ssrRouter from '../src/routes/ssrRouter.js'

const app = express()
const __dirname = import.meta.dirname

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/cars', carRouter)
app.use('/', ssrRouter)

app.listen(8080, () => {
  console.log('Server is listening on port 8080')
})
