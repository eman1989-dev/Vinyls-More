import Review from "../models/review.js";
import dotenv from "dotenv";

dotenv.config();

exports.getReview = async (req, res) => {
    try{
        const review = await Review.findById(req.params.id);
        if(!review) return res.status(404).json({error: 'Review no encontrado'});
        res.json(review);
    }catch(error){
        res.status(500).json({error: 'Error en el servidor'});
    }
};

exports.getReviewId = async (req, res) => {
    try{
        const review = await Review.findById(req.params.id);
        if(!review) return res.status(404).json({error: 'Review no encontrado'});
        res.json(review);
    }catch(error){
        res.status(500).json({error: 'Error en el servidor'});
    }
};

exports.createReview = async (req, res) => {
    try{
        const {userId, productId, rating, comment} = req.body;
        const nuevaReview = new Review({userId, productId, rating, comment});
        await nuevaReview.save();
        res.status(201).json(nuevaReview);
    }catch(err){
        console.error(err);
        res.status(400).json({message: "Error al crear la review"});
    }
};

exports.updateReview = async(req,res) => {
    try{
        const reviewActualizada = await Review.findByIdAndUpdate(req.params.id,req.body,{new: true});
        if(!reviewActualizada){
            return res.status(404).json({error: 'Review no encontrada'});
        }
        res.json(reviewActualizada);
    }catch(error){
        res.status(400).json({error: 'Error al actualizar review'});
    }
};

exports.deleteReview = async(req,res) =>{
    try{
        const reviewEliminada = await Review.findByIdAndDelete(req.params.id);
        if(!reviewEliminada){
            return res.status(404).json({error: 'Review no encontrada'});
        }
        res.json(reviewEliminada);
    }catch(error){
        res.status(500).json({error: 'Error en el servidor'});
    }
};


