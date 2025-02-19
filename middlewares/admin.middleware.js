// import { logger } from "../utils/logger";


// export const admin = (req, res, next) => {
//     if (!req.user || !req.user.isAdmin) {
//         const errorMessage = 'Access denied. Admins only.';
//     logger.error(errorMessage);
//         return res.status(403).json({ message: errorMessage });
//     }
//     next();
// };
