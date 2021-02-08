import { Schema } from "mongoose";

export interface newUser {
  username: String,
  password: String;
  status?: Number;
  role_id: Schema.Types.ObjectId;
  add_time?: Number;
  last_time?: Number;
  is_Supper?: Number;
}

export interface findUser {
  _id?: Schema.Types.ObjectId,
  username?: String,
  status?: Number;
  last_time?: Number;
}

export interface newRole {
  title: String,
  description?: String,
  status?: Number,
  add_time?: Number
}

export interface findRole {
  _id?: Schema.Types.ObjectId,
  title?: String,
  description?: String,
  status?: Number,
}

export interface newAccess {
  module_name: String,
  // action_name?: String,
  // url: String,
  description?: String,
  type: Number,
  status?: Number,
  sort?: Number,
  // module_id: Schema.Types.Mixed,
  add_time?: Number
}

export interface findAccess {
  _id?: Schema.Types.ObjectId,
  module_name?: String,
  // action_name?: String,
  // url?: String,
  description?: String,
  type?: Number,
  status?: Number,
  sort?: Number,
  // module_id?: Schema.Types.Mixed,
  add_time?: Number
}

export interface newRoleAccess {
  access_id: Array<String>,
  role_id: Schema.Types.ObjectId,
}

export interface findRoleAccess {
  access_id?: Schema.Types.ObjectId,
  role_id?: Schema.Types.ObjectId,
  _id?: Schema.Types.ObjectId
}