import express from 'express';
import Cart from '../models/carrito.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { userId, items } = req.body;
    const newCart = new Cart({ userId, items });
    await newCart.save();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el carrito' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el carrito' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCart) return res.status(404).json({ message: 'Carrito no encontrado' });
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el carrito' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedCart = await Cart.findByIdAndDelete(req.params.id);
    if (!deletedCart) return res.status(404).json({ message: 'Carrito no encontrado' });
    res.json(deletedCart);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el carrito' });
  }
});

export default router;
