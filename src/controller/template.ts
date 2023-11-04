import { Context } from 'koa';
import { Templates } from '../model';

const getTemplates = async (ctx: Context) => {
  const templates = await Templates.find({}, ['packageName']);
  ctx.body = templates;
};

const addTemplate = async (ctx: Context) => {
  const templateModel = new Templates(ctx.request.body);
  const rsp = await templateModel.save();
  ctx.body = rsp;
};

const deleteTemplate = async (ctx: Context) => {
  const params = ctx.request.body;
  const deleteRes = await Templates.deleteOne({ packageName: params.packageName });
  if (!deleteRes) {
    ctx.throw(500, `npm package '${params.packageName}' delete fail.`);
  }
  ctx.body = `npm package '${params.packageName}' delete successful.`;
};

const updateTemplate = async (ctx: Context) => {
  const params = ctx.request.body;
  const updateRes = await Templates.updateOne(
    { packageName: params.packageName },
    { packageName: params.newPackageName }
  );
  if (!updateRes) {
    ctx.throw(500, `npm package '${params.packageName}' update fail.`);
  }
  ctx.body = `npm package '${params.packageName}' update successful.`;
};

export default {
  getTemplates,
  addTemplate,
  deleteTemplate,
  updateTemplate
};
