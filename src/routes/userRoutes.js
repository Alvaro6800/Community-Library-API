import { Router } from 'express'
import userController from '../controller/userControllers.js';
import { validate, validateUserId } from '../middlewares/validationMiddlewares.js';
import { userSchema } from '../schema/userSchema.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/users', validate(userSchema),  userController.createUserController);
router.post('/users/login',  userController.loginUserController);

router.use(authMiddleware)

router.get('/users', userController.findAllUserController);
router.get('/users/:id', validateUserId, userController.findUserByIdController);
router.patch('/users/:id', validateUserId, userController.updateUserController);
router.delete('/users/:id', validateUserId, userController.deleteUserController);

export default router