import { Schema } from "mongoose";

export interface newOrder {
  frequencyId: Schema.Types.ObjectId
  obtain_time?: String
  status?: Number
  send_time?: String
  price?: Number
  _id?: Schema.Types.ObjectId
}

export interface findOrder {
  orderId?: any
  // page: number
  // size: number
  // frequencyId?: Schema.Types.ObjectId
  // obtain_time?: String
  // status?: Number
  // send_time?: String
}