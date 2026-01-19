import { create } from "zustand";
import axiosInstance from "../utility/axios";
import toast from "react-hot-toast";


const useAdimStore=create((set)=>({
    isLoading:false,
    makeAdim:async(userId)=>{
        try {
            set({isLoading:true});  
            const res=await axiosInstance.put(`/admin/make-admin/${userId}`);
            toast.success(res.data.msg);
        } catch (error) {
            toast.error(error?.response?.data?.msg || "somthing went wrong");
        }
        finally{
            set({isLoading:false});
        }
    },
    makeEditor:async(userId)=>{
        try {   
            set({isLoading:true});
            const res=await axiosInstance.put(`/admin/make-editor/${userId}`);
            toast.success(res.data.msg);
        } catch (error) {
            toast.error(error?.response?.data?.msg || "somthing went wrong");
        }       
        finally{
            set({isLoading:false});
        }

    },
    makeViewer:async(userId)=>{
        try {
            set({isLoading:true});
            const res=await axiosInstance.put(`/admin/make-viewer/${userId}`);
            toast.success(res.data.msg);
        }

            catch (error) {
            toast.error(error?.response?.data?.msg || "somthing went wrong");
        }           
        finally{
            set({isLoading:false});
        }
    }
}))

export default useAdimStore;