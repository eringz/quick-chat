import User from '../models/User.js';
import cloudinary from "../lib/cloudinary.js";
import Message from '../models/Message.js';

export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: { $ne: loggedInUserId }}).select('-password');

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error('Error in getAllContacts:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params;

        // Find and store message between sender and receiver vice-versa
        const message = await Message.find({
            $or: [
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId},
            ]
        });

        res.status(200).json(message);
    } catch (error) {
        console.error('Error in getMessagesByUserId', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const {id: receiverId } = req.params;
        const senderId = req.user._id;

        if (!text && !image) return res.status(400).json({message: 'Text or Image is required'});
        if (senderId.equals(receiverId)) return res.status(400).json({message: 'Cannot send message to yourself'});
        
        const receiverExists = await User.exists({_id: receiverId});
        if (!receiverExists) return res.status(400).json({message: 'Receiver not found'});

        let imageUrl = "";
        if (image) {
            const base64Data = image.replace(/^data:image\/\w+;base64,/, "");


            if (!/^data:image\/[a-z]+;base64,/.test(image)) {
                return res.status(400).json({ message: "Invalid image format" });
            }

            // upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(`data:image/png;base64,${base64Data}`);
            
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        // todo: send message in realtime if user is online using socket.io


        res.status(201).json(newMessage);

    } catch (error) {
        console.error('Error in sendMessage:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

// 
export const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        // Find all the messages where the log-in user is either sender or receiver
        const messages = await Message.find({
            $or: [{senderId: loggedInUserId}, {receiverId: loggedInUserId}],
        });

        const chatPartnersIds = [
            ...new Set(
                messages.map(message => 
                    message.senderId.toString() === loggedInUserId.toString()
                    ? message.receiverId.toString()
                    : message.senderId.toString()
                )
            ),
        ];

        const chatPartners = await User.find({_id: {$in: chatPartnersIds}}).select('-password');
        res.status(200).json(chatPartners);

    } catch (error) {
        console.error('Error in getAllPartners:', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}