import { Router } from "express";
import userRouters from './userRoutes.js'
import bookRouters from './bookRoutes.js'
import loanRouters from './loanRoutes.js'

const routers = Router();

routers.use("/users", userRouters);
routers.use("/books", bookRouters);
routers.use("/loans", loanRouters);

export {routers}