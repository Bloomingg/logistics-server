import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as path from "path";
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //处理跨域
  app.enableCors({
    origin: 'http://localhost:9528',
    credentials: true
  })
  //配置静态资源目录
  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  // 配置cookie中间件
  app.use(cookieParser("blooming"))
  //配置session中间件
  app.use(session({
    secret: 'blooming',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 2190000000 },
    rolling: true
  }))
  //配置swagger
  const options = new DocumentBuilder()
    .setTitle('Swagger-Ui')
    .setDescription('The Swagger API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('Swagger', app, document);

  await app.listen(3000);
}
bootstrap();
