import aj from '../lib/arcjet.js';
import { isSpoofedBot } from '@arcjet/inspect';

export const arcjetProtection = async (req, res, next) => {
    try {
        const decision = await aj.protect(req);

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({message: 'Rate limit exeeded. Please try again later.'})
            } else if (decision.reason.isBot()) {
                return res.status(403).json({message: 'Bot access denied.'});
            } else {
                return res.status(403).json({message: 'Access denied by security'});
            }
        }    

        // Check for bots that acts like human by isSpoofedBot
        if (decision.results.some(isSpoofedBot)) {
            return res.status(403).json({
                error: 'Spoofed bot detected',
                message: 'Malicious bot activity '
            });
        }
        
        next();
    } catch (error) {
        console.error('Arcjet Protection Error:', error);
        next();
    }
}


