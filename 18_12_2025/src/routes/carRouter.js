import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  const cars = await prisma.car.findMany()
  res.json(cars)
})

router.get('/:id', async (req, res) => {
  const id = +req.params.id
  const car = await prisma.car.findUnique({ where: { id } })
  if (!car) {
    return res.status(404).json({ error: `Car with id ${id} not found` })
  }
  res.json(car)
})
export default router
