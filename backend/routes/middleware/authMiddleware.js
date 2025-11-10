import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import cors from "cors";

// This function can be imported and applied in server.js
export const corsMiddleware = cors({
    origin: '*', // Allow all origins for local development
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
});
export const protect = async (req, res, next) => {
    let token;
    
    // Check if token exists in the header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            //console.log("1. Token received:", token ? 'Yes' : 'No'); // Log if token is present

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //console.log("2. Decoded User ID:", decoded.id); // Check the ID from the token

            // Attach user data to the request
            req.user = await User.findById(decoded.id).select('-password'); 

            if (!req.user) {
                //console.error("3. User NOT FOUND in DB for ID:", decoded.id); // FAILURE POINT
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }
            
            //console.log("3. User found:", req.user.username); // SUCCESS POINT
            next();
        } catch (error) {
            // This catches expired token, invalid secret, or Mongoose error
            //console.error('4. Token verification or Database Error:', error.message); 
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        //console.error('5. No token provided.');
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export default protect;