import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ToolsService } from 'src/service/tools/tools.service';
import { TransportService } from 'src/service/transport/transport.service';

@Controller('transport')
export class TransportController {
  constructor(private transportService: TransportService, private toolsService: ToolsService) { }

  //获取线路
  @Post('route/getAll')
  async getAllRoute(@Body() body, @Res() res) {
    const { page, size, startCity, endCity } = body
    // console.log(page + '' + size);
    let reqData = {}
    if (startCity != "" && startCity != undefined) reqData['startCity'] = startCity
    if (endCity != "" && endCity != undefined) reqData['endCity'] = endCity
    try {
      const data = await this.transportService.findRoute(reqData, page, size)
      const total = await this.transportService.getRouteCount(reqData)
      const resData = this.toolsService.sendResData({ msg: "查询成功", data: { routeList: data, total: total, page: page } })
      res.send(resData)
    } catch (error) {
      const resData = this.toolsService.sendResData({ msg: "查询失败:" + error, code: 218, suc: false })
      res.send(resData)
    }
  }
  // 新增线路
  @Post('route/addRoute')
  async addRoute(@Body() body, @Res() res) {
    const { startCity, endCity, passCity } = body
    const reqData = {
      startCity,
      endCity,
      passCity
    }
    try {
      let resData = {}
      const result = await this.transportService.addRoute(reqData)
      if (result.startCity == startCity) {
        resData = this.toolsService.sendResData({ msg: "新增成功" })
      } else {
        resData = this.toolsService.sendResData({ msg: "新增失败", code: 218, suc: false })
      }
      res.send(resData)
    } catch (error) {
      const resData = this.toolsService.sendResData({ msg: "新增失败：" + error, code: 218, suc: false })
      res.send(resData)
    }
  }
  // 修改线路
  @Post('route/updateRoute')
  async updateRoute(@Body() body, @Res() res) {
    const { _id, startCity, endCity, passCity } = body
    const reqData = {
      last_time: new Date().getTime(),
      _id,
      startCity,
      endCity,
      passCity
    }
    try {
      let resData = {}
      const result = await this.transportService.updateRoute(_id, reqData)
      console.log(result);
      if (_id == result.id) {
        resData = this.toolsService.sendResData({ msg: "修改成功" })
      } else {
        resData = this.toolsService.sendResData({ msg: "修改失败", code: 218, suc: false })
      }
      res.send(resData)
    } catch (error) {
      const resData = this.toolsService.sendResData({ msg: "修改失败：" + error, code: 218, suc: false })
      res.send(resData)
    }
  }
  // 删除线路
  @Post('route/deleteRoute')
  async deleteRoute(@Body() body, @Res() res) {
    const { _id } = body
    try {
      let resData = {}
      const result = await this.transportService.deleteRoute(_id)
      console.log(result);
      if (_id == result.id) {
        resData = this.toolsService.sendResData({ msg: "删除成功" })
      } else {
        resData = this.toolsService.sendResData({ msg: "删除失败", code: 218, suc: false })
      }
      res.send(resData)
    } catch (error) {
      const resData = this.toolsService.sendResData({ msg: "删除失败：" + error, code: 218, suc: false })
      res.send(resData)
    }
  }

