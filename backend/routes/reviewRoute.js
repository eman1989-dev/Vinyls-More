import express from 'express'; 
import Review from '../models/review.js';

const router = express.Router();

// 🔹 Crear review
router.post('/', async (req, res) => {
  try {
    const { userId, productId, rating, comment } = req.body;
    const newReview = new Review({ userId, productId, rating, comment });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la review' });
  }
});

// 🔥 🔥 🔥 ESTA ES LA RUTA QUE TE FALTABA 🔥 🔥 🔥
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId
    });

    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener reviews del producto' });
  }
});

// 🔹 Obtener una review por ID
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review no encontrada' });
    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la review' });
  }
});

// 🔹 Actualizar review
router.put('/:id', async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReview) return res.status(404).json({ message: 'Review no encontrada' });
    res.json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la review' });
  }
});

// 🔹 Eliminar review
router.delete('/:id', async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) return res.status(404).json({ message: 'Review no encontrada' });
    res.json(deletedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la review' });
  }
});

export default router;