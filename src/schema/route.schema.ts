import * as mongoose from 'mongoose';

export const routeSchema = new mongoose.Schema({
  startCity: {
    type: String,
    required: true
  },
  endCity: {
    type: String,
    required: true
  },
  passCity: {
    type: Array
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

