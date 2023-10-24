import Koa from 'koa';
import jwt from 'jsonwebtoken';
import { secretKey } from '../config/base';

export const createToken = (userInfo: any) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      userInfo,
      secretKey,
      {
        expiresIn: 60 * 60 * 24
      },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

export const verifyToken = (required = true) => {
  return async (ctx: Koa.Context, next: Koa.Next) => {
    const token = ctx.headers.authorization?.replace(/Bearer\s/, '');
    if (token) {
      try {
        ctx.userInfo = jwt.verify(token, secretKey);
      } catch {
        ctx.throw(401, 'token 验证失败');
      }
    } else if (required) {
      ctx.throw(401, 'authorization 缺少 token');
    }
    await next();
  };
};
