import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { XIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { formatTime } from "../lib/formatTime";

const ChatHeader: React.FC = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const isOnline  = onlineUsers.includes(selectedUser!._id);
    const [time, setTime] = useState(formatTime(selectedUser!.lastSeen));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(formatTime(selectedUser!.lastSeen));
        }, 60 * 1000);

        return () => clearInterval(interval);
    }, [selectedUser!.lastSeen])

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
                <div className={`avatar ${isOnline ? "online" : "offline"}`}>
                    <div className="w-12 rounded-full">
                        <img src={selectedUser?.profilePic || "avatar.png" } alt={selectedUser?.firstName} />
                    </div>
                </div>
                <div>
                    <h3>{selectedUser?.firstName} {selectedUser?.lastName}</h3>
                    <p className="text-slate-400 text-sm">{isOnline ? "Online" : `Last seen ${time}`}</p>
                </div>
            </div>
            <button onClick={() => setSelectedUser(null)}>
                <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"/>
            </button>
        </div>
    )
}

export default ChatHeader;