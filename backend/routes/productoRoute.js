import express from "express";
import Product from "../models/producto.js";
import multer from "multer";

const router = express.Router();

// 🔹 MULTER CONFIG
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Solo se aceptan imágenes"), false);
    }
  },
});

// ================= CREATE =================
router.post("/", async (req, res) => {
  try {
    const {
    title,
    artist,
    genre,
    format,
    year,
    price,
    stock,
    description,
    isSecondHand,
    images,
    condition, // ✅ AÑADE ESTO
    } = req.body;

    const newProduct = new Product({
      title,
      artist,
      genre,
      format,
      year: year ? Number(year) : undefined,
      price: Number(price),
      stock: Number(stock),
      description,
      isSecondHand: isSecondHand === true || isSecondHand === "true",
      condition,
      // 🔥 aquí está el fix
      imageUrl: images?.[0] || null,
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("ERROR CREATE:", error);
    res.status(500).json({ message: "Error al crear producto" });
  }
});
// ================= GET ALL =================
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().select("-image");
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
});

// ================= GET BY ID =================
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el producto" });
  }
});

// ================= GET IMAGE =================
router.get("/:id/image", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || !product.image) {
      return res.status(404).json({ message: "Imagen no encontrada" });
    }

    res.set("Content-Type", product.imageContentType || "image/jpeg");
    res.send(product.image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la imagen" });
  }
});

// ================= UPDATE =================
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updates = { ...req.body };

    // 🔥 Convertir tipos
    if (updates.year) updates.year = Number(updates.year);
    if (updates.price) updates.price = Number(updates.price);
    if (updates.stock) updates.stock = Number(updates.stock);

    if (updates.isSecondHand !== undefined) {
      updates.isSecondHand =
        updates.isSecondHand === "true" || updates.isSecondHand === true;
    }

    // 🔥 Imagen opcional
    if (req.file) {
      updates.image = req.file.buffer;
      updates.imageContentType = req.file.mimetype;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error("ERROR UPDATE PRODUCT:", error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
});

// ================= DELETE =================
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(deletedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
});

export default router;