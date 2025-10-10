import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '7d'});

    res.cookie('jwt', token, {
        maxAge: 7*24*60*60*1000, // computation for 7 days
        httpOnly: true, // this is to prevent XSS attacks
        sameSite: 'strict', // this is to prevent CSRF attacks
        secure: process.env.NODE_ENV === 'development' ? false : true
    });

    return token;
}