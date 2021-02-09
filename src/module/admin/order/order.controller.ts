import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { OrderService } from 'src/service/order/order.service';
import { ToolsService } from 'src/service/tools/tools.service';

@Controller('order')
export class OrderController {
  constructor(private toolsService: ToolsService, private orderService: OrderService) { }
  // 订单信息curd
  @Get('getOrder')
  async getOrder(@Query() query, @Res() res) {
    let { orderId, page, size } = query
    let reqData = {}
    let resData = {}

    if (page == undefined) {
      resData = this.toolsService.sendResData({ msg: "请输入分页信息", suc: false, code: 218 })
    }
    if (size == undefined) size = 10
    if (orderId != "" && orderId != undefined) reqData['orderId'] = orderId
    page = parseInt(page)
    size = parseInt(size)
    try {
      const result = await this.orderService.findOrder(reqData, page, size)
      console.log(result);

      const total = await this.orderService.countOrder(reqData)
      resData = this.toolsService.sendResData({ msg: "查询成功", data: { orderList: result, total, page } })
    } catch (error) {
      resData = this.toolsService.sendResData({ msg: "查询失败：" + error, suc: false, code: 218 })
    }
    res.send(resData)
  }
  @Post('addOrder')
  async addOrder(@Body() body, @Res() res) {
    const { frequencyId, obtain_time, status, send_time, price } = body
    let resData = {}
    let reqData = {
      frequencyId,
      obtain_time,
      status,
      send_time,
      price
    }
    try {
      const result = await this.orderService.addOrder(reqData)
      resData = this.toolsService.sendResData({ msg: "新增成功" })
    } catch (error) {
      resData = this.toolsService.sendResData({ msg: "新增失败：" + error, suc: false, code: 218 })
    }
    res.send(resData)
  }
  @Post('updateOrder')
  async updateOrder(@Body() body, @Res() res) {
    const { _id, frequencyId, obtain_time, status, send_time, price } = body
    let resData = {}
    let reqData = {
      _id,
      frequencyId,
      obtain_time,
      status,
      send_time,
      price
    }
    try {
      const result = await this.orderService.updateOrder(_id, reqData)
      resData = this.toolsService.sendResData({ msg: "修改成功" })
    } catch (error) {
      resData = this.toolsService.sendResData({ msg: "修改失败：" + error, suc: false, code: 218 })
    }
    res.send(resData)
  }
  @Get('deleteOrder')
  async deleteOrder(@Query() query, @Res() res) {
    const { _id } = query
    let resData = {}
    try {
      const result = await this.orderService.deleteOrder(_id)
      console.log(result);

      resData = this.toolsService.sendResData({ msg: "删除成功" })
    } catch (error) {
      resData = this.toolsService.sendResData({ msg: "删除失败：" + error, suc: false, code: 218 })
    }
    res.send(resData)
  }
}
