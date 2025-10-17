import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { XIcon } from "lucide-react";

const ChatHeader: React.FC = () => {
    const { selectedUser, setSelectedUser } = useChatStore();

    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setSelectedUser(null);
        } 
        window.addEventListener("keydown", handleEscKey);

        return () => window.removeEventListener("keydown", handleEscKey);
    }, [setSelectedUser]);
    
    return (
        <div className="max-h-[84px] px-6 flex flex-1 justify-between items-center bg-slate-800/50 border-b border-slate-700/50">
            <div className="flex items-center space-x-3">
                <div className="avatar online ">
                    <div className="w-12 rounded-full">
                        <img src={selectedUser?.profilePic || "avatar.png" } alt={selectedUser?.firstName} />
                    </div>
                </div>
                <div>
                    <h3>{selectedUser?.firstName} {selectedUser?.lastName}</h3>
                    <p className="text-slate-400 text-sm">Online</p>
                </div>
            </div>
            <button onClick={() => setSelectedUser(null)}>
                <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"/>
            </button>
        </div>
    )
}

export default ChatHeader;