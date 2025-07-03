import bookControllers from "../controller/bookControllers.js";
import { Router } from "express";
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validate, validateBookId } from '../middlewares/validationMiddlewares.js';
import { bookSchema } from '../schema/bookSchema.js';

const router = Router();

router.get("/", bookControllers.findAllBooksController);

router.use(authMiddleware);

router.get("/search", bookControllers.searchBooksController);
router.post("/", validate(bookSchema), bookControllers.createBookController);
router.get("/:id", validateBookId, bookControllers.findBookByIdController);
router.patch("/:id", validateBookId, bookControllers.updateUserController);
router.delete("/:id", validateBookId, bookControllers.deleteBookController);


export default router