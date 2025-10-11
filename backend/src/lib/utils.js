import jwt from 'jsonwebtoken';
import { ENV } from '../lib/env.js'

export const generateToken = (userId, res) => {
    const { JWT_SECRET, NODE_ENV } = ENV;
    if (!JWT_SECRET) throw new Error('JWT_SECRET is not configured');

    const token = jwt.sign({userId}, JWT_SECRET, {expiresIn: '7d'});

    res.cookie('jwt', token, {
        maxAge: 1000*60*60*24*7, // Calculating ms in 7days
        httpOnly: true, // Preventing XSS 
        sameSite: 'strict', // Preventing CSRF attacks
        secure: NODE_ENV === 'development' ? false : true,
    });

    return token;
}