const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {

    //Get token from header
    const token = req.header('x-auth-token');

    //check if no token
    if (!token)
        return res.send(401).json({ msg: 'No token, Auth Denied' });

    //verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    }
    catch (err) {
        res.send(401).json({ msg: 'Token Invalid' });
    }

}