import mongoose from 'mongoose';
import { ENV } from '../lib/env.js';

export const connectDB = async () => 
{
    try
    {
        const { MONGO_URI } = ENV;
        if (!MONGO_URI) throw new Error('MONGO_URI is not set');
        
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB host Connected: ${conn.connection.host}`);
    }
    catch (error)
    {
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
}