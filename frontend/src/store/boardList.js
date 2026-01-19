import { create } from "zustand";
import axiosInstance from "../utility/axios";
import toast from "react-hot-toast";

const useBoardList = create((set) => ({
  boardLists: [],
  isLoading: false,

  fetchBoardLists: async (boardId) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get(`/boardList/${boardId}`);
      set({ boardLists: res.data.boardLists });
    } catch (error) {
      toast.error("Failed to fetch board lists");
    } finally {
      set({ isLoading: false });
    }
  },

  createBoardList: async (boardId, data) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.post(
        `/boardList/create/${boardId}`,
        data
      );
      set((state) => ({
        boardLists: [...state.boardLists, res.data.boardList],
      }));
      toast.success("Board list created");
    } catch (error) {
      toast.error("Failed to create board list");
    } finally {
      set({ isLoading: false });
    }
  },

  updateBoardList: async (boardListId, data) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.put(
        `/boardList/update/${boardListId}`,
        data
      );
      set((state) => ({
        boardLists: state.boardLists.map((bl) =>
          bl._id === boardListId ? res.data.boardList : bl
        ),
      }));
      toast.success("Board list updated");
    } catch (error) {
      toast.error("Failed to update board list");
    } finally {
      set({ isLoading: false });
    }
  },

  deleteBoardList: async (boardListId) => {
    try {
      set({ isLoading: true });
      await axiosInstance.delete(`/boardList/delete/${boardListId}`);
      set((state) => ({
        boardLists: state.boardLists.filter(
          (bl) => bl._id !== boardListId
        ),
      }));
      toast.success("Board list deleted");
    } catch (error) {
      toast.error("Failed to delete board list");
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useBoardList;
