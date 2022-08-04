import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default async function userTokenValidation(req, res, next) {
    try {
        const { authorization } = req.headers;
        const token = authorization?.replace("Bearer ", "");

        if(!token) return res.sendStatus(401);
        
        jwt.verify(token, process.env.SECRET, (e, decoded) => {
            if(e) return res.status(401).send(e);
            
            res.locals.userId = decoded.id;
            next();
        });
    } catch(e) {
        res.status(500).send(e); 
    }
}