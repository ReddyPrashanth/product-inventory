import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { ParamsDto } from '@libs/dto/params.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Get()
  async getProducts() {
    return await this.service.getProducts();
  }

  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    return await this.service.createProduct(body);
  }

  @Get(':id')
  async getProduct(@Param() params: ParamsDto) {
    return await this.service.getProduct(params.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletProduct(@Param() params: ParamsDto) {
    return await this.service.deleteProduct(params.id);
  }
}
