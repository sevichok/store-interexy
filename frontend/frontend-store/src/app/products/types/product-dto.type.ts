export interface ProductDto {
  price: number;
  availableAmount: number;
  title?: string;
  category: string;
  description: string;
  images: string[];
  id: number;
}
