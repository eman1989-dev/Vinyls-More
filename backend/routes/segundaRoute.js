import express from 'express';
import SecondHand from '../models/segunda.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { productId, sellerId, conditionDetails } = req.body;
    const newSecondHand = new SecondHand({ productId, sellerId, conditionDetails });
    await newSecondHand.save();
    res.status(201).json(newSecondHand);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la segunda mano' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const secondHand = await SecondHand.findById(req.params.id);
    if (!secondHand) return res.status(404).json({ message: 'Segunda mano no encontrada' });
    res.json(secondHand);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la segunda mano' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedSecondHand = await SecondHand.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSecondHand) return res.status(404).json({ message: 'Segunda mano no encontrada' });
    res.json(updatedSecondHand);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la segunda mano' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedSecondHand = await SecondHand.findByIdAndDelete(req.params.id);
    if (!deletedSecondHand) return res.status(404).json({ message: 'Segunda mano no encontrada' });
    res.json(deletedSecondHand);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la segunda mano' });
  }
});

export default router;
