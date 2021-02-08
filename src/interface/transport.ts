import { Schema } from "mongoose";

export interface newRoute {
  _id?: Schema.Types.ObjectId
  startCity: String
  endCity: String
  passCity: Number
  last_time?: Number
}

export interface findRoute {
  startCity?: String
  endCity?: String
  passCity?: Number
}

export interface newFrequency {
  _id?: Schema.Types.ObjectId
  startCity: String
  endCity: String
  transNo: String
  treTime: String
  routeId: Schema.Types.ObjectId
  last_time?: Number
}

export interface findFrequency {
  startCity?: String
  endCity?: String
  transNo?: String
}

export interface newTrack {
  _id?: Schema.Types.ObjectId
  frequencyId: Schema.Types.ObjectId
  startTime: String
  endTime: String
  curPost: String
  last_time?: Number
}

export interface findTrack {
  frequencyId?: Schema.Types.ObjectId
}