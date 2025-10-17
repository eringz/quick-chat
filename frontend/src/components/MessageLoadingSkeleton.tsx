import React from "react";

const MessageLoadingSkeleton: React.FC<{}> = () => {
    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {[...Array(6)].map((_, index) => {
                return <div key={index} className={`chat ${index % 2 === 0 ? "chat-start" : "chat-end"} animate-pulse`}>
                    <div className="chat-bubble w-32 bg-slate-800 text-white" />                    
                </div>
            })}
        </div>
    )
}

export default MessageLoadingSkeleton;