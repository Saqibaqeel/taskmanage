import { create } from "zustand";
import axiosInstance from "../utility/axios";
import toast from "react-hot-toast";

const useBoard = create((set) => ({
  boards: [],
  isLoading: false,

  fetchBoards: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/board/allboards");

      set({ boards: res.data.boards || res.data });
    } catch (error) {
      toast.error("Failed to fetch boards");
    } finally {
      set({ isLoading: false });
    }
  },

  createBoard: async (data) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.post("/board/create-boards", data);

      set((state) => ({
        boards: [...state.boards, res.data.board || res.data],
      }));

      toast.success("Board created");
    } catch (error) {
      toast.error("Failed to create board");
    } finally {
      set({ isLoading: false });
    }
  },

  updateBoard: async (id, data) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.put(`/board/boards/${id}`, data);

      set((state) => ({
        boards: state.boards.map((b) =>
          b._id === id ? res.data.board || res.data : b
        ),
      }));

      toast.success("Board updated");
    } catch (error) {
      toast.error("Failed to update board");
    } finally {
      set({ isLoading: false });
    }
  },

  deleteBoard: async (id) => {
    try {
      set({ isLoading: true });
      await axiosInstance.delete(`/board/boards/${id}`);

      set((state) => ({
        boards: state.boards.filter((b) => b._id !== id),
      }));

      toast.success("Board deleted");
    } catch (error) {
      toast.error("Failed to delete board");
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useBoard;
