
import express from 'express'
import { OrderController } from './order.controlar'
// import { OrderCOntrolar } from './order.controlar'
const router = express.Router()

router.post('/orders', OrderController.placeOrder)
router.get('/orders/revenue', OrderController.calculateRevenueDB)
export const orderRoute = router