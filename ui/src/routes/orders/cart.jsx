import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCartStore } from "../../store/useCartStore";
import { useEffect } from "react";
import NavBar from "../../components/NavBar";

export const Route = createFileRoute("/orders/cart")({
  component: RouteComponent,
});

function RouteComponent() {
  const { cartItems, getAllItems, isLoading, error, deleteItem } =
    useCartStore();

  const navigate = useNavigate();

  useEffect(() => {
    getAllItems();
  }, [getAllItems]);

  const getTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        {isLoading ? (
          <div className="text-center text-blue-500 text-lg mt-10 animate-pulse">
            Loading your cart...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 mt-10">
            Error loading cart: {error}
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-10">
            Your cart is empty 🛒
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
            <ul className="space-y-6">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col md:flex-row items-center justify-between gap-6 border rounded-xl p-6 shadow-md"
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-6 w-full md:w-2/3">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">
                        {item.product.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        ₹{item.product.price} each
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col justify-center gap-3 items-center">
                    <p className="text-xl font-bold text-blue-700">
                      ₹{item.product.price * item.quantity}
                    </p>
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-900"
                      onClick={() => deleteItem(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Total */}
            <div className="flex justify-between items-center mt-10 border-t pt-6">
              <h2 className="text-2xl font-semibold">Subtotal</h2>
              <p className="text-2xl font-bold text-green-600">₹{getTotal()}</p>
              <button
                type="button"
                className="bg-blue-500 text-white rounded hover:bg-white hover:text-black hover:border px-5 py-2 text-2xl"
                onClick={() => navigate({ to: "/orders" })}
              >
                Buy{" "}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
