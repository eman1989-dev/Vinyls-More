import SecondHand from "../models/segunda.js";
import dotenv from "dotenv";

dotenv.config();

exports.getSecondHand = async (req, res) => {
    try{
        const segunda = await SecondHand.findById(req.params.id);
        if(!segunda) return res.status(404).json({error: 'Segunda no encontrada'});
        res.json(segunda);
    }catch(error){
        res.status(500).json({error: 'Error en el servidor'});
    }
};

exports.getSecondHandId = async (req, res) => {
    try{
        const segunda = await SecondHand.findById(req.params.id);
        if(!segunda) return res.status(404).json({error: 'Segunda no encontrada'});
        res.json(segunda);
    }catch(error){
        res.status(500).json({error: 'Error en el servidor'});
    }
};

exports.createSecondHand = async (req, res) => {
    try{
        const {productId, sellerId, conditionDetails} = req.body;
        const nuevaSegunda = new SecondHand({productId, sellerId, conditionDetails});
        await nuevaSegunda.save();
        res.status(201).json(nuevaSegunda);
    }catch(err){
        console.error(err);
        res.status(400).json({message: "Error al crear el producto"});
    }
};

exports.updateSecondHand = async(req,res) => {
    try{
        const segundaActualizada = await SecondHand.findByIdAndUpdate(req.params.id,req.body,{new: true});
        if(!segundaActualizada){
            return res.status(404).json({error: 'Segunda no encontrada'});
        }
        res.json(segundaActualizada);
    }catch(error){
        res.status(400).json({error: 'Error al actualizar segunda'});
    }
};

exports.deleteSecondHand = async(req,res) =>{
    try{
        const segundaEliminada = await SecondHand.findByIdAndDelete(req.params.id);
        if(!segundaEliminada){
            return res.status(404).json({error: 'Segunda no encontrada'});
        }
        res.json(segundaEliminada);
    }catch(error){
        res.status(500).json({error: 'Error en el servidor'});
    }
};
