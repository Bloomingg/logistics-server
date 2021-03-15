import * as mongoose from 'mongoose';

// 班次信息
export const frequencySchema = new mongoose.Schema({
  startCity: {
    type: String,
    required: true
  },
  endCity: {
    type: String,
    required: true
  },
  transNo: {
    type: String,
    required: true,
    unique:true
  },
  treTime: {
    type: Number,
    required: true
  },
  routeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  add_time: {
    type: Number,
    default: new Date().getTime()
  },
  last_time: {
    type: Number,
    default: new Date().getTime()
  }
})

