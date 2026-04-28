import express from 'express';
import Product from '../models/producto.js';
import multer from 'multer';

const router = express.Router();

// Configurar multer para almacenar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB límite
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se aceptan imágenes'), false);
    }
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, artist, genre, format, year, price, stock, description, isSecondHand } = req.body;
    const newProduct = new Product({ 
      title, 
      artist, 
      genre, 
      format, 
      year, 
      price, 
      stock, 
      description, 
      isSecondHand,
      image: req.file ? req.file.buffer : null,
      imageContentType: req.file ? req.file.mimetype : null
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto' });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().select('-image');
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

router.get('/:id/image', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.image) return res.status(404).json({ message: 'Imagen no encontrada' });
    res.set('Content-Type', product.imageContentType || 'image/jpeg');
    res.send(product.image);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la imagen' });
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) {
      updates.image = req.file.buffer;
      updates.imageContentType = req.file.mimetype;
    }
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
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
