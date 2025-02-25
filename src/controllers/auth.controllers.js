import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import{TOKEN_SECRET} from '../config.js';
import {createAccessToken} from '../libs/jwt.js';
import User from '../models/users.model.js';

export const register = async (req,res) => {
    //interaccion server-cliente
    try{
        const {username,email,password} = req.body;
        const userFound = await User.findOne({email});
        
        if(userFound)
            return res.status(400).json({
                message:['The email is already in use'],
            });
        const salt = await bcrypt.genSalt();
        const passwordHash = await
        bcrypt.hash(password,salt);

        const newUser = new User({
            //nuevo objeto para o de la tabla bd
            username,
            email,
            password: passwordHash,
        });

        const userSaved = await newUser.save();

        const token = await createAccessToken({
            id:userSaved._id
        });

        res.cookie('token',token);
        res.json({
            //responde con un mensaje
            id:userSaved._id,
            username: userSaved.username,//
            email:userSaved.email,//
        });
    }catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
};

export const login = async(req,res) => {
    try{
        const{email,password} = req.body;
        const userFound = await User.findOne({email});

        if(!userFound)
            return res.status(400).json({
                message:['The email does not exist'],
            });

        const isMatch = await bcrypt.compare(password,userFound.password);

        if(!isMatch){
            return res.status(400).json({
                message:['The password is incorrect'],
            });
        }

        const token = await createAccessToken({
            id:userFound._id
        });
        res.cookie('token',token);

        res.json({
            id:userFound._id,
            username:userFound.username,
            email: userFound.email,
        });
    }catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
};

export const verifyToken = async(req,res) => {
    try{
        const {token} = req.cookies;
        if(!token) return res.send(false);

        jwt.verify(token,TOKEN_SECRET,async(error,user) => {
            if(error) return res.sendStatus(401);

            const userFound = await User.findById(user.id);
            if(!userFound) return res.sendStatus(401);


            return res.json({
                id:userFound._id,
                username:userFound.username,
                email:userFound.email,
            });
        });
    }catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
};

export const logout = async (_req,res) => {
    res.clearCookie('token');
    return res.send('logout succesfull');
};