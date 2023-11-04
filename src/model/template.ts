import { Schema } from 'mongoose';

import baseModel from './base';

const projectTemplateSchema = new Schema({
  packageName: {
    type: String,
    required: true
  },
  ...baseModel
});

export default projectTemplateSchema;
