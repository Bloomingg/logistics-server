import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ToolsService } from '../../../service/tools/tools.service';
import { UserService } from "src/service/user/user.service";
import * as auth from 'basic-auth'

@Controller('login')
export class LoginController {
  //注入Service
  constructor(private toolsService: ToolsService, private userService: UserService) { }

  // 登录验证
  @Post('doLogin')
  async doLogin(@Req() req, @Res() res) {
    const username = req.body.username
    let password = req.body.password
    const vericode = req.body.vericode
    let resData = {
      code: 218,
      suc: false,
      msg: "",
      data: null
    }
    if (vericode == undefined) {
      resData.msg = "请输入验证码！"
      res.send(resData)
      return
    }

    if (username == "" || password.length < 6) {
      resData.msg = "账号或密码格式错误！"
      // res.send(resData)
    } else {
      if (vericode.toUpperCase() == req.session.vericode.toUpperCase()) {
        password = this.toolsService.getMd5(password)
        // console.log(this.toosService.getMd5('123456'));
        const findResult = await this.userService.findUsers({ username: username }, 1)
        const { status } = findResult[0]
        if (status == 0) {
          resData.msg = "该账号已被禁用！"
          res.send(resData)
          return false
        }
        // console.log(findResult);
        if (findResult.length > 0 && findResult[0].status == 1) {
          if (findResult[0].password != password) {
            resData.msg = "密码错误！"
          } else {
            const { _id, role_id } = findResult[0]
            const updateResult = await this.userService.updateStatus(_id, { last_time: new Date().getTime() })

            const token = this.toolsService.getJwt({ username, role_id })
            resData.code = 200
            resData.suc = true
            resData.msg = "登录成功！"
            resData.data = {
              username: username,
              token: token,
            }
            // res.send(resData)
          }
        } else {
          resData.msg = "账号不存在！"
          // res.send(resData)
        }

      } else {
        resData.msg = "验证码错误！"
        // res.send(resData)
      }
    }
    res.send(resData)
  }
  // 获取验证码
  @Get('getVericode')
  getVericode(@Req() req, @Res() res) {
    const svgCaptcha = this.toolsService.captcha(4, 50, 80, 40, "#cc9966")
    // return "login"
    req.session.vericode = svgCaptcha.text;
    console.log(svgCaptcha.text);
    // console.log(req.session);

    res.type('svg')
    res.send(svgCaptcha.data)
  }
  // 获取用户信息
  @Get('getInfo')
  async getInfo(@Req() req, @Res() res) {
    const authorization = req.headers.authorization
    const userInfo = this.toolsService.veriToken(authorization)
    const { role_id } = userInfo
    let resData = {}
    try {
      const accessResult = await this.userService.findRoleAccess({ role_id: role_id })
      let role = await this.userService.findRole({ _id: role_id }, 1)
      role = role[0].title
      let accessList = accessResult[0].access_id
      let access = []
      for (let i = 0; i < accessList.length; i++) {
        const tmp = await this.userService.findAccess({ _id: accessList[i] })
        console.log(accessList[i]);
        console.log(tmp);
        access.push(tmp[0])
      }
      const avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
      resData = this.toolsService.sendResData({ msg: "获取成功", data: { accesses: access, avatar, role } })
    } catch (error) {
      resData = this.toolsService.sendResData({ msg: "获取失败：" + error, suc: false, code: 218 })
    }
    res.send(resData)
  }
}
