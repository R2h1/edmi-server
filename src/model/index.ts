import mongoose from 'mongoose';

import { mongoPath } from '../config/base';

import UserSchema from './user';
import TemplateScheme from './template';

async function main() {
  try {
    await mongoose.connect(mongoPath);
    console.log('mongodb 连接成功');
  } catch (err) {
    console.error(`mongodb 连接失败：${err}`);
  }
}

main();

const Users = mongoose.model('Users', UserSchema);
const Templates = mongoose.model('Templates', TemplateScheme);

// eslint-disable-next-line import/prefer-default-export
export { Users, Templates };
