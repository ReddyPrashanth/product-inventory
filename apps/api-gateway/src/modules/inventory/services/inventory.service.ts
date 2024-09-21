import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateInventory } from '../dto/create-inventory.dto';
import { RabbitMQQueueInventory } from '@libs/enums/queue-events.enum';

@Injectable()
export class InventoryService {
  constructor(
    @Inject('INVENTORY_SERVICE') private inventoryProxy: ClientProxy,
  ) {}

  async createInventory(productId: number, dto: CreateInventory) {
    try {
      return this.inventoryProxy.send(RabbitMQQueueInventory.CREATE_INVENTORY, {
        ...dto,
        productId,
      });
    } catch (error) {
      throw error;
    }
  }

  async findInventory(productId: number) {
    try {
      return this.inventoryProxy.send(
        RabbitMQQueueInventory.PRODUCT_INVENTORY,
        productId,
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteInventory(id: number) {
    try {
      return this.inventoryProxy.send(
        RabbitMQQueueInventory.DELETE_INVENTORY,
        id,
      );
    } catch (error) {
      throw error;
    }
  }
}
