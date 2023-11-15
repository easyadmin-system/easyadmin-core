import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Config } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('easyadmin-core API')
    .setDescription('README: https://github.com/easyadmin-system/easyadmin-core')
    .setVersion('4.0')
    .addBearerAuth()
    .build();

  const swaggerOptions: SwaggerDocumentOptions =  {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };

  const document = SwaggerModule.createDocument(app, swaggerConfig, swaggerOptions);
  console.log(JSON.stringify(document))
  SwaggerModule.setup('api', app, document);

  await app.listen(Config.port);
}
bootstrap();
