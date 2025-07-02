import bookControllers from "../controller/bookControllers.js";
import { Router } from "express";
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware)

router.post("/books", bookControllers.createBookController);
router.get("/books", bookControllers.findAllBooksController);

export default router