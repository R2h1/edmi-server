import Router from '@koa/router';
import { userController } from '../controller';

const router = new Router({
  prefix: '/api/v1'
});

router.get('/users/:userId', userController.userInfo);

export default router;
