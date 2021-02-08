import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { newUser } from 'src/interface/user';
import { ToolsService } from 'src/service/tools/tools.service';
import { UserService } from 'src/service/user/user.service';

@Controller('user')
export class UserController {
  constructor(private toolsService: ToolsService, private userService: UserService) { }

  @Get('userList')
  async getUserList(@Query() query, @Res() res) {
    // console.log(query);
    let { page, size, username, status } = query
    if (page == "" || page == undefined) {
      const resData = this.toolsService.sendResData({ msg: "请输入分页信息", suc: false, code: 218 })
      res.send(resData)
      return
    }
    page = parseInt(page)
    size = parseInt(size)
    let reqData = {}
    let setSize: number = 10
    if (username != "" && username != undefined) reqData['username'] = username
    if (status != "" && status != undefined) reqData['status'] = status
    if (size != "" && size != undefined) setSize = size

    try {
      const data = await this.userService.findUsers(reqData, page, setSize)
      const total = await this.userService.getUsersCount(reqData)
      // const data = tmpData.map(async element => {
      //   // if (element.role_id != "" || element.role_id != undefined) element.role = await this.userService.findRole({ _id: element.role_id }, 1)
      //   if (element.role_id!="" && element.role_id != undefined) {
      //     const role = await this.userService.findRole({ _id: element.role_id }, 1)
      //     console.log(role[0].title);
      //     element.role = role[0].title
      //     console.log(element);
      //   }
      //   return element
      // });
      // console.log(result);
      const resData = this.toolsService.sendResData({ msg: "查询成功", data: { userList: data, total: total, page: page } })
      res.send(resData)
    } catch (error) {
      const resData = this.toolsService.sendResData({ msg: "查询失败:" + error, code: 218, suc: false })
      res.send(resData)
    }

  }
  @Post('addUser')
  async addUser(@Body() body, @Res() res) {
    const { username, password, status, role_id, is_Supper } = body
    const md5Password = this.toolsService.getMd5(password)
    let resData = {}
    let reqData = {
      username,
      status,
      role_id,
      password: md5Password,
    }
    if (is_Supper != undefined) reqData['is_Supper'] = is_Supper
    try {
      const result = await this.userService.addUser(reqData)
      console.log(result);
      resData = this.toolsService.sendResData({ msg: "新增成功" })
      res.send(resData)
    } catch (error) {
      resData = this.toolsService.sendResData({ msg: "新增失败：" + error, code: 218, suc: false })
      res.send(resData)
    }
  }
  @Post('updateStatus')
  async updateStatus(@Body() body, @Res() res) {
    try {
      let resData = {}
      const result = await this.userService.updateStatus(body._id, body)
      // console.log(result);
      if (result._id == body._id) {
        resData = this.toolsService.sendResData({ msg: "操作成功" })
      } else {
        resData = this.toolsService.sendResData({ msg: "操作失败", suc: false, code: 218 })
      }
      res.send(resData)
    } catch (error) {
      const resData = this.toolsService.sendResData({ msg: "操作失败：" + error, suc: false, code: 218 })
      res.send(resData)
    }
  }
  @Get('deleteUser')
  async deleteUser(@Query() query, @Res() res) {
    const { _id } = query
    let resData = {}
    if (_id == "" || _id == undefined) {
      resData = this.toolsService.sendResData({ msg: "删除失败，请传入正确的id", suc: false, code: 218 })
      res.send(resData)
      return false
    }
    try {
      console.log(_id);

      const result = await this.userService.deleteUser(_id)
      // console.log(result);
      if (result) {
        resData = this.toolsService.sendResData({ msg: "删除成功" })
      } else {
        resData = this.toolsService.sendResData({ msg: "删除失败，请传入正确的id", suc: false, code: 218 })
      }
      res.send(resData)
    } catch (error) {
      resData = this.toolsService.sendResData({ msg: "删除失败：" + error, suc: false, code: 218 })
      res.send(resData)
    }
  }

  @Post('addRole')
  async addRole(@Body() body, @Res() res) {
    const { title, description } = body
    const reqData = {
      title,
      description
    }
    let resData = {}
    try {
      const result = await this.userService.addRole(reqData)
      console.log(result);
      if (result.title == title) {
        resData = this.toolsService.sendResData({ msg: "新增成功" })
      } else {
        resData = this.toolsService.sendResData({ msg: "新增失败", code: 218, suc: false })
      }
      res.send(resData)
    } catch (error) {
      resData = this.toolsService.sendResData({ msg: "新增失败：" + error, code: 218, suc: false })
      res.send(resData)
    }
  }
  @Get('getRoles')
  async getRoles(@Query() query, @Res() res) {
    let { page, size } = query
    let resData = {}
    if (page == "" || page == undefined) {
      resData = this.toolsService.sendResData({ msg: "请输入分页信息", suc: false, code: 218 })
      res.send(resData)
      return
    }
    page = parseInt(page)
    size = parseInt(size)
    let reqData = {}
    let setSize: number = 10
    if (size != "" && size != undefined) setSize = size

    try {
      const data = await this.userService.findRole(reqData, page, setSize)
      const total = await this.userService.getRolesCount(reqData)
      // console.log(result);
      resData = this.toolsService.sendResData({ msg: "查询成功", data: { roleList: data, total: total, page: page } })
      res.send(resData)
    } catch (error) {
      resData = this.toolsService.sendResData({ msg: "查询失败:" + error, code: 218, suc: false })
      res.send(resData)
    }
  }
  @Get('deleteRole')
  async deleteRole(@Query() query, @Res() res) {
    const { _id } = query
    let resData = {}
    if (_id == "" || _id == undefined) {
      resData = this.toolsService.sendResData({ msg: "删除失败，请传入正确的id", suc: false, code: 218 })
      res.send(resData)
      return false
    }
    try {
      console.log(_id);

      const result = await this.userService.deleteRole(_id)
      // console.log(result);
      if (result) {
        resData = this.toolsService.sendResData({ msg: "删除成功" })
      } else {
        resData = this.toolsService.sendResData({ msg: "删除失败，请传入正确的id", suc: false, code: 218 })
      }
      res.send(resData)
    } catch (error) {
      resData = this.toolsService.sendResData({ msg: "删除失败：" + error, suc: false, code: 218 })
      res.send(resData)
    }
  }

