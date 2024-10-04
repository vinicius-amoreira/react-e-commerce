import axios from "axios";
import { LoaderCircle, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tag from "../../components/Tag";
import { IApiResponse } from "../../interfaces/apiResponse.interface";
import { IProduct } from "../../interfaces/product.interface";
import { StockStatus } from "../../components/StockStatus";
import { RatingStars } from "../../components/RatingStars";
import { Comment } from "../../components/Comment";
import { ICart } from "../../interfaces/cart.interface";

function ProductDetailsPage() {
  const params = useParams();

  const [product, setProduct] = useState<IProduct>();

  function addProductToCart(product: IProduct) {
    const cart: ICart[] = JSON.parse(localStorage.getItem("cart") ?? "[]");
    const existingProductIndex = cart.findIndex((item) => item.product.id === product.id);

    if (existingProductIndex !== -1) {
      const cartItem: ICart = {
        ...cart[existingProductIndex],
        quantity: cart[existingProductIndex].quantity + 1,
        total: Number((cart[existingProductIndex].total + product.price).toFixed(2)),
      };

      cart[existingProductIndex] = cartItem;
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      const cartItem: ICart = { product, quantity: 1, total: product.price };
      localStorage.setItem("cart", JSON.stringify([...cart, cartItem]));
    }
  }

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${params.id}`).then((res: IApiResponse<IProduct>) => {
      setProduct(res.data);
    });
  }, [params.id]);

  return (
    <div className="w-[850px] mx-auto">
      {!product && <LoaderCircle className="mx-auto animate-spin" />}

      {product && (
        <>
          <div className="mb-3">
            {product.tags.map((tag) => (
              <Tag text={tag} key={tag} />
            ))}
          </div>
          <div className="flex gap-3 border-b border-gray-400/30">
            <div>
              <img src={product.thumbnail} alt={product.title} className="h-[400px] w-[400px]" />
            </div>

            <div className="flex flex-col flex-1">
              <div className="space-y-3 py-3 border-b border-b-gray-400/30">
                <h3 className="text-2xl font-medium">{product.title}</h3>
                {product.brand && <span className="text-xs">Brand: {product.brand}</span>}
                <div className="flex justify-between items-center">
                  <RatingStars rating={product.rating} showRating={true} />
                  <span className="text-xs">SKU: {product.sku}</span>
                </div>
              </div>
              <div className="flex justify-between py-3 border-b border-b-gray-400/30">
                <StockStatus status={product.availabilityStatus} />
                <span className="text-sm">{product.shippingInformation}</span>
              </div>
              <div className="flex-1">
                <div className="flex flex-col justify-center items-center h-full">
                  <div className="text-4xl mb-8">
                    <strong>${product.price}</strong>
                  </div>
                  <button
                    onClick={() => addProductToCart(product)}
                    disabled={product.availabilityStatus === "Out of Stock"}
                    className="flex justify-center gap-3 w-full bg-green-600 rounded-md px-4 py-2 text-white text-lg font-bold transition hover:bg-green-700 disabled:bg-gray-300"
                  >
                    <ShoppingCart />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="py-6 px-4 space-y-3 border-b border-b-gray-400/30">
            <h3 className="text-lg font-medium">Description</h3>
            <p className="text-md">{product.description}</p>
          </div>

          <div className="py-6 px-4 space-y-3">
            <h3 className="text-lg font-medium">Reviews</h3>

            <div className="space-y-6">
              {product.reviews.map((review) => (
                <Comment review={review} key={review.reviewerEmail} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetailsPage;
