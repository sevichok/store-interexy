import { IsNumber, validate } from 'class-validator';

export class CreateOrderItemForm {
  @IsNumber()
  subTotalPrice: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  id: number;

  static from(form: CreateOrderItemForm) {
    if (!form) {
      return;
    }
    const it = new CreateOrderItemForm();
    it.subTotalPrice = form.subTotalPrice;
    it.quantity = form.quantity;
    it.id = form.id;
    return it;
  }

  static async validate(form: CreateOrderItemForm) {
    const errors = await validate(form);
    return errors.length ? errors : false;
  }
}
