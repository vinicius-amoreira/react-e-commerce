import { ShoppingCart, Store } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b border-gray-400/30 h-14 flex justify-between items-center ">
      <button>
        <Store />
      </button>
      <div className="flex gap-4">
        <Link className="hover:underline" to="/">
          Home
        </Link>
        <Link className="hover:underline" to="/products">
          Products
        </Link>
      </div>
      <Link to="/cart">
        <ShoppingCart />
      </Link>
    </nav>
  );
}

export default Navbar;
