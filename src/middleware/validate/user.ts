import Joi from 'joi';
import Koa from 'koa';

import { Users } from '../../model';

const register = async (ctx: Koa.Context, next: Koa.Next) => {
  const params = ctx.request.body;
  const schema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    phone: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(6).max(20).required()
  }).validate(params);
  if (schema.error) {
    console.error(schema);
    ctx.throw(400, schema.error);
  }

  const emailValidate = await Users.findOne({ email: params.email });
  if (emailValidate) {
    ctx.throw(400, '邮箱已经被注册');
  }

  const phoneValidate = await Users.findOne({ phone: params.phone });
  if (phoneValidate) {
    ctx.throw(400, '手机号已经被注册');
  }
  const usernameValidate = await Users.findOne({ username: params.username });
  if (usernameValidate) {
    ctx.throw(400, '账号已经被注册');
  }
  await next();
};

const login = async (ctx: Koa.Context, next: Koa.Next) => {
  const params = ctx.request.body;
  const schema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(6).max(20).required()
  }).validate(params);
  if (schema.error) {
    console.error(schema);
    ctx.throw(400, schema.error);
  }
  const usernameValidate = await Users.findOne({ username: params.username });
  if (!usernameValidate) {
    ctx.throw(400, '账号未注册');
  }
  await next();
};

export default {
  register,
  login
};
