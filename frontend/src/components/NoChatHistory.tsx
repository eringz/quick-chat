import { MessageCircleIcon } from "lucide-react";
import React from "react";

interface NoChatHistoryPlaceholderProps {
    name?: string;
}

const greetings = [
    {greet: "Say Hello"},
    {greet: "How are you?"},
    {greet: "Meet up soon?"},
];

const NoChatHistoryPlaceholder: React.FC<NoChatHistoryPlaceholderProps> = ({name}) => {
    return (
        <div className="p-6 h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 mb-5 flex items-center justify-center bg-gradient-to-br from-cyan-500/20 to-cyan-400/10 rounded-full">
                <MessageCircleIcon className="size-8 text-cyan-400" />
            </div>
            <h3 className="mb-3 text-lg font-medium text-slate-200">Start your conversation with {name}</h3>
            <div className="max-w-md mb-5 flex flex-col space-y-3">
                <p className="text-slate-400 text-sm">This is the beginning of your conversation. Send a message to start chatting!</p>
            <div className="mx-auto h-px w-32 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
                {greetings.map(({greet}, index) => {
                    return <button key={index} className="chat-greet-btn-opt">{greet}</button>
                })}
            </div>
        </div>
    )
}

export default NoChatHistoryPlaceholder;


