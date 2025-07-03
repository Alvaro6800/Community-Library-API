import { Router } from 'express'
import userController from '../controller/userControllers.js';
import { validate, validateUserId } from '../middlewares/validationMiddlewares.js';
import { userSchema } from '../schema/userSchema.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', validate(userSchema),  userController.createUserController);
router.post('/login',  userController.loginUserController);

router.use(authMiddleware)

router.get('/', userController.findAllUserController);
router.get('/:id', validateUserId, userController.findUserByIdController);
router.patch('/:id', validateUserId, userController.updateUserController);
router.delete('/:id', validateUserId, userController.deleteUserController);

export default router