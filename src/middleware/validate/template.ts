import Joi from 'joi';
import Koa from 'koa';

import { Templates } from '../../model';

const add = async (ctx: Koa.Context, next: Koa.Next) => {
  const params = ctx.request.body;
  const schema = Joi.object({
    packageName: Joi.string().required()
  }).validate(params);
  if (schema.error) {
    console.error(schema);
    ctx.throw(400, schema.error);
  }
  const nameValidate = await Templates.findOne({ packageName: params.packageName });
  if (nameValidate) {
    ctx.throw(400, `npm package '${params.packageName}' already exist.`);
  }
  await next();
};

const deleteOne = async (ctx: Koa.Context, next: Koa.Next) => {
  const params = ctx.request.body;
  const schema = Joi.object({
    packageName: Joi.string().required()
  }).validate(params);
  if (schema.error) {
    console.error(schema);
    ctx.throw(400, schema.error);
  }
  const nameValidate = await Templates.findOne({ packageName: params.packageName });
  if (!nameValidate) {
    ctx.throw(400, `The npm package '${params.packageName}' need to be delete is not exist.`);
  }
  await next();
};

const update = async (ctx: Koa.Context, next: Koa.Next) => {
  const params = ctx.request.body;
  const schema = Joi.object({
    packageName: Joi.string().required(),
    newPackageName: Joi.string().required()
  }).validate(params);
  if (schema.error) {
    console.error(schema);
    ctx.throw(400, schema.error);
  }

  const nameValidate = await Templates.findOne({ packageName: params.packageName });
  if (!nameValidate) {
    ctx.throw(400, `The npm package '${params.packageName}' need to be update is not exist.`);
  }
  await next();
};

export default {
  add,
  deleteOne,
  update
};
