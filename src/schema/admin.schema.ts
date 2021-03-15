import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

// 账号信息schema
export const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    unique:true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  status: {
    type: Number,
    default: 1
  },
  role_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  add_time: {
    type: Number,
    default: new Date().getTime()
  },
  last_time: {
    type: Number,
    default: new Date().getTime()
  },
  is_Supper: {
    type: Number,
    default: 0
  }
})

