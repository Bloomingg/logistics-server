import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

// 权限信息
export const AccessSchema = new mongoose.Schema({
  module_name: { type: String, required: true,unique:true },      //模块名称
  // action_name: { type: String },      //操作名称
  type: { type: Number, required: true },   //节点类型 :  1、表示模块   2、表示菜单     3、操作
  // url: { type: String, required: true },         //路由跳转地址
  // module_id: {                //此module_id和当前模型的_id关联     module_id= 0 表示模块
  //   type: Schema.Types.Mixed,
  //   required: true  //混合类型
  // },
  sort: {
    type: Number,
    default: 100
  },
  description: { type: String },
  status: {
    type: Number,
    default: 1
  },
  add_time: {
    type: Number,
    default: new Date().getTime()
  }
});
