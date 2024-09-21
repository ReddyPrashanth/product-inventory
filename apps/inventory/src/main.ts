import { NestFactory } from '@nestjs/core';
import { InventoryModule } from './inventory.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RabbitMQQueueNames } from '@libs/enums/queue-microservices.enum';

async function bootstrap() {
  const configService = new ConfigService();
  const msgTransporterURI = configService.get<string>('QUEUE_URI');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    InventoryModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [msgTransporterURI],
        queue: RabbitMQQueueNames.INVENTORY_QUEUE,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
