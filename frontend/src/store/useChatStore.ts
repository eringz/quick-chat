import { create } from "zustand";

// Interface for ChatState
interface ChatState {
    isSoundEnabled: boolean;
    toggleSound: () => void;
}


export const useChatStore = create<ChatState>((set, get) => ({
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled") ?? "false"),

    toggleSound: () => {
        const newSoundValue = !get().isSoundEnabled;
        localStorage.setItem("isSoundEnabled", JSON.stringify(newSoundValue));
        set({ isSoundEnabled: newSoundValue});
    },


}));