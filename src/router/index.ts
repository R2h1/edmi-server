import Router from '@koa/router';
import { userController } from '../controller';
import { userValidate } from '../middleware';
import { verifyToken } from '../utils/jwt';

const router = new Router({
  prefix: '/api/v1'
});

router
  .get('/users', verifyToken(false), userController.getUsers)
  .post('/users/register', userValidate.register, userController.register)
  .get('/users/:userId', verifyToken(false), userController.getUserById)
  .post('/users/login', verifyToken(false), userValidate.login, userController.login);

export default router;
