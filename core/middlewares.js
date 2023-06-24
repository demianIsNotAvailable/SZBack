import express from "express"
import jwt from 'jsonwebtoken';
import {MongoServerError} from 'mongodb';
import config from './config.js'



// auth extendido, recibe como argumento opcional un rol en cuyo caso funciona además como un rolecheck
export const auth = (roleRequired = "GUEST") => {
    return (req, res, next) => {        

        if(!req.headers.authorization) return res.status(418).send()
        const token = req.headers.authorization.split(' ')[1];
        
        if(!token) return next(new Error('AUTHENTICATION_REQUIRED'));
        
        try {
            req.token = jwt.verify(token, config.SECRET)
        } catch(e){        
            return next(new Error('INVALID_TOKEN'));
        }

        // si recibe un rol, entra al condicional, filtra los roles que tienen permisos iguales o superiors a los requeridos, 
        // y comprueba si el del usuario está entre ellos
        if (roleRequired !== "GUEST") {
            const roles = ["USER", "VIP", "MOD", "ADMIN", "SUPERADMIN"]
            const roleIndex = roles.indexOf(roleRequired)
            const allowedRoles = roles.slice(roleIndex)           
            if (!allowedRoles.includes(req.token.role)) return next(new Error("FORBIDDEN"))
            
            return next()             
        }
        next();
    }
}



export const errorHandler = (err, req, res, next) =>{
    if(err.message === 'AUTHENTICATION_REQUIRED') return res.status(403).json({error: 'AUTHENTICATION_REQUIRED'})
    if(err.message === 'TOKEN_INVALID') return res.status(403).json({error: 'AUTHENTICATION_REQUIRED'})
    if(err.message === 'NOT_FOUND') return res.status(404).json({error: 'NOT_FOUND'})
    if(err.message === 'MISSING_DATA') return res.status(422).json({error: 'MISSING_DATA'})
    if(err.message === 'INVALID_PASSWORD') return res.status(422).json({error: 'MISSING_DATA'})
    if(err instanceof MongoServerError && err.code === 11000) return res.status(422).json({error: 'DUPLICATE_ENTITY', entities: Object.keys(err.keyPattern)})
    return res.status(500).json({error: 'SERVER_ERROR', err})
}