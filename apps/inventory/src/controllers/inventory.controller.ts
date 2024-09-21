import { Body, Controller } from '@nestjs/common';
import { InventoryService } from '../services/inventory.service';
import { CreateInventory } from '../dto/create-inventory.dto';
import { MessagePattern } from '@nestjs/microservices';
import { RabbitMQQueueInventory } from '@libs/enums/queue-events.enum';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @MessagePattern(RabbitMQQueueInventory.CREATE_INVENTORY)
  async create(@Body() dto: CreateInventory) {
    return await this.service.create(dto);
  }

  @MessagePattern(RabbitMQQueueInventory.PRODUCT_INVENTORY)
  async find(@Body() productId: number) {
    return await this.service.find(productId);
  }

  @MessagePattern(RabbitMQQueueInventory.DELETE_INVENTORY)
  async delete(@Body() id: number) {
    return await this.service.delete(id);
  }
}
