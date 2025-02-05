import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  const jwt_secret = process.env.JWT_SECRET;

  jwt.verify(token, jwt_secret, function (err, decoded) {
    if (err) {
      return res.status(400).json({ error: err });git 
    }

    req.user = decoded.user_id;

    return next();
  });
};
