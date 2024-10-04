import { Link } from "react-router-dom";
import { IProduct } from "../interfaces/product.interface";

interface ProductProps extends React.HTMLAttributes<HTMLAnchorElement> {
  product: IProduct;
}

function Product({ product }: Readonly<ProductProps>) {
  return (
    <Link
      className="cursor-pointer space-y-3 m-3 p-3 shadow-md shadow-gray-100 border border-gray-200/30 hover:bg-gray-50 transition"
      to={`/product/${product.id}`}
    >
      <img className="w-40 h-40 mx-auto" src={product.thumbnail} alt={product.title} />
      <p>{product.title}</p>
      <p className="font-medium text-xl">${product.price}</p>
    </Link>
  );
}

export default Product;