  //获取班次
  @Post('frequency/getAll')
  async getAllFrequency(@Body() body, @Res() res) {
    const { page, size, startCity, endCity, transNo } = body
    // console.log(page + '' + size);
    let reqData = {}
    if (startCity != "" && startCity != undefined) reqData['startCity'] = startCity
    if (endCity != "" && endCity != undefined) reqData['endCity'] = endCity
    if (transNo != "" && transNo != undefined) reqData['transNo'] = transNo
    try {
      const data = await this.transportService.findFrequency(reqData, page, size)
      const total = await this.transportService.getFrequencyCount(reqData)
      const resData = this.toolsService.sendResData({ msg: "查询成功", data: { freqList: data, total: total, page: page } })
      res.send(resData)
    } catch (error) {
      const resData = this.toolsService.sendResData({ msg: "查询失败:" + error, code: 218, suc: false })
      res.send(resData)
    }
  }
  // 新增班次
  @Post('frequency/addFrequency')
  async addFrequency(@Body() body, @Res() res) {
    const { startCity, endCity, transNo, treTime, routeId } = body
    const reqData = {
      startCity,
      endCity,
      transNo,
      treTime,
      routeId
    }
    try {
      let resData = {}
      const result = await this.transportService.addFrequency(reqData)
      if (result.startCity == startCity) {
        resData = this.toolsService.sendResData({ msg: "新增成功" })
      } else {
        resData = this.toolsService.sendResData({ msg: "新增失败", code: 218, suc: false })
      }
      res.send(resData)
    } catch (error) {
      const resData = this.toolsService.sendResData({ msg: "新增失败：" + error, code: 218, suc: false })
      res.send(resData)
    }
  }
  // 修改班次
  @Post('frequency/updateFrequency')
  async updateFrequency(@Body() body, @Res() res) {
    const { _id, startCity, endCity, transNo, treTime, routeId } = body
    const reqData = {
      last_time: new Date().getTime(),
      _id,
      startCity,
      endCity,
      transNo,
      treTime,
      routeId
    }
    try {
      let resData = {}
      const result = await this.transportService.updateFrequency(_id, reqData)
      console.log(result);
      if (_id == result.id) {
        resData = this.toolsService.sendResData({ msg: "修改成功" })
      } else {
        resData = this.toolsService.sendResData({ msg: "修改失败", code: 218, suc: false })
      }
      res.send(resData)
    } catch (error) {
      const resData = this.toolsService.sendResData({ msg: "修改失败：" + error, code: 218, suc: false })
      res.send(resData)
    }
  }
  // 删除班次
  @Post('frequency/deleteFrequency')
  async deleteFrequency(@Body() body, @Res() res) {
    const { _id } = body
    try {
      let resData = {}
      const result = await this.transportService.deleteFrequency(_id)
      console.log(result);
      if (_id == result.id) {
        resData = this.toolsService.sendResData({ msg: "删除成功" })
      } else {
        resData = this.toolsService.sendResData({ msg: "删除失败", code: 218, suc: false })
      }
      res.send(resData)
    } catch (error) {
      const resData = this.toolsService.sendResData({ msg: "删除失败：" + error, code: 218, suc: false })
      res.send(resData)
    }
  }


