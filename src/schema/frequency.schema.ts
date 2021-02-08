import * as mongoose from 'mongoose';

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
    required: true
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

