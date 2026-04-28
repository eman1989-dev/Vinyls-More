import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function generarToken(usuario) {
    return jwt.sign({id: usuario._id, email: usuario.email}, process.env.JWT_SECRET, {expiresIn: '1h'});
}

export function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({message: 'Token no proporcionado'});

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({message: 'Token no proporcionado'});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuarioId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({message: 'Token no válido'});
    }
}
