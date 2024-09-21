import { RabbitMQQueueProducts } from '@libs/enums/queue-events.enum';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(@Inject('PRODUCTS_SERVICE') private productsProxy: ClientProxy) {}

  async getProducts() {
    try {
      return this.productsProxy.send(
        RabbitMQQueueProducts.FIND_ALL_PRODUCTS,
        '',
      );
    } catch (error) {
      throw error;
    }
  }

  async createProduct(dto: CreateProductDto) {
    try {
      return this.productsProxy.send(
        RabbitMQQueueProducts.CREATE_PRODUCTS,
        dto,
      );
    } catch (error) {
      throw error;
    }
  }

  async getProduct(id: number) {
    try {
      return this.productsProxy.send(
        RabbitMQQueueProducts.FIND_PRODUCT_BY_ID,
        id,
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id: number) {
    try {
      return this.productsProxy.send(RabbitMQQueueProducts.DELETE_PRODUCT, id);
    } catch (error) {
      throw error;
    }
  }
}
