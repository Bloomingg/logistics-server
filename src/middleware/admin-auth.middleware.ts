import { Injectable, NestMiddleware } from '@nestjs/common';
import * as auth from 'basic-auth'

@Injectable()
export class AdminAuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // console.log(req.session.vericode);
    const pathname = req.baseUrl
    // console.log(auth(req).name);
    next();
  }
}
