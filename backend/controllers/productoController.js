import Product from "../models/producto.js";

// 🔹 GET TODOS
export const getProductos = async (req, res) => {
  try {
    const productos = await Product.find().select("-image");
    res.json(productos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// 🔹 GET POR ID
export const getProductoId = async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// 🔹 GET IMAGEN
export const getProductoImagen = async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);

    if (!producto || !producto.image) {
      return res.status(404).json({ error: "Imagen no encontrada" });
    }

    res.set("Content-Type", producto.imageContentType || "image/jpeg");
    res.send(producto.image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la imagen" });
  }
};

// 🔹 CREATE
export const createProducto = async (req, res) => {
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
    } = req.body;

    // ⚠️ Convertir tipos (FormData manda strings)
    const nuevoProducto = new Product({
      title,
      artist,
      genre,
      format,
      year: year ? Number(year) : undefined,
      price: price ? Number(price) : undefined,
      stock: stock ? Number(stock) : undefined,
      description,
      isSecondHand: isSecondHand === "true" || isSecondHand === true,

      // ⚠️ Manejo seguro de imagen
      image: req.file ? req.file.buffer : undefined,
      imageContentType: req.file ? req.file.mimetype : undefined,
    });

    await nuevoProducto.save();

    res.status(201).json(nuevoProducto);
  } catch (err) {
    console.error("ERROR CREATE PRODUCT:", err);
    res.status(500).json({ message: "Error al crear el producto" });
  }
};

// 🔹 UPDATE
export const updateProducto = async (req, res) => {
  try {
    const updates = { ...req.body };

    // ⚠️ Convertir tipos
    if (updates.year) updates.year = Number(updates.year);
    if (updates.price) updates.price = Number(updates.price);
    if (updates.stock) updates.stock = Number(updates.stock);
    if (updates.isSecondHand !== undefined) {
      updates.isSecondHand =
        updates.isSecondHand === "true" || updates.isSecondHand === true;
    }

    // ⚠️ Imagen opcional
    if (req.file) {
      updates.image = req.file.buffer;
      updates.imageContentType = req.file.mimetype;
    }

    const productoActualizado = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(productoActualizado);
  } catch (error) {
    console.error("ERROR UPDATE PRODUCT:", error);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
};

// 🔹 DELETE
export const deleteProducto = async (req, res) => {
  try {
    const productoEliminado = await Product.findByIdAndDelete(req.params.id);

    if (!productoEliminado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(productoEliminado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};