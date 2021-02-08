import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import { findOrder, newOrder } from 'src/interface/order';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private readonly orderModel) { }

  async findOrder(json: findOrder, page: number, size: number) {
    let { orderId } = json

    let cur: number = (page - 1) * size
    if (orderId && orderId != undefined) {
      const _id = mongoose.Types.ObjectId(orderId)
      console.log(typeof _id);

      return await this.orderModel.aggregate([
        {
          $lookup: {
            from: "frequency",
            localField: "frequencyId",
            foreignField: "_id",
            as: "frequencyInfo"
          }
        },
        {
          $lookup: {
            from: "track",
            localField: "frequencyId",
            foreignField: "frequencyId",
            as: "track"
          }
        },
        {
          $match: { '_id': _id }
        },
        {
          $limit: size
        },
        {
          $skip: cur
        }
      ])
    } else {
      return await this.orderModel.aggregate([
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
    }

  }
  async countOrder(json: findOrder) {
    const { orderId } = json
    let json2 = {}
    if (orderId != undefined) {
      json2['_id'] = orderId
    }
    console.log(json2);

    return await this.orderModel.countDocuments(json2)
  }
  async addOrder(json: newOrder) {
    let model = new this.orderModel(json)
    return await model.save()
  }
  async updateOrder(_id: Schema.Types.ObjectId, json: newOrder) {
    return await this.orderModel.findByIdAndUpdate(_id, json)
  }
  async deleteOrder(_id: Schema.Types.ObjectId) {
    // console.log(typeof _id);

    return await this.orderModel.findByIdAndRemove(_id)
  }
}
