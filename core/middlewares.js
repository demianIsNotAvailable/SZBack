import jwt from 'jsonwebtoken';
import {MongoServerError} from 'mongodb';
import config from './config.js'


export const auth = (req, res, next)=>{
    if(!req.headers.authorization) return next(new Error('AUTHENTICATION_REQUIRED'));
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return next(new Error('AUTHENTICATION_REQUIRED'));
    try {
        req.token = jwt.verify(token, config.JWT_SECRET)
    } catch(e){
        return next(new Error('INVALID_TOKEN'));
    }
    next();
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