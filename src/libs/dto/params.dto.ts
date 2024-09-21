import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class ParamsDto {
  @ApiProperty({ required: true })
  @IsNumberString()
  id: number;
}
