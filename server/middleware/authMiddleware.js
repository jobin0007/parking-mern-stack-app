const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: "Authentication failed: No token provided" });
    }

    try {
        // Verify the JWT token and decode it
        const decoded = jwt.decode(token);
        //   console.log("deco",decoded.userId)
        // Assign the user data to the request object
        if (decoded.role == 'user') {
            req.user = decoded.userId;
           
        } else if (decoded.role == 'admin') {
            req.admin = decoded.adminId;
        } else {
            return res.status(403).json({ message: "Authentication failed: Invalid role" });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: "Authentication failed: Invalid token" });
    }
};

module.exports = protect;
