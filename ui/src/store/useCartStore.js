import { create } from "zustand";
import {
  fetchCart,
  addToCart,
  deleteItem,
  updateCartQuantity,
} from "../lib/cartApi";

export const useCartStore = create((set, get) => ({
  cartItems: [],
  isLoading: false,
  error: null,

  getAllItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetchCart();
      console.log(res.cartItem);
      set({ cartItems: res.cartItem, isLoading: false });

      console.log(res.data);
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addItem: async (productId, quantity = 1) => {
    set({ isLoading: true });
    try {
      const res = await addToCart(productId, quantity);

      //so it will find if that product already exist
      const existingItem = get().cartItems.find(
        (item) => item.productId === productId
      );

      //if exisitng then just increase its quantity
      if (existingItem) {
        set({
          cartItems: get().cartItems.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        });
        //just put it inside the cartItems
      } else {
        set({
          cartItems: [...get().cartItems, res.cartItem],
        });
      }

      set({ isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateItemQuantity: async (cartId, quantity) => {
    try {
      await updateCartQuantity(cartId, quantity);
      set({
        cartItems: get().cartItems.map((item) =>
          item.id === cartId ? { ...item, quantity } : item
        ),
      });
    } catch (error) {
      set({ error: error.message });
    }
  },

  deleteItem: async (cartId) => {
    try {
      await deleteItem(cartId);
      set({
        cartItems: get().cartItems.filter((item) => item.id !== cartId),
      });
    } catch (error) {
      set({ error: error.message });
    }
  },
}));
