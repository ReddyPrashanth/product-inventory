import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [ProductsModule, InventoryModule],
})
export class ModulesModule {}
