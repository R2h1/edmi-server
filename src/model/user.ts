import { Schema } from 'mongoose';

import baseModel from './base';
import md5 from '../utils/md5';

const userSchema = new Schema({
  username: {
    type: String,
    require: false
  },
  phone: {
    type: String,
    require: false
  },
  email: {
    type: String,
    require: false
  },
  password: {
    type: String,
    required: true,
    set: (value: string) => md5(value),
    select: false
  },
  ...baseModel
});

export default userSchema;
