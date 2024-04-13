import mongoose from 'mongoose';
import { MONGOLINK } from './config.js'
const conexion = async () => {
    try{
        await mongoose.connect(MONGOLINK);
        console.log('Conexion Establecida en este caso nenis');
    } catch (error) {
        console.error('No conexion');
    } 

};
export default conexion;