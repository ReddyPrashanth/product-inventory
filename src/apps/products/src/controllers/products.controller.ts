import { Body, Controller } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { MessagePattern } from '@nestjs/microservices';
import { RabbitMQQueueProducts } from '@libs/enums/queue-events.enum';
import { Product } from '../schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @MessagePattern(RabbitMQQueueProducts.FIND_ALL_PRODUCTS)
  async findAll() {
    return await this.service.findAll();
  }

  @MessagePattern(RabbitMQQueueProducts.CREATE_PRODUCTS)
  async create(@Body() product: Product) {
    return await this.service.create(product);
  }

  @MessagePattern(RabbitMQQueueProducts.FIND_PRODUCT_BY_ID)
  async show(@Body() id: number) {
    return await this.service.show(id);
  }

  @MessagePattern(RabbitMQQueueProducts.DELETE_PRODUCT)
  async delete(@Body() id: number) {
    return await this.service.delete(id);
  }
}
