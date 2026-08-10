import express from 'express';
import Order from '../models/orden.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { userId, items, totalAmount, status, shippingAddress } = req.body;
    const newOrder = new Order({ userId, items, totalAmount, status, shippingAddress });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la orden' });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener órdenes del usuario' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la orden' });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener órdenes" });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: 'Orden no encontrada' });
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la orden' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: 'Orden no encontrada' });
    res.json(deletedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la orden' });
  }
});

export default router;
