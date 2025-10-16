    import { create } from "zustand";
    import { axiosInstance } from "../lib/axios";
    import toast from "react-hot-toast";





    /**
     * Creating each Data interface 
     */

    // Interface for User data
    interface User {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        profilePic?: string;
    }

    // Interface for Signup data
    interface SignupData {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }
    // Interface for Login data
    interface LoginData {
        email: string;
        password: string;
    }

    // Interface for Update data 
    interface UpdateProfileData {
        firstName?: string;
        lastName?: string;
        email?: string;
        password?: string;
        profilePic?: string;
    }

    // Interface for AuthState
    interface AuthState {
        authUser?: User | null;
        isCheckingAuth: boolean;
        checkAuth: () => void;
        isSigningUp: boolean;
        signup: (data: SignupData) => Promise<void>;
        isLoggingIn: boolean;
        login: (data: LoginData) => Promise<void>;
        logout: () => Promise<void>;
        updateProfile: (data: UpdateProfileData) => Promise<void>
    }


    export const useAuthStore = create<AuthState>((set) => ({
        authUser: null,
        isCheckingAuth: true,
        isSigningUp : false,
        isLoggingIn: false,
        onlineUsers: [],

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
            set({isSigningUp : true});
            try {
                const res = await axiosInstance.post('/auth/signup', data);
                set({authUser: res.data});

                // Let's make some Toast!
                toast.success(`${res.data.firstName}'s account created successfully!`);

                } catch (error: any) {
                toast.error(error.response?.data.message || "Sign up failed");
            } finally {
                set({isSigningUp : false});
            }
        },

        login: async(data) => {
            set({isLoggingIn: true});
            try {
                const res = await axiosInstance.post('/auth/login', data)
                set({authUser: res.data});

                // Let's make some toast!
                toast.success("Log in successfully!");
            } catch (error: any) {
                toast.error(error.response?.data.message);
            } finally {
                set({isLoggingIn: false});
            }
        },
        logout: async () => {
            try {
                axiosInstance.post('/auth/logout');
                set({authUser: null});
                toast.success("Log out successfully");
            } catch (error) {
                toast.error("Error logging out");
                console.error("Logout Error:", error);
            }
        },
        updateProfile: async (data) => {
            try {
                const res = await axiosInstance.put('/auth/update-profile', data);
                set({authUser: res.data});
                toast.success("Profile updated successfully");
            } catch (error: any) {
                toast.error(error.response.data.message || "Update Failed");
                console.error("Update Profile Error:", error);
            }
        }
        
    }));

