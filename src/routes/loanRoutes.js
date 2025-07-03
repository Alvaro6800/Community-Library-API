import loanControllers from "../controller/loanControllers.js";
import { Router } from "express";
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validate, validateLoanId } from '../middlewares/validationMiddlewares.js';
import { loanSchema } from '../schema/loanSchema.js';

const router = Router();

router.post("/", validate(loanSchema), loanControllers.createLoanController);
router.get("/", loanControllers.findAllLoansController);
router.get("/:id", validateLoanId, loanControllers.findLoanByIdController);
router.delete("/:id", validateLoanId, loanControllers.deleteLoanController);

router.use(authMiddleware);


export default router