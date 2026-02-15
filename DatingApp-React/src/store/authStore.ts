import { create } from "zustand";
import axios from "axios";

export interface User {
  id: number;
  username: string;
  knownAs: string;
  gender: string;
  dob: string;
  city: string;
  country: string;
  photoUrl: string;
  bio?: string;
  interests?: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
}

const API_URL = "http://localhost:5000/api";

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  isLoading: false,

  login: async (username: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        userName: username,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      set({ token, user, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (data: any) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API_URL}/auth/register`, data);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      set({ token, user, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    set({ token: null, user: null });
  },

  updateUser: async (data: Partial<User>) => {
    set({ isLoading: true });
    try {
      const response = await axios.put(
        `${API_URL}/users/${useAuthStore.getState().user?.id}`,
        data,
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      set({ user: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));

// Set auth header on startup
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
