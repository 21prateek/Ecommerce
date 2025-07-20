import React, { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";

function Content() {
  const { allProduct, getAllProduct } = useProductStore();
  const navigate = useNavigate();

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className="  ">
      
      <h1 className="text-center text-2xl font-bold">Product List</h1>
      <div className="grid grid-cols-3 gap-4 p-4">
        {allProduct.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white p-4 rounded shadow flex flex-col justify-center items-center hover:transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate({ to: `/product/${product.id}` })}
          >
            <img src={product.imageUrl} alt="" />
            <h2 className="text-xl font-semibold text-gray-700">
              {product.name}
            </h2>
            <p className="text-gray-700">Price: Rs.{product.price}</p>
          </motion.div>
        ))}
      </div>
      {allProduct.length === 0 && (
        <p className="text-center text-gray-500">No products available</p>
      )}
    </div>
  );
}

export default Content;
