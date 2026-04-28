import Cart from "../models/carrito.js";
import dotenv from "dotenv";

dotenv.config();

exports.getCarrito = async (req, res) => {
    try{
        const carrito = await Cart.findById(req.params.id);
        if(!carrito) return res.status(404).json({error: 'Carrito no encontrado'});
        res.json(carrito);
    }catch(error){
        res.status(500).json({error: 'Error en el servidor'});
    }
};

exports.getCarrtioId = async (req, res) => {
    try{
        const carrito = await Cart.findById(req.params.id);
        if(!carrito) return res.status(404).json({error: 'Carrito no encontrado'});
        res.json(carrito);
    }catch(error){
        res.status(500).json({error: 'Error en el servidor'});
    }
};

exports.createCarrito = async (req, res) => {
    try{
        const {userId, items} = req.body;
        const nuevoCarrito = new Cart({userId, items});
        await nuevoCarrito.save();
        res.status(201).json(nuevoCarrito);
    }catch(err){
        console.error(err);
        res.status(400).json({message: "Error al crear el producto"});
    }
};

exports.updateCarrito = async(req,res) => {
    try{
        const carritoActualizado = await Cart.findByIdAndUpdate(req.params.id,req.body,{new: true});
        if(!carritoActualizado){
            return res.status(404).json({error: 'Carrito no encontrado'});
        }
        res.json(carritoActualizado);
    }catch(error){
        res.status(400).json({error: 'Error al actualizar carrito'});
    }
};

exports.deleteCarrito = async(req,res) =>{
    try{
        const carritoEliminado = await Cart.findByIdAndDelete(req.params.id);
        if(!carritoEliminado){
            return res.status(404).json({error: 'Carrito no encontrado'});
        }
        res.json(carritoEliminado);
    }catch(error){
        res.status(500).json({error: 'Error en el servidor'});
    }
};
