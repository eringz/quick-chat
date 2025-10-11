import { sendWelcomeEmail } from '../emails/emailHandlers.js';
import { generateToken } from '../lib/utils.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { ENV } from '../lib/env.js';

// Sign-up endpoint
export const signup = async (req, res) => {   
    const { firstName, lastName, email, password }  = req.body;
     
    try
    {
        /**
         * Validation first for the following:
         * firstName, lastName, email, password should not be empty.
         * firstName, lastName should be minimum of 2 characters 
         * Email should be in correct email format (e.g ron@gmail.com)
         * Password should have at least 8 characters or more.At lease one Capitalize letter, small letter, 
            * digit, and special string (e.g !@#) 
         */
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({message: 'All fields are required'});
        }

        if (firstName.length < 2) {
            res.status(400).json({message: 'First Name must be at least 2 characters'});
        }

        if (lastName.length < 2) {
            return res.status(400).json({message: 'Last name must be at least 2 characters.'});
        }

        // email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({message: 'Invalid Email!'});
        }

        // password
        if (password.length < 8) {
            return res.status(400).json({message: 'Password must be at least 8 characters.'});
        }

        //to be continued for password validation 

        // Finding User by Email
        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({message: 'Email address alreay exists!'});
            
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        if (newUser) {

            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });

            // Send a welcome email to user
            try {
                await sendWelcomeEmail(savedUser.email, savedUser.firstName, ENV.CLIENT_URL )
            } catch (error) {
                console.error('Failed to send welcome email:', error);
            }

        } else {
            res.status(400).json({message: 'Invalid User data'})
        }
    }
    catch (error)
    {
        console.error(`Sign up Controller Error: ${error}`);
        res.status(400).json({ success: false, message: error.message});       
    }
}


export const login = async (req, res) =>
{
    const { email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: 'Invalid Credentials'});
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({message: 'Invalid Credentials'});

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profilePic: user.profilePic
        });

    } catch (error) {   
        console.error('Error in login controller: ', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

export const logout = async (_, res) =>
{
    res.cookie('jwt', '', {maxAge: 0});
    res.status(200).json({message: 'Log out successfuly'})
}