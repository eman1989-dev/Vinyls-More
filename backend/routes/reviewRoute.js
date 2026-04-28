import express from 'express';
import Review from '../models/review.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { userId, productId, rating, comment } = req.body;
    const newReview = new Review({ userId, productId, rating, comment });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la review' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review no encontrada' });
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la review' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReview) return res.status(404).json({ message: 'Review no encontrada' });
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la review' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) return res.status(404).json({ message: 'Review no encontrada' });
    res.json(deletedReview);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la review' });
  }
});

export default router;
