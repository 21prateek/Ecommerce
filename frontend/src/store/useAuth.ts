import { create } from "zustand";
import { axiosInstance } from "../libs/axiosInstance";

interface dataProp {
  name: string;
  password: string;
  email: string;
}

export const useAuthStore = create((set) => ({
  authUser: null,
  isSignUp: false,
  isLogin: false,

  signUp: async (data: dataProp) => {
    set({ isSignUp: true });

    try {
      const res = await axiosInstance.post("/auth/signup", data);

      //   console.log(res.data);

      set({ authUser: res.data.user });
    } catch (error) {
      console.log("Error while signup ", error);
      set({ authUser: null });
    } finally {
      set({ isSignUp: false });
    }
  },

  login: async (data: dataProp) => {
    set({ isLogin: true });

    try {
      const res = await axiosInstance.post("/auth/login", data);

      //   console.log(res.data);
      set({ authUser: res.data.user });
    } catch (error) {
      console.log("Error while signup ", error);
      set({ authUser: null });
    } finally {
      set({ isSignUp: false });
    }
  },
}));
