import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET;


const verifyToken = (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return null;
    }
  };

  export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ error: 'Access Denied. No Token Provided.' });
    }
  
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid Token' });
    }
  
    req.user = decoded; 
    next();
  };