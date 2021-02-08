import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminModule } from './module/admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose'
import { AdminAuthMiddleware } from "src/middleware/admin-auth.middleware";

@Module({
  imports: [AdminModule,
    MongooseModule.forRoot('mongodb://localhost:27017/logistics', { useNewUrlParser: true, useFindAndModify: false })],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminAuthMiddleware).forRoutes('*')
  }
}
