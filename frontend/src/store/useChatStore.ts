import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePic?: string;    
    lastSeen: Date;
}

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  image?: string;
  createdAt: string;
  updatedAt?: string;
}

// Interface for sendMessage
interface sendMessageData {
    text: string;
    image: string;
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
    messages: Message[];
    isMessagesLoading: boolean;
    getMessagesByUserId: (userId: string) => Promise<void>;
    sendMessage: (messageData: sendMessageData) => Promise<void>;
    subscribeToMessages: () => void;
    unsubscribeToMessages: () => void;
}


export const useChatStore = create<ChatState>((set, get) => ({
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled") ?? "false"),
    activeTab: "chats",
    chats: [],
    isUsersLoading: false,
    allContacts: [],
    selectedUser: null,
    messages: [],
    isMessagesLoading: false,

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
    },

    getMessagesByUserId: async (userId) => {
        set({isMessagesLoading: true});

        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages: res.data});
        } catch (error: any) {
            toast.error(error.response?.data.message)
        } finally {
            set({isMessagesLoading: false})
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        const { authUser } = useAuthStore.getState();
        
        const tempId = `temp-${Date.now()}`;

        const optimisticMessage = {
            _id: tempId,
            senderId: authUser!._id,
            receiverId: selectedUser!._id,
            text: messageData.text,
            image: messageData.image,
            createdAt: new Date().toISOString(),
            isOptimimistic: true, // flag to identify optimistic message
        }

        // Immediate update of UI by adding the message
        set({messages: [...messages, optimisticMessage]});

        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser!._id}`, messageData);
            set({messages: messages.concat(res.data)})
        } catch (error: any) {
            set({messages: messages});
            toast.error(error.response?.data?.message || "Something went wrong");
        }     

    },

    subscribeToMessages: () => {
        const { selectedUser, isSoundEnabled } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket!.on("newMessage", (newMessage) => {
            const isMessageFromSelectedUser = newMessage.senderId === selectedUser._id;
            if (!isMessageFromSelectedUser) return;

            const currentMessages = get().messages;

            set({messages: [...currentMessages, newMessage]});

            if (isSoundEnabled) {
                const notificationSound = new Audio("/sounds/notification.mp3");
                notificationSound.currentTime = 0;
                notificationSound.play().catch(e => console.log("Audio play failed:", e));
            }
        })
    },

    unsubscribeToMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket!.off("newMessage");
    }

}));