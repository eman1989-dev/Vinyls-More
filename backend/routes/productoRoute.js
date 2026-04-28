import express from 'express';
import Product from '../models/producto.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { title, artist, genre, format, year, price, stock, description, isSecondHand } = req.body;
    const newProduct = new Product({ title, artist, genre, format, year, price, stock, description, isSecondHand });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto' });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
});

export default router;
