import express from 'express';
import { getAllContacts, getChatPartners, getMessagesByUserId, sendMessage } from '../controllers/message.controller.js';
import { arcjetProtection } from '../middleware/arcjet.middleware.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * Applying middlewares in order before routing method.
 * First get rate limited first, then it will be authenticated for authentication efficiency.
 */
router.use(arcjetProtection, protectRoute);

// Get all the contacts
router.get('/contacts', getAllContacts);
router.get('/chats', getChatPartners);
router.get('/:id', getMessagesByUserId);
router.post('/send/:id', sendMessage );


export default router; 