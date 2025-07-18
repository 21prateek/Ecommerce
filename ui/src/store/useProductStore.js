import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";

export const useProductStore = create((set) => ({
  allProduct: [],
  selectedProduct: null,
  loading: false,
  error: null,

  //all product
  getAllProduct: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/api/v1/product/");
      //   console.log(res.data.product);
      set({ allProduct: res.data.product, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to fetch",
        loading: false,
      });
    }
  },

  //add products
  addProduct: (product) =>
    set((state) => ({ allProduct: [...state.allProduct, product] })),

  //remove product
  removeProduct: (productId) =>
    set((state) => ({
      allProduct: state.addProduct.filter((p) => p.id !== productId),
    })),
}));
