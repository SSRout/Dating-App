import { create } from "zustand";
import axios from "axios";

export interface Member {
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

export interface MembersState {
  members: Member[];
  selectedMember: Member | null;
  isLoading: boolean;
  pagination: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
  };
  fetchMembers: (page?: number) => Promise<void>;
  fetchMember: (id: number) => Promise<void>;
  likeUser: (id: number) => Promise<void>;
  unlikeUser: (id: number) => Promise<void>;
}

const API_URL = "http://localhost:5000/api";

export const useMembersStore = create<MembersState>((set) => ({
  members: [],
  selectedMember: null,
  isLoading: false,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    pageSize: 12,
    totalCount: 0,
  },

  fetchMembers: async (page = 1) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(
        `${API_URL}/users?pageNumber=${page}&pageSize=12`,
      );
      set({
        members: response.data,
        pagination: {
          currentPage: page,
          totalPages: 5,
          pageSize: 12,
          totalCount: response.data.length,
        },
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  fetchMember: async (id: number) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${API_URL}/users/${id}`);
      set({ selectedMember: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  likeUser: async (id: number) => {
    try {
      await axios.post(`${API_URL}/likes/${id}`);
    } catch (error) {
      throw error;
    }
  },

  unlikeUser: async (id: number) => {
    try {
      await axios.delete(`${API_URL}/likes/${id}`);
    } catch (error) {
      throw error;
    }
  },
}));
