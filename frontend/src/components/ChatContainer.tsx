import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistory";
import MessageInput from "./MessageInput";
import MessageLoadingSkeleton from "./MessageLoadingSkeleton";



const ChatContainer: React.FC = () => {
    const { getMessagesByUserId, selectedUser, messages, isMessagesLoading, subscribeToMessages, unsubscribeToMessages } = useChatStore();
    const { authUser } = useAuthStore();

    const messageEndRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        if (selectedUser?._id) {
            getMessagesByUserId(selectedUser._id ); 
            subscribeToMessages();
        }

        return () => unsubscribeToMessages();
    }, [getMessagesByUserId, selectedUser]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [messages]);


    return (
        <>
            <ChatHeader />
            <div className="flex-1 px-6 py-8 overflow-y-auto">
                {messages.length > 0 && !isMessagesLoading ? (
                    <div className="max-w-3xl mx-auto space-y-6">
                        {messages.map(message => {
                            return <div key={message?._id}
                                className={`chat ${message.senderId === authUser?._id ? "chat-end" : "chat-start"}`}    
                            >
                                <div className={`chat-bubble relative ${message.senderId === authUser?._id ? "bg-cyan-700/20 text-white" : "bg-slate-800 text-slate-200"}`}>
                                    {message?.image && (<img src={message.image} alt="Shared image" className="rounded-lg h-48 object-cover"   />)}
                                    {message?.text && <p className={`${message.senderId === authUser?._id ? "text-start" : "text-end"} `} >{message.text}</p>}
                                    <p className="text-xs mt-1 opacity-75 flex place-self-end gap-1">
                                        {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </p>
                                </div>
                            </div>
                        })}
                    </div>
                ) : isMessagesLoading ? (<MessageLoadingSkeleton />) : (
                    <NoChatHistoryPlaceholder name={selectedUser?.firstName} />
                )
                }
                <div ref={messageEndRef} />
            </div>
            <MessageInput />
        </>
    )
}

export default ChatContainer;