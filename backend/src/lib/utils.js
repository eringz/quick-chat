import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    const { JWT_SECRET, NODE_ENV } = process.env;
    if (!JWT_SECRET) throw new Error('JWT_SECRET is not configured');

    const token = jwt.sign({userId}, JWT_SECRET, {expiresIn: '7d'});

    res.cookies('jwt', token, {
        maxAge: 1000*60*60*24*7, // Calculating ms in 7days
        httpOnly: true, // Preventing XSS 
        sameSite: 'strict', // Preventing CSRF attacks
        secure: NODE_ENV === 'development' ? false : true,
    });

    return token;
}