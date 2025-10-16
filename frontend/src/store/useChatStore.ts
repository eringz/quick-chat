import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";


interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePic?: string;    
}

// Interface for ChatState
interface ChatState {
    isSoundEnabled: boolean;
    toggleSound: () => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    chats: User[];
    isUsersLoading: boolean;
    getMyChatPartners: () => Promise<void>;
}


export const useChatStore = create<ChatState>((set, get) => ({
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled") ?? "false"),
    activeTab: "chats",
    chats: [],
    isUsersLoading: false,

    setActiveTab: (tab) => set({activeTab: tab}),
    toggleSound: () => {
        const newSoundValue = !get().isSoundEnabled;
        localStorage.setItem("isSoundEnabled", JSON.stringify(newSoundValue));
        set({ isSoundEnabled: newSoundValue});
    },
    getMyChatPartners: async () => {
        set({isUsersLoading: true});
        try {
            const res = await axiosInstance.get("/messages/chats");
            set({chats: res.data});
        } catch (error: any) {
            toast.error(error.response?.data.message);
        } finally {
            set({isUsersLoading: false});
        }
    },


}));