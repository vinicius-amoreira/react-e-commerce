import axios from "axios";
import { useEffect, useState } from "react";
import { IApiResponse } from "../../interfaces/apiResponse.interface";
import { IProduct } from "../../interfaces/product.interface";
import Product from "../../components/Product";

function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((res: IApiResponse<{ products: IProduct[] }>) => {
      setProducts(res.data.products);
    });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductsPage;
