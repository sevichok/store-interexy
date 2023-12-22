import { IsString, IsNumber, IsNotEmpty, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  availableAmount: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsArray()
  @IsNotEmpty()
  images: string[];

  @IsNumber()
  productId: number;
}
