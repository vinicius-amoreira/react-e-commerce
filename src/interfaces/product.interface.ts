import { IProductDimensions } from "./productDimensions.interface";
import { IProductMeta } from "./productMeta.interface";
import { IProductReview } from "./productReview.interface";

export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: IProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: ProductAvailabilityStatus;
  reviews: IProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: IProductMeta;
  images: string[];
  thumbnail: string;
}

export type ProductAvailabilityStatus = "In Stock" | "Out of Stock" | "Low Stock";
