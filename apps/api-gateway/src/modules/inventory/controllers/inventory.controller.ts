import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateInventory } from '../dto/create-inventory.dto';
import { InventoryService } from '../services/inventory.service';
import { ParamsDto } from '@libs/dto/params.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @Post(':id')
  async createInventory(
    @Param() params: ParamsDto,
    @Body() dto: CreateInventory,
  ) {
    return await this.service.createInventory(params.id, dto);
  }

  @Get(':id')
  async findInventory(@Param() params: ParamsDto) {
    return await this.service.findInventory(params.id);
  }

  @Delete(':id')
  async deleteInventory(@Param() params: ParamsDto) {
    return await this.service.deleteInventory(params.id);
  }
}
