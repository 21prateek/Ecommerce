import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance.js";

export const useAuthStore = create((set) => ({
  authUser: null,
  isLogIn: false,
  isSignUp: false,
  isLogOut: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/api/v1/auth/check");
      set({ authUser: res.data.user });
    } catch (error) {
      console.log("Error while checking auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSignUp: true });
    try {
      const res = await axiosInstance.post("/api/v1/auth/signup", data);
      set({ authUser: res.data.user });
    } catch (error) {
      console.log("Error while signup:", error);
      set({ authUser: null });
    } finally {
      set({ isSignUp: false });
    }
  },

  logIn: async (data) => {
    set({ isLogIn: true });
    try {
      const res = await axiosInstance.post("/api/v1/auth/login", data);
      set({ authUser: res.data.user });
      return { status: true };
    } catch (error) {
      console.log("Error while login:", error);
      const errorMessage =
        error?.response?.data?.message || "Login failed. Try again.";
      set({ authUser: null });
      return { status: false, message: errorMessage };
    } finally {
      set({ isLogIn: false });
    }
  },

  logOut: async () => {
    set({ isLogOut: true });
    try {
      await axiosInstance.post("/api/v1/auth/logout");
      set({ authUser: null });
    } catch (error) {
      console.log("Error while logout:", error);
    } finally {
      set({ isLogOut: false });
    }
  },

  googleCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data.user });

      return { success: true };
    } catch (error) {
      console.log("Error while Google check:", error);
      set({ authUser: null });
      return { success: false };
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  googleLogin: async () => {
    window.location.href = "http://localhost:8080/auth/google";
  },

  googleLogOut: async () => {
    try {
      await axiosInstance.get("/auth/logout");
      set({ authUser: null });
    } catch (error) {
      console.log("Error while Google logout:", error);
    }
  },
}));
