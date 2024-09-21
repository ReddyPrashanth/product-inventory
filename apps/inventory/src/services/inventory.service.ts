import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../schemas/inventory.schema';
import { CreateInventory } from '../dto/create-inventory.dto';
import { Service } from '@libs/services/service';

@Injectable()
export class InventoryService extends Service {
  constructor(
    @InjectRepository(Inventory) private repo: Repository<Inventory>,
  ) {
    super();
  }

  async create(dto: CreateInventory) {
    const { productId, quantity, location } = dto;
    try {
      const inventory = this.repo.create({
        quantity,
        location,
        product: { id: productId },
      });
      return await this.repo.save(inventory);
    } catch (error) {
      this.handleError(error, {
        message: `Product ${productId} not found.`,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async find(id: number) {
    return await this.repo.find({ where: { product: { id } } });
  }

  async delete(id: number) {
    if (id) await this.repo.delete(id);
    return {
      message: `Inventory ${id} deleted successfully.`,
    };
  }
}
