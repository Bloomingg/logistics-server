import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const orderSchema = new mongoose.Schema({
  // orderNo: { type: String, required: true, unique: true },      //模块名称
  // action_name: { type: String },      //操作名称
  frequencyId: { type: Schema.Types.ObjectId, required: true },   //节点类型 :  1、表示模块   2、表示菜单     3、操作
  // url: { type: String, required: true },         //路由跳转地址
  // module_id: {                //此module_id和当前模型的_id关联     module_id= 0 表示模块
  //   type: Schema.Types.Mixed,
  //   required: true  //混合类型
  // },
  obtain_time: {
    type: String,
  },
  status: {
    type: Number,
    default: 0
  },
  send_time: {
    type: String,
  },
  add_time: {
    type: Number,
    default: new Date().getTime()
  },
  price: {
    type: Number,
  }
});
