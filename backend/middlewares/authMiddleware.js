const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const { accessToken } = req.cookies;
    const token = accessToken;
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }
    try
    {
        const decodeToken = jwt.verify(token, process.env.SECRET);
        req.role = decodeToken.role;
        req.id = decodeToken.id;
        next();
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
}