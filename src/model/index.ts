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

export default {
  User: mongoose.model('User', UserSchema)
};
