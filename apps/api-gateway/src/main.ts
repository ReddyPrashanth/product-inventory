import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { swaggerConfig } from './config/swagger.config';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { CustomRpcExceptionFilter } from './common/filters/rpc-exception.filter';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(ApiGatewayModule, {
    abortOnError: false,
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);

  const port = configService.get<number>('API_GATEWAY_PORT');
  const isProduction = configService.get<string>('NODE_ENV') === 'production';

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalFilters(new CustomRpcExceptionFilter());

  swaggerConfig(app, isProduction);

  await app.listen(port);
  logger.log(`Started on port ${port}`, `API Gateway`);
}
bootstrap();
