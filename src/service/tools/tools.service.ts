import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha'
import * as md5 from 'md5'
import * as jwt from 'jsonwebtoken'
import { resFormat } from "src/interface/tools";


@Injectable()
export class ToolsService {
  captcha(size: number, fontSize: number, width: number, height: number, bac: string) {
    let captcha = svgCaptcha.create({
      size: size,
      fontSize: fontSize,
      width: width,
      height: height,
      background: bac
    })
    return captcha
  }
  getMd5(str: string) {
    return md5(str)
  }
  getJwt(userInfo) {
    const token = jwt.sign({ username: userInfo.username, role_id: userInfo.role_id }, 'blooming', {
      expiresIn: 60 * 60 * 24
    })
    console.log(token);
    return token
  }
  veriToken(token: string) {
    try {
      const decoded = jwt.verify(token, 'blooming')
      console.log(decoded);
      return decoded
    } catch (error) {
      return false
    }
  }
  sendResData(data: resFormat) {
    let resData = {
      code: data.code || 200,
      suc: data.suc || true,
      msg: data.msg || "成功",
      data: data.data || null
    }
    return resData
  }
}
