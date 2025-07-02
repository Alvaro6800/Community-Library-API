import "dotenv/config";
import  jwt  from "jsonwebtoken";
import userService from "../service/userServices.js"

export function authMiddleware(req, res, next){
    const headerToken = req.headers.authorization;

    if(!headerToken)
        return res.status(401).json({message: "The token was not informed!"});

    const partsToken = headerToken.split(" ");

    if(partsToken.length !== 2)
        return res.status(401).json({message: "Invalid token!"});

    const [schema, token] = partsToken;

    if(!/^Bearer$/i.test(schema))
        return res.status(401).json({message: "Invalid token!"});

    jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
        if(err)
            return res.status(401).json({message: "Invalid token!", error: err.message});

        const user = await userService.findUsersByIdService(decoded.id);

        if(!user || !user.id)
            return res.status(401).send({message: "Invalid token!"})   

        req.userId = user.id

        return next();
    })
}
