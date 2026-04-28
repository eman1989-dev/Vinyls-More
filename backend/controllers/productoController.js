import Product from "../models/producto.js";
import dotenv from "dotenv";

dotenv.config();

exports.getProductos = async (req, res) => {
    try{
        const productos = await Product.find();
        res.json(productos);
    }catch(err){
        res.status(500).json({message: "Error en el servidor"});
    }
};

exports.getProductoId = async (req, res) => {
    try{
        const producto = await Product.findById(req.params.id);
        if(!producto) return res.status(404).json({error: 'Producto no encontrado'});
        res.json(producto);
    }catch(error){
        res.status(500).json({error: 'Error en el servidor'});
    }
};

exports.createProducto = async (req, res) => {
    try{
        const {title,artist,genre,format,year,price,stock,description,isSecondHand} = req.body;
        const nuevoProducto = new Product({title,artist,genre,format,year,price,stock,description,isSecondHand});
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    }catch(err){
        console.error(err);
        res.status(400).json({message: "Error al crear el producto"});
    }
};

exports.updateProducto = async(req,res) => {
    try{
        const productoActualizado = await Product.findByIdAndUpdate(req.params.id,req.body,{new: true});
        if(!productoActualizado){
            return res.status(404).json({error: 'Producto no encontrado'});
        }
        res.json(productoActualizado);
    }catch(error){
        res.status(400).json({error: 'Error al actualizar producto'});
    }
};

exports.deleteProducto = async(req,res) =>{
    try{
        const productoEliminado = await Product.findByIdAndDelete(req.params.id);
        if(!productoEliminado){
            return res.status(404).json({error: 'Producto no encontrado'});
        }
        res.json(productoEliminado);
    }catch(error){
        res.status(500).json({error: 'Error en el servidor'});
    }
};
