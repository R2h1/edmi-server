import Router from '@koa/router';
import { userController, templateController } from '../controller';
import { templateValidate, userValidate } from '../middleware';
import { verifyToken } from '../utils/jwt';

const router = new Router({
  prefix: '/api/v1'
});

// 用户管理
router
  .get('/users', verifyToken(false), userController.getUsers)
  .post('/users/register', userValidate.register, userController.register)
  .get('/users/:userId', verifyToken(false), userController.getUserById)
  .post('/users/login', verifyToken(false), userValidate.login, userController.login);

// 模板管理
router
  .get('/templates', templateController.getTemplates)
  .post('/templates/add', templateValidate.add, templateController.addTemplate)
  .post('/templates/delete', templateValidate.deleteOne, templateController.deleteTemplate)
  .post('/templates/update', templateValidate.update, templateController.updateTemplate);

export default router;
