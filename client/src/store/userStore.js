import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getToken } from "../utils/helpers";
import {
  signup,
  signin,
  getUserProfile,
  updateUser,
  updateUserAvatar,
  getUserPoems,
  getUserLikedPoems,
} from "../api/api";

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: false,

        setUser: (updatedUser) => set({ user: updatedUser }),

      initializeAuth: async () => {
        const token = getToken();

        if (token) {
          try {
            set({ loading: true });
            const user = await getUserProfile("me");
            set({
              user: {
                id: user._id,
                name: user.name,
                email: user.email,
                bio: user.bio || "",
                profilePic: user.profilePic || "",
              },
              isAuthenticated: true,
            });
          } catch (error) {
            set({ user: null, isAuthenticated: false });
            localStorage.removeItem("token");
          } finally {
            set({ loading: false });
          }
        }
      },

      signup: async (userData) => {
        set({ loading: true });
        try {
          const response = await signup(userData);
          localStorage.setItem("token", response.token);
          set({
            user: {
              id: response.user.id,
              name: response.user.name,
              email: response.user.email,
              bio: response.user.bio || "",
              profilePic: response.user.profilePic || "",
            },
            isAuthenticated: true,
          });
          return response;
        } catch (error) {
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      signin: async (userData) => {
        set({ loading: true });
        try {
          const response = await signin(userData);
          localStorage.setItem("token", response.token);
          set({
            user: {
              id: response.user.id,
              name: response.user.name,
              email: response.user.email,
              bio: response.user.bio || "",
              profilePic: response.user.profilePic || "",
            },
            isAuthenticated: true,
          });
          return response;
        } catch (error) {
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      updateUser: async (userId, userData) => {
        set({ loading: true });
        try {
          const updatedUser = await updateUser(userId, userData);
          set({
            user: {
              id: updatedUser._id,
              name: updatedUser.name,
              email: updatedUser.email,
              bio: updatedUser.bio || "",
              profilePic: updatedUser.profilePic || "",
            },
          });
          return updatedUser;
        } catch (error) {
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      updateUserAvatar: async (userId, avatarFile) => {
        set({ loading: true });
        try {
          const updatedUser = await updateUserAvatar(userId, avatarFile);
          set({
            user: {
              id: updatedUser._id,
              name: updatedUser.name,
              email: updatedUser.email,
              bio: updatedUser.bio || "",
              profilePic: updatedUser.profilePic || "",
            },
          });
          return updatedUser;
        } catch (error) {
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      fetchUserProfile: async (userId) => {
        try {
          const user = await getUserProfile(userId);
          return user;
        } catch (error) {
          throw error;
        }
      },

      fetchUserPoems: async (userId) => {
        try {
          const poems = await getUserPoems(userId);
          return poems;
        } catch (error) {
          throw error;
        }
      },

      fetchUserLikedPoems: async (userId) => {
        try {
          const poems = await getUserLikedPoems(userId);
          return poems;
        } catch (error) {
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useUserStore;
