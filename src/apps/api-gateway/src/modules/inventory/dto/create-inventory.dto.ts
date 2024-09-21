import { Length, Min } from 'class-validator';

export class CreateInventory {
  @Min(1)
  quantity: number;

  @Length(4, 50)
  location: string;
}
