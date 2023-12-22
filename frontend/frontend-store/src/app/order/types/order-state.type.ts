import { BaseState } from "types/base-state.type";
import { OrderDto } from "./order-dto.type";

export interface OrderState extends BaseState {
  order: OrderDto | null;
  pending: {
    order: boolean;
  };
  errors: {
    order: string | null;
  };
}
