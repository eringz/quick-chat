import { create } from "zustand";

interface AuthState {
    authUser: {name: string; _id: number; age: number},
    isLoggedIn: boolean,
    isLoading: boolean,
    login: () => void,
}


export const useAuthStore = create<AuthState>((set) => ({
    authUser: {name: 'john', _id:123, age:25},
    isLoggedIn: false,
    isLoading: false,

    login: () => {
        console.log('We just logged in');
        set({isLoggedIn: true});
    }
}));


//3:46