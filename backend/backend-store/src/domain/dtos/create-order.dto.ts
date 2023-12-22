import { IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  quantity: number;

  @IsNumber()
  subTotalPrice: number;

  @IsNumber()
  productId: number;
}
