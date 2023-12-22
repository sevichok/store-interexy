import { IsArray, IsNotEmpty, IsNumber, IsString, validate } from 'class-validator';

export class ProductForm {
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
  id: number;

  static from(form: ProductForm) {
    if (!form) {
      return;
    }
    const it = new ProductForm();
    it.price = form.price;
    it.availableAmount = form.availableAmount;
    it.category = form.category;
    it.description = form.description;
    it.images = form.images;
    it.id = form.id;
    it.title = form.title;
    return it;
  }

  static async validate(form: ProductForm) {
    const errors = await validate(form);
    return errors.length ? errors : false;
  }
}
