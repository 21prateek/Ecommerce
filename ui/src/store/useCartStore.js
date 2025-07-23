import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";

export const useCartStore = create((set) => ({
  cartItems: [],
  isLoading: false,
  error: null,

  //get all items
  getAllItems: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await axiosInstance.get("/api/v1/cart/add-cart");

      set({ cartItems: res.data.cartItem, isLoading: false });
    } catch (error) {
      console.error("Get Cart Error:", error);
      set({ error: error.message, loading: false });
    } finally {
      set({ isloading: false });
    }
  },

  //add item to cart
  addItem: async (productId, quantity = 1) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.post("/api/v1/cart/add-item", {
        productId,
        quantity,
      });
      // console.log(res.data);

      //after adding refresh the cart
      await useCartStore.getState().getAllItems();
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    } finally {
      set({ isloading: false });
    }
  },

  //add or remove quantity
  updateQuantity: async (productId, quantity) => {
    if (quantity < 1) return; //not less than 1

    set({ isLoading: true, error: null });

    try {
      await axiosInstance.put(`/api/v1/cart/update-cart/${productId}`, {
        quantity: quantity,
      });

      // Update only that item in local state
      //it is for a particular item , so if the click item productId matches then pu the item details and also give it a new quantity
      //otherwise give the previous it detail which does not match
      set((state) => ({
        cartItems: state.cartItems.map((item) =>
          item.id === productId ? { ...item, quantity: quantity } : item
        ),
      }));
      set({ isLoading: false });
    } catch (error) {
      console.error("Update Cart Error:", error);
      set({ error: error.message, isLoading: false });
    } finally {
      set({ isloading: false });
    }
  },

  //delete item from cart
  deleteItem: async (productId) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/api/v1/cart/delete/${productId}`);

      //filter onlt those which does not have id same as the clicked on, all of it will be set to cartItems
      set((state) => ({
        cartItems: state.cartItems.filter((item) => item.id !== productId),
      }));
      set({ isLoading: false });
    } catch (error) {
      console.error("Remove Cart Error:", error);
      set({ error: error.message, isLoading: false });
    } finally {
      set({ isloading: false });
    }
  },
}));
