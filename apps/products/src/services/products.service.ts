import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../schemas/product.schema';
import { Repository } from 'typeorm';
import { Service } from '@libs/services/service';

@Injectable()
export class ProductsService extends Service {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {
    super();
  }

  async findAll() {
    return await this.repo.find();
  }

  async show(id: number) {
    try {
      return await this.repo.findOneOrFail({ where: { id } });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      this.handleError(
        error,
        {
          message: `Product with id ${id} not found.`,
          statusCode: HttpStatus.NOT_FOUND,
        },
        true,
      );
    }
  }

  async create(product: Product) {
    try {
      const newProd = this.repo.create(product);
      return await this.repo.save(newProd);
    } catch (error) {
      this.handleError(error, {
        message: `${product.name} already taken.`,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async delete(id: number) {
    if (id) await this.repo.delete(id);
    return {
      message: `Product ${id} deleted successfully.`,
    };
  }
}
