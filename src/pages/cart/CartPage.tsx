import { useEffect, useState } from "react";
import { ICart } from "../../interfaces/cart.interface";
import { Minus, Plus, Trash } from "lucide-react";

export function CartPage() {
  const [cart, setCart] = useState<ICart[]>([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") ?? "[]"));
  }, []);

  function increaseDecreaseProductQuantity(item: ICart, action: "increase" | "decrease"): void {
    if (item.quantity === 1 && action === "decrease") return;

    const cart: ICart[] = JSON.parse(localStorage.getItem("cart") ?? "[]");
    const cartItemIndex = cart.findIndex((i) => i.product.id === item.product.id);

    if (action === "increase") {
      cart[cartItemIndex].quantity += 1;
      cart[cartItemIndex].total = Number((cart[cartItemIndex].total + item.product.price).toFixed(2));
    } else if (action === "decrease") {
      cart[cartItemIndex].quantity -= 1;
      cart[cartItemIndex].total = Number((cart[cartItemIndex].total - item.product.price).toFixed(2));
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart);
  }

  function removeProductFromCart(itemId: number): void {
    const cart: ICart[] = JSON.parse(localStorage.getItem("cart") ?? "[]");
    const cartItemIndex = cart.findIndex((i) => i.product.id === itemId);

    cart.splice(cartItemIndex, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart);
  }

  return cart.length > 0 ? (
    <div className="h-[600px] flex">
      <div className="w-[75%]">
        {cart.map((item) => (
          <div key={item.product.id} className="flex justify-between">
            <div>{item.product.title}</div>
            <div className="flex gap-2">
              <button onClick={() => increaseDecreaseProductQuantity(item, "decrease")}>
                <Minus size={16} />
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseDecreaseProductQuantity(item, "increase")}>
                <Plus size={16} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div>${item.product.price}</div>
              <button onClick={() => removeProductFromCart(item.product.id)}>
                <Trash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <aside className="border-l border-gray-400/30 h-full w-[25%]">
        <h1>Total:</h1>
        <strong>${cart.reduce((acc, item) => acc + item.total, 0)}</strong>
      </aside>
    </div>
  ) : (
    <div className="w-full flex justify-center">
      <h1 className="text-3xl">Your cart is empty!</h1>
    </div>
  );
}
