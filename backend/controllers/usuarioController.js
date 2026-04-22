import User from "../models/usuario";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

exports.login = async (req, res) => {
    try{
        const {email, password } = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "Usuario no encontrado"});
        }

        const passwordOk = await bcrypt.compare(password, user.password);
        if(!passwordOk){
            return res.status(401).json({message: "Contraseña incorrecta"});
        }

        const datosToken = {id: user._id};
        const secret = process.env.JWT_SECRET;
        const opciones = {expiresIn: "1h"};
        const token = jwt.sign(datosToken, secret, opciones);

        res.json({token});

    }catch(err){
        res.status(500).json({message: "Error en el servidor"});
    }
};

exports.getUsuarios = async (req, res) => {
    try{
        const usuarios = await User.find();
        res.json(usuarios);
    }catch(err){
        res.status(500).json({message: "Error en el servidor"});
    }
};

exports.getUsuarioId = async (req, res) => {
    try{
        const usuario = await User.findById(req.params.id);
        if(!usuario) return res.status(404).json({error: 'Usuario no encontrado'});
        res.json(usuario);
    }catch(error){
        res.status(500).json({error: 'Error en el servidor'});
    }
};

exports.createUsuario = async (req, res) => {
    try{
        const {name,email,password,role,address,phone} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const nuevoUsuario = new User({name,email,password: hash,role,address,phone});
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    }catch(err){
        console.error(err);
        res.status(400).json({message: "Error al crear el usuario"});
    }
};

exports.updateUsuario = async(req,res) => {
    try{
        const usuarioActualizado = await User.findByIdAndUpdate(req.params.id,req.body,{new: true});
        if(!usuarioActualizado){
            return res.status(404).json({error: 'Usuario no encontrado'});
        }
        res.json(usuarioActualizado);
    }catch(error){
        res.status(400).json({error: 'Error al actualizar usuario'});
    }
};

exports.deleteUsuario = async(req,res) =>{
    try{
        const usuarioEliminado = await User.findByIdAndDelete(req.params.id);
        if(!usuarioEliminado){
            return res.status(404).json({error: 'Usuario no encontrado'});
        }
        res.json(usuarioEliminado);
    }catch(error){
        res.status(500).json({error: 'Error en el servidor'});
    }
};


