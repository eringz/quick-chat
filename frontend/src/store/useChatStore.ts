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
    allContacts: User[];
    getAllContacts: () => Promise<void>;
    selectedUser?: User | null;
    setSelectedUser: (user: User | null) => void; 
}


export const useChatStore = create<ChatState>((set, get) => ({
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled") ?? "false"),
    activeTab: "chats",
    chats: [],
    isUsersLoading: false,
    allContacts: [],
    selectedUser: null,

    setActiveTab: (tab) => set({activeTab: tab}),
    setSelectedUser: (selectedUser) => set({ selectedUser }),
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
    getAllContacts: async () => {
        set({isUsersLoading: true});
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({ allContacts: res.data})
        } catch (error: any) {
            toast.error(error.response.data.message);
            console.error("Contacts Error:", error);
        } finally {
            set({isUsersLoading: false});
        }
    }


}));