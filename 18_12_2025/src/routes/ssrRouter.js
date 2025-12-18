import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import path from 'path'

const router = Router()
const prisma = new PrismaClient()
const __dirname = import.meta.dirname

router.get('/', (req, res) => {
  const filename = path.join(__dirname, '../html/index.html')
  res.sendFile(filename)
})

router.post('/', async (req, res) => {
  const { manufacturer, model, color, fuel, vin } = req.body
  const existingCar = await prisma.car.findUnique({ where: { vin } })

  if (existingCar) {
    return res.status(422).json({ message: 'VIN already exists' })
  }

  const newCar = await prisma.car.create({
    data: manufacturer,
    model,
    color,
    fuel,
    vin
  })
  console.log(newCar)

  res.json(newCar)
  res.redirect('/')
})

export default router
