import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
    try{
        await mongoose.connect(mongoURI, {tls:true});
        console.log("Conectado a la base de datos exitosamente");
    }catch(err){
        console.error("Error de conexion en la base de datos: ", err.message);
        process.exit(1);
    }
};

export default connectDB;