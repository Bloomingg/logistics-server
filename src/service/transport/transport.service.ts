import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Schema } from 'mongoose';
import { newRoute, findRoute, newFrequency, findFrequency, findTrack, newTrack } from "src/interface/transport";

@Injectable()
export class TransportService {
  constructor(@InjectModel('Route') private readonly routeModel, @InjectModel('Frequency') private readonly frequencyModel, @InjectModel('LogisticsTrack') private readonly trackModel) { }

  // 线路
  async findRoute(json: findRoute, page: number, size: number = 10) {
    console.log(json);

    let cur: number = (page - 1) * size
    return await this.routeModel.find(json).skip(cur).limit(size)
  }
  async getRouteCount(json: findRoute) {
    return await this.routeModel.countDocuments(json)
  }
  async addRoute(json: newRoute) {
    let model = new this.routeModel(json)
    return await model.save()
  }
  async updateRoute(id: Schema.Types.ObjectId, json: newRoute) {
    return await this.routeModel.findByIdAndUpdate(id, json)
  }
  async deleteRoute(id: Schema.Types.ObjectId) {
    return await this.routeModel.findByIdAndRemove(id)
  }

  // 班次
  async findFrequency(json: findFrequency, page: number, size: number = 10) {
    let cur: number = (page - 1) * size
    return await this.frequencyModel.find(json).skip(cur).limit(size)
  }

  async getFrequencyCount(json: findFrequency) {
    return await this.frequencyModel.countDocuments(json)
  }

  async addFrequency(json: newFrequency) {
    let model = new this.frequencyModel(json)
    return await model.save()
  }

  async updateFrequency(id: Schema.Types.ObjectId, json: newFrequency) {
    return await this.frequencyModel.findByIdAndUpdate(id, json)
  }

  async deleteFrequency(id: Schema.Types.ObjectId) {
    return await this.frequencyModel.findByIdAndRemove(id)
  }


  // 跟踪
  async findTrack(json: findTrack, page: number, size: number = 10) {
    let cur: number = (page - 1) * size
    const { frequencyId } = json
    if (frequencyId == undefined) {
      return await this.trackModel.aggregate([
        {
          $lookup: {
            from: "frequency",
            localField: "frequencyId",
            foreignField: "_id",
            as: "frequencyInfo"
          }
        },
        {
          $limit: size
        },
        {
          $skip: cur
        }
      ])
    } else {
      return await this.trackModel.aggregate([
        {
          $lookup: {
            from: "frequency",
            localField: "frequencyId",
            foreignField: "_id",
            as: "frequencyInfo"
          }
        },
        {
          $match: { "frequencyId": frequencyId }
        },
        {
          $limit: size
        },
        {
          $skip: cur
        }
      ])
    }

    // return await this.trackModel.find(json).skip(cur).limit(size)
  }

  async getTrackCount(json: findTrack) {
    return await this.trackModel.countDocuments(json)
  }

  async addTrack(json: newTrack) {
    console.log(json);

    let model = new this.trackModel(json)
    return await model.save()
  }

  async updateTrack(id: Schema.Types.ObjectId, json: newTrack) {
    return await this.trackModel.findByIdAndUpdate(id, json)
  }

  async deleteTrack(id: Schema.Types.ObjectId) {
    return await this.trackModel.findByIdAndRemove(id)
  }
}
