import { axiosInstance } from "./axiosInstance";

export const fetchCart = async () => {
  const res = await axiosInstance.get("/api/v1/cart/add-cart");
  return res.data;
};

export const addToCart = async (productId, quantity = 1) => {
  try {
    const res = await axiosInstance.post("/api/v1/cart/add-item", {
      productId,
      quantity,
    });

    return res.data;
  } catch (error) {
    console.log(error.message);
    throw new Error("Error while adding item");
  }
};

export const updateCartQuantity = async (cartId, quantity) => {
  try {
    const res = await axiosInstance.put(`/api/v1/cart/update-cart/${cartId}`, {
      quantity,
    });
    return res.data;
  } catch (error) {
    console.error("Error updating quantity:", error);
    throw new Error("Error while updating quantity");
  }
};

export const deleteItem = async (cartItemId) => {
  try {
    const res = await axiosInstance.delete(`/api/v1/cart/delete/${cartItemId}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
    throw new Error("Error while deleting item");
  }
};
