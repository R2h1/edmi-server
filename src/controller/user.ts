import { Context } from 'koa';
import Model from '../model';

const { User } = Model;

const userInfo = async (ctx: Context) => {
  const user = await User.findById(ctx.params.userId);
  ctx.body = user;
};

export default {
  userInfo
};
