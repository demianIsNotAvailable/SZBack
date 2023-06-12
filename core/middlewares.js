import {Request, Response, NextFunction} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import {MongoServerError} from 'mongodb';
import config from './config.js'


const roleChecker = (requiredRole) => {
    const roles = [GUEST, USER, MOD, ADMIN, SUPERADMIN]
    const roleIndex = roles.indexOf(requiredRole)
    const allowedRoles = roles.slice(roleIndex)

    return (req, res, next) => {
        if (allowedRoles.includes(req.headers.token.role)) {
            next()
        } else next(`FORBIDDEN`)
    }

}