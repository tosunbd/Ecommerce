const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const { accessToken } = req.cookies;
    
    if (!accessToken)
    {
        console.log('Access Denied: No token provided');  // Log when access is denied
        return res.status(401).json({ message: 'Access Denied' });
    }
    
    try
    {
        const decodedToken = jwt.verify(accessToken, process.env.SECRET);
        req.role = decodedToken.role;
        req.id = decodedToken.id;

        console.log(`Token verified: User ID - ${req.id}, Role - ${req.role}`);  // Log verified user ID and role
        
        next();
    }
    catch (error)
    {
        console.log('Invalid Token:', error.message);  // Log error message if token is invalid
        res.status(400).json({ message: 'Invalid Token' });
    }
};
