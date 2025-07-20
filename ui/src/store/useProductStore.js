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
  addProduct: async (product) => {
    // console.log("Product", product);
    set({ loading: true });
    try {
      //Make a formData and append all the thing in the it
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price.toString()); //in form data number go as string so convert it and in our zod schema do some cheking
      formData.append("stock", product.stock.toString());
      formData.append("category", product.category);
      formData.append("image", product.image[0]); // so image[0] will contain the file path
      // console.log(product.image);

      const res = await axiosInstance.post("/api/v1/product/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      // console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  },

  //remove product
  removeProduct: (productId) =>
    set((state) => ({
      allProduct: state.addProduct.filter((p) => p.id !== productId),
    })),

  //details of product by id
  productDetails: async (id) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/api/v1/product/${id}`);

      // ✅ DIRECTLY access product here (not res.data.data)
      const product = res.data.product;

      set({ loading: false, selectedProduct: product });
      console.log("Fetched Product:", product);
    } catch (error) {
      set({ loading: false });
      console.error("Fetch error:", error.message);
    }
  },
}));
