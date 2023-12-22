import { IsNumber } from 'class-validator';

export class ItemDTO {
  @IsNumber()
  quantity: number;

  @IsNumber()
  subTotalPrice: number;

  @IsNumber()
  productId: number;
}
