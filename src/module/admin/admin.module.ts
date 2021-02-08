import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
import { TransportController } from './transport/transport.controller';
import { FinanceController } from './finance/finance.controller';
import { OrderController } from './order/order.controller';
import { UserController } from './user/user.controller';
import { ToolsService } from '../../service/tools/tools.service';
import { MongooseModule } from '@nestjs/mongoose'
import { UserService } from '../../service/user/user.service'
import { TransportService } from '../../service/transport/transport.service'

import { adminSchema } from '../../schema/admin.schema'
import { AccessSchema } from '../../schema/access.schema'
import { RoleSchema } from '../../schema/role.schema'
import { RoleAccessSchema } from '../../schema/role_access.schema'
import { routeSchema } from '../../schema/route.schema'
import { frequencySchema } from '../../schema/frequency.schema'
import { logisticsTrackSchema } from '../../schema/logistics_track.schema'
import { orderSchema } from 'src/schema/order.schema';
import { OrderService } from 'src/service/order/order.service';


@Module({
  imports: [MongooseModule.forFeature(
    [
      { name: 'User', schema: adminSchema, collection: "user" },
      { name: 'Role', schema: RoleSchema, collection: "role" },
      { name: 'Access', schema: AccessSchema, collection: "access" },
      { name: 'RoleAccess', schema: RoleAccessSchema, collection: "role_access" },
      { name: 'Route', schema: routeSchema, collection: "route" },
      { name: 'Frequency', schema: frequencySchema, collection: "frequency" },
      { name: 'LogisticsTrack', schema: logisticsTrackSchema, collection: "track" },
      { name: 'Order', schema: orderSchema, collection: "order" },
    ])
  ],
  controllers: [LoginController, TransportController, FinanceController, OrderController, UserController],
  providers: [ToolsService, UserService, TransportService, OrderService]
})
export class AdminModule { }
