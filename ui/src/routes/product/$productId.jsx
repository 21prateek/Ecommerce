import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import { useProductStore } from "../../store/useProductStore";
import NavBar from "../../components/NavBar";
import { useCartStore } from "../../store/useCartStore";

export const Route = createFileRoute("/product/$productId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { productId } = useParams({ strict: false });
  const { productDetails, selectedProduct, loading } = useProductStore();
  const { addItem, isLoading } = useCartStore();

  useEffect(() => {
    productDetails(productId);
  }, [productId]);

  const handleAdd = async () => {
    await addItem(productId, 1);
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!selectedProduct) return <p className="text-center">Product not found</p>;

  return (
    <div className="bg-white min-h-screen">
      <NavBar />
      <div className="flex items-start">
        <div className="p-4 w-[50%] ">
          <img src={selectedProduct.image} alt="" className="w-10/12" />
        </div>
        <div className="p-18 text-black flex flex-col gap-3    w-[40%]">
          <h1 className="text-6xl">{selectedProduct.name}</h1>
          <h1 className="text-2xl">Price: ₹{selectedProduct.price}</h1>
          <h1 className="text-2xl">
            Number of stock left: {selectedProduct.stock}
          </h1>

          <div className="flex items-center gap-4">
            <button className="bg-amber-300 p-4 rounded-2xl shadow-xl border-b border-amber-300 cursor-pointer hover:bg-white ">
              Buy now
            </button>
            <button
              className="bg-blue-500 p-4 rounded-2xl shadow-xl border-b  cursor-pointer hover:bg-white "
              onClick={handleAdd}
              disabled={isLoading}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