  @Post('addAccess')
  async addAccess(@Body() body, @Res() res) {
    const { module_name, description, type, sort } = body
    const reqData = {
      module_name,
      type,
      description,
      sort
    }
    let resData = {}
    try {
      const result = await this.userService.addAccess(reqData)
      console.log(result);
      if (result.module_name == module_name) {
        resData = this.toolsService.sendResData({ msg: "新增成功" })
      } else {
        resData = this.toolsService.sendResData({ msg: "新增失败", code: 218, suc: false })
      }
      res.send(resData)
    } catch (error) {
      resData = this.toolsService.sendResData({ msg: "新增失败：" + error, code: 218, suc: false })
      res.send(resData)
    }
  }
  @Get('getAccess')
  async getAccesss(@Query() query, @Res() res) {
    let { module_name, type } = query
    let resData = {}
    let reqData = {}
    if (module_name != "" && module_name != undefined) reqData['module_name'] = module_name
    if (type != "" && type != undefined) reqData['type'] = type

    try {
      const data = await this.userService.findAccess(reqData)
      resData = this.toolsService.sendResData({ msg: "查询成功", data: { accessList: data } })
      res.send(resData)
    } catch (error) {
      resData = this.toolsService.sendResData({ msg: "查询失败:" + error, code: 218, suc: false })
      res.send(resData)
    }
  }
  @Get('deleteAccess')
  async deleteAccesss(@Query() query, @Res() res) {
    const { _id } = query
    let resData = {}
    if (_id == "" || _id == undefined) {
      resData = this.toolsService.sendResData({ msg: "删除失败，请传入正确的id", suc: false, code: 218 })
      res.send(resData)
      return false
    }
    try {
      const result = await this.userService.deleteAccess(_id)
      if (result) {
        resData = this.toolsService.sendResData({ msg: "删除成功" })
      } else {
        resData = this.toolsService.sendResData({ msg: "删除失败，请传入正确的id", suc: false, code: 218 })
      }
      res.send(resData)
    } catch (error) {
      resData = this.toolsService.sendResData({ msg: "删除失败：" + error, suc: false, code: 218 })
      res.send(resData)
    }
  }

  @Post('addRoleAccess')
  async addRoleAccess(@Body() body, @Res() res) {
    const { role_id, access_id } = body
    const reqData = {
      access_id,
      role_id,
    }
    console.log(access_id);
    let resData = {}
    try {
      const result = await this.userService.addRoleAccess(reqData)
      console.log(result);
      if (result.role_id == role_id) {
        resData = this.toolsService.sendResData({ msg: "新增成功" })
      } else {
        resData = this.toolsService.sendResData({ msg: "新增失败", code: 218, suc: false })
      }
      res.send(resData)
    } catch (error) {
      resData = this.toolsService.sendResData({ msg: "新增失败：" + error, code: 218, suc: false })
      res.send(resData)
    }
  }
  @Post('updateRoleAccess')
  async updateRoleAccess(@Body() body, @Res() res) {
    try {
      let resData = {}
      const result = await this.userService.updateRoleAccess(body._id, body)
      // console.log(result);
      if (result._id == body._id) {
        resData = this.toolsService.sendResData({ msg: "操作成功" })
      } else {
        resData = this.toolsService.sendResData({ msg: "操作失败", suc: false, code: 218 })
      }
      res.send(resData)
    } catch (error) {
      const resData = this.toolsService.sendResData({ msg: "操作失败：" + error, suc: false, code: 218 })
      res.send(resData)
    }
  }
  @Get('getRoleAccess')
  async getRoleAccess(@Query() query, @Res() res) {
    let { access_id, role_id, _id } = query
    let resData = {}
    let reqData = {
      role_id
    }
    if (access_id != "" && access_id != undefined) reqData['access_id'] = access_id
    if (_id != "" && _id != undefined) reqData['_id'] = _id

    try {
      const data = await this.userService.findRoleAccess(reqData)
      resData = this.toolsService.sendResData({ msg: "查询成功", data: { RoleAccessList: data } })
      res.send(resData)
    } catch (error) {
      resData = this.toolsService.sendResData({ msg: "查询失败:" + error, code: 218, suc: false })
      res.send(resData)
    }
  }
}
