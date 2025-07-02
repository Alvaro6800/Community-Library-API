import bookControllers from "../controller/bookControllers.js";
import { Router } from "express";
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validate, validateBookId } from '../middlewares/validationMiddlewares.js';
import { bookSchema } from '../schema/bookSchema.js';

const router = Router();

router.get("/books", bookControllers.findAllBooksController);

router.use(authMiddleware);

router.get("/books/search", bookControllers.searchBooksController);
router.post("/books", validate(bookSchema), bookControllers.createBookController);
router.get("/books/:id", validateBookId, bookControllers.findBookByIdController);
router.patch("/books/:id", validateBookId, bookControllers.updateUserController);
router.delete("/books/:id", validateBookId, bookControllers.deleteBookController);


export default router