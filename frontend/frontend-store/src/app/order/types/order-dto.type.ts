import { ProductDto } from "@app/products/types/product-dto.type";

export interface OrderItemDto {
  id: number;
  quantity: number;
  subTotalPrice: number;
  productId?: number;
  product: ProductDto;
}

export interface OrderDto {
  id: number;
  title?: string;
  totalPrice?: number;
  status?: string;
  orderItems?: OrderItemDto[];
}
