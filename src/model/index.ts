import mongoose from 'mongoose';

import { mongoPath } from '../config/base';

import UserSchema from './user';

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

// eslint-disable-next-line import/prefer-default-export
export { Users };
