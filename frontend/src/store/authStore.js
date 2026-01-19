import { create } from 'zustand'
import axiosInstance from '../utility/axios'
import toast from 'react-hot-toast'

const useAuth = create((set) => ({
  authUser: null,
  userOnboarded: false,
  isLoading: false,
  isCheckingAuth: true,
  users: [],

  // ✅ CHECK AUTH ON APP LOAD
  checkAuth: async () => {
    set({ isCheckingAuth: true })

    try {
      const res = await axiosInstance.get('/auth/check')

      if (res?.data?.user) {
        set({
          authUser: res.data.user,
          userOnboarded: true
        })
      } else {
        set({
          authUser: null,
          userOnboarded: false
        })
      }
    } catch (error) {
      set({
        authUser: null,
        userOnboarded: false
      })
    } finally {
      set({ isCheckingAuth: false })
    }
  },

  // ✅ SIGNUP
  signup: async (data) => {
    set({ isLoading: true })

    try {
      const res = await axiosInstance.post('/auth/signUp', data)

      set({
        authUser: res.data.user,
        userOnboarded: true
      })

      toast.success('Account created')
      return true
    } catch (error) {
      toast.error('Signup failed')
      return false
    } finally {
      set({ isLoading: false })
    }
  },

  // ✅ LOGIN
  login: async (data) => {
    set({ isLoading: true })

    try {
      const res = await axiosInstance.post('/auth/login', data)

      set({
        authUser: res.data.user,
        userOnboarded: true
      })

      toast.success('Login success')
      return true
    } catch (error) {
      toast.error('Login failed')
      return false
    } finally {
      set({ isLoading: false })
    }
  },

  // ✅ LOGOUT
  logout: async () => {
    set({ isLoading: true })

    try {
      await axiosInstance.get('/auth/logout')

      set({
        authUser: null,
        userOnboarded: false
      })

      toast.success('Logout success')
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      set({ isLoading: false })
    }
  },

  // ✅ GET ALL USERS
  getAllUsers: async () => {
    set({ isLoading: true })

    try {
      const res = await axiosInstance.get('/auth/all-users')
      set({ users: res.data.users })
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      set({ isLoading: false })
    }
  }
}))

export default useAuth
