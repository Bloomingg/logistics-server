import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

// 跟踪信息
export const logisticsTrackSchema = new mongoose.Schema({
  frequencyId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  curPost: {
    type: String,
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

