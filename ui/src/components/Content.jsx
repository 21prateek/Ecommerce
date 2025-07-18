import React, { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";

function Content() {
  const { allProduct, getAllProduct } = useProductStore();

  useEffect(() => {
    getAllProduct();
  }, []);
  console.log(Array.isArray(allProduct));
  console.log("Fetched Products:", allProduct);
  return (
    <div className="  ">
      <h1 className="text-center text-2xl font-bold">Product List</h1>
      <div className="grid grid-cols-3 gap-4 p-4">
        {allProduct.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold text-gray-700">
              {product.name}
            </h2>
            <p className="text-gray-700">Price: ${product.price}</p>
          </div>
        ))}
      </div>
      {allProduct.length === 0 && (
        <p className="text-center text-gray-500">No products available</p>
      )}
    </div>
  );
}

export default Content;
