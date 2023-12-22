import { IsNotEmpty, IsNumber, IsArray, IsEnum, ArrayNotEmpty, ValidateNested, validate } from 'class-validator';
import { CreateOrderItemForm } from 'app/orderItem/domain/create-order-item.form';

enum OrderStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
}

export class CreateOrderForm {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  title: string;

  @IsNumber()
  totalPrice: number;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  orderItems: CreateOrderItemForm[];

  static async validate(form: CreateOrderForm) {
    const errors = await validate(form);
    return errors.length ? errors : false;
  }

  static from(form: CreateOrderForm) {
    if (!form) {
      return;
    }
    const it = new CreateOrderForm();
    it.id = form.id;
    it.title = form.title;
    it.totalPrice = form.totalPrice;
    it.status = form.status;
    it.orderItems = form.orderItems.map(CreateOrderItemForm.from);
    return it;
  }
}
