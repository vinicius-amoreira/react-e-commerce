import { ProductAvailabilityStatus } from "../interfaces/product.interface";

interface StockStatusProps {
  status: ProductAvailabilityStatus;
}

const stockStatus = {
  ["In Stock"]: "bg-green-500",
  ["Out of Stock"]: "bg-red-500",
  ["Low Stock"]: "bg-yellow-500",
};

export function StockStatus({ status }: Readonly<StockStatusProps>) {
  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-opacity-50 ${stockStatus[status]}`}>
      <span>{status}</span>
    </div>
  );
}
