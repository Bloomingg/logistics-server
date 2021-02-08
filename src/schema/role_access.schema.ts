import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const RoleAccessSchema = new mongoose.Schema({
  access_id: { type: Array, required: true },
  role_id: { type: Schema.Types.ObjectId, required: true }
});
