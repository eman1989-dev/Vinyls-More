import Order from "../models/orden.js";
import dotenv from "dotenv";

dotenv.config();

exports.getOrden = async (req, res) => {
    try{
        const orden = await Order.findById(req.params.id);
        if(!orden) return res.status(404).json({error: 'Orden no encontrada'});
        res.json(orden);
    }catch(error){
        res.status(500).json({error: 'Error en el servidor'});
    }
};

exports.getOrdenId = async (req, res) => {
    try{
        const orden = await Order.findById(req.params.id);
        if(!orden) return res.status(404).json({error: 'Orden no encontrada'});
        res.json(orden);
    }catch(error){
        res.status(500).json({error: 'Error en el servidor'});
    }
};

exports.createOrden = async (req, res) => {
    try{
        const {userId, items, totalAmount, status, shippingAddress} = req.body;
        const nuevaOrden = new Order({userId, items, totalAmount, status, shippingAddress});
        await nuevaOrden.save();
        res.status(201).json(nuevaOrden);
    }catch(err){
        console.error(err);
        res.status(400).json({message: "Error al crear el producto"});
    }
};

exports.updateOrden = async(req,res) => {
    try{
        const ordenActualizada = await Order.findByIdAndUpdate(req.params.id,req.body,{new: true});
        if(!ordenActualizada){
            return res.status(404).json({error: 'Orden no encontrada'});
        }
        res.json(ordenActualizada);
    }catch(error){
        res.status(400).json({error: 'Error al actualizar orden'});
    }
};

exports.deleteOrden = async(req,res) =>{
    try{
        const ordenEliminada = await Order.findByIdAndDelete(req.params.id);
        if(!ordenEliminada){
            return res.status(404).json({error: 'Orden no encontrada'});
        }
        res.json(ordenEliminada);
    }catch(error){
        res.status(500).json({error: 'Error en el servidor'});
    }
};