  //获取跟踪
  @Post('track/getAll')
  async getAllTrack(@Body() body, @Res() res) {
    const { page, size, startCity, endCity, transNo } = body
    // console.log(page + '' + size);
    let reqData = {}
    let resData = {}
    if (startCity != "" && startCity != undefined) reqData['startCity'] = startCity
    if (endCity != "" && endCity != undefined) reqData['endCity'] = endCity
    if (transNo != "" && transNo != undefined) reqData['transNo'] = transNo
    try {
      let data = []
      let frequencyIds = []
      let total = 0
      const Frequency = await this.transportService.findFrequency(reqData, 1, 999)
      console.log('Frequency--------------');
      console.log(Frequency);

      if (Frequency.length == 0) {
        data = []
      } else {
        for (let i = 0; i < Frequency.length; i++) {
          const id = Frequency[i]._id
          frequencyIds.push(id)
        }
        console.log('frequencyIds--------------');
        console.log(frequencyIds);
        if (JSON.stringify(reqData) == '{}') {
          data = await this.transportService.findTrack({}, page, size)
          total += await this.transportService.getTrackCount({})
        } else {
          for (let i = 0; i < frequencyIds.length; i++) {
            const tmpData = await this.transportService.findTrack({ frequencyId: frequencyIds[i] }, page, size)
            console.log(tmpData);
            total += await this.transportService.getTrackCount({ frequencyId: frequencyIds[i] })
            data = [...data, ...tmpData]
          }
        }


      }

      resData = this.toolsService.sendResData({ msg: "查询成功", data: { trackList: data, total: total, page: page } })
      res.send(resData)
    } catch (error) {
      resData = this.toolsService.sendResData({ msg: "查询失败:" + error, code: 218, suc: false })
      res.send(resData)
    }
  }
  // 新增跟踪
  @Post('track/addTrack')
  async addTrack(@Body() body, @Res() res) {
    const { startTime, endTime, curPost, frequencyId } = body
    // if (transNo == "" || transNo == undefined) {
    //   const resData = this.toolsService.sendResData({ msg: "新增失败，请输入班次号", code: 218, suc: false })
    //   res.send(resData)
    //   return
    // }
    try {
      // const frequencyInfo = await this.transportService.findFrequency({ transNo: transNo }, 1)
      let resData = {}
      // if (frequencyInfo.length > 0) {
      // const startCity = frequencyInfo[0].startCity
      // const endCity = frequencyInfo[0].endCity
      const reqData = {
        startTime,
        endTime,
        frequencyId,
        curPost
      }
      try {
        const result = await this.transportService.addTrack(reqData)
        resData = this.toolsService.sendResData({ msg: "新增成功" })
      } catch (error) {
        resData = this.toolsService.sendResData({ msg: "新增失败：" + error, code: 218, suc: false })
        res.send(resData)
      }
      // } else {
      //   resData = this.toolsService.sendResData({ msg: "请输入正确的物流班次", code: 218, suc: false })
      // }
      res.send(resData)
    } catch (error) {
      const resData = this.toolsService.sendResData({ msg: "新增失败：" + error, code: 218, suc: false })
      res.send(resData)
    }
  }
  // 修改跟踪
  @Post('track/updateTrack')
  async updateTrack(@Body() body, @Res() res) {
    const { _id, frequencyId, startTime, endTime, curPost } = body
    // if (transNo == "" || transNo == undefined) {
    //   const resData = this.toolsService.sendResData({ msg: "新增失败，请输入班次号", code: 218, suc: false })
    //   res.send(resData)
    //   return
    // }

    try {
      // const frequencyInfo = await this.transportService.findFrequency({ transNo: transNo }, 1)
      let resData = {}
      // if (frequencyInfo.length > 0) {
      //   const startCity = frequencyInfo[0].startCity
      //   const endCity = frequencyInfo[0].endCity
      const reqData = {
        last_time: new Date().getTime(),
        _id,
        frequencyId,
        startTime,
        endTime,
        curPost
      }
      try {
        const result = await this.transportService.updateTrack(_id, reqData)
        console.log(result);
        // if (_id == result.id) {
        resData = this.toolsService.sendResData({ msg: "修改成功" })
        // } else {
        //   resData = this.toolsService.sendResData({ msg: "修改失败", code: 218, suc: false })
        // }
      } catch (error) {
        resData = this.toolsService.sendResData({ msg: "修改失败：" + error, code: 218, suc: false })
        res.send(resData)
      }
      // } else {
      //   resData = this.toolsService.sendResData({ msg: "请输入正确物流班次", code: 218, suc: false })
      // }
      res.send(resData)
    } catch (error) {
      const resData = this.toolsService.sendResData({ msg: "修改失败：" + error, code: 218, suc: false })
      res.send(resData)
    }
  }
  // 删除跟踪
  @Post('track/deleteTrack')
  async deleteTrack(@Body() body, @Res() res) {
    const { _id } = body
    try {
      let resData = {}
      const result = await this.transportService.deleteTrack(_id)
      console.log(result);
      if (_id == result.id) {
        resData = this.toolsService.sendResData({ msg: "删除成功" })
      } else {
        resData = this.toolsService.sendResData({ msg: "删除失败", code: 218, suc: false })
      }
      res.send(resData)
    } catch (error) {
      const resData = this.toolsService.sendResData({ msg: "删除失败：" + error, code: 218, suc: false })
      res.send(resData)
    }
  }
}
