import * as mongoose from 'mongoose';
const d = new Date();
export const RoleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: Number, default: 1 },
  add_time: {
    type: Number,
    default: d.getTime()
  }
});
