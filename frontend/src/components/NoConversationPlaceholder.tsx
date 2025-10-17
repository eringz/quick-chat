import { MessageCircleIcon } from "lucide-react";
import React from "react";

const NoConversationPlaceholder: React.FC = () => {
    return (
        <div className="p-6 h-full flex flex-col items-center justify-center text-center">
            <div className="mb-6 size-20 bg-cyan-500/20 rounded-full flex items-center justify-center">
                <MessageCircleIcon className="size-10 text-cyan-400" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-slate-200">Select a conversation</h3>
            <p className="max-w-md text-slate-400">
                Choose a contact from the sidebar to start chatting or continue a previous converssation.
            </p>
        </div>
    )
}

export default NoConversationPlaceholder;