import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
}

interface SignupData {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
}
interface AuthState {
    authUser?: User | null;
    isCheckingAuth: boolean;
    checkAuth: () => void,
    isSignup: boolean;
    signup: (data: SignupData) => Promise<void>
}


export const useAuthStore = create<AuthState>((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSignup: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            set({authUser: res.data});
        } catch (error) {
            console.error("Error in authCheck:", error);
            set({authUser: null});
        } finally {
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        set({isSignup: true})
        try {
            const res = await axiosInstance.post('/auth/signup', data);
            set({authUser: res.data});

            // Let's make some Toast!
            toast.success(`${res.data}'s account created successfully!`);

        } catch (error) {
            toast.error(`Signup Error: ${error}`);
        } finally {
            set({isSignup: false});
        }
    }
}));


//4:03