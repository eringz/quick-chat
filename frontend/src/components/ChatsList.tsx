import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

const ChatsList: React.FC = () => {
    const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } = useChatStore();
    // const { onlineUsers } = useAuthStore();

    useEffect(() => {
        getMyChatPartners();
    }, [getMyChatPartners]);

    if (isUsersLoading) return <UsersLoadingSkeleton />
    if (chats.length === 0) return <NoChatsFound />


    return (
        <>
            {chats.map(chat => {
                return <div
                    key={chat._id}
                    className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
                    onClick={() => setSelectedUser(chat)}
                >
                    <div className="flex items-center gap-3">
                        <div className="avatar offline">
                            <div className="size-12 rounded-full">
                                <img src={chat?.profilePic || "/avatar.png"} alt={chat.firstName} />
                            </div>
                        </div>
                        <h4 className="text-slate-200 font-medium truncate">{chat.firstName} {chat.lastName}</h4>
                    </div>
                </div>
            })}
        </>
    )
}

export default ChatsList;