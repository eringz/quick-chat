import { ImageIcon, SendIcon, XIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { useKeyboardSound } from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";

const MessageInput: React.FC = () => {
    const [imagePreview, setImagePreview] = useState("");
    const [text, setText] = useState("");
    const { playRandomKeyStrokeSound  } = useKeyboardSound();
    const { sendMessage, isSoundEnabled } = useChatStore();
   
    const fileInputRef = useRef<HTMLInputElement | null >(null);

    const handleMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!text.trim() && !imagePreview) return;
        if (isSoundEnabled) playRandomKeyStrokeSound();
        
        sendMessage({
            text: text.trim(),
            image: imagePreview || ""
        });

        setText("");
        setImagePreview("");

        // console.log("Sending message data:", { text, image: imagePreview });


        if (fileInputRef.current) fileInputRef.current.value = ""; 
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if(!file.type.startsWith("image/")) {
            toast.error("Please select an image file")
        }

        const reader = new FileReader();

        
        
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                setImagePreview(reader.result);
            }
        }
        reader.readAsDataURL(file);

    }

    const removeImage = () => {
        setImagePreview("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    return (
        <div className="p-4 border-t border-slate-700/50 w-100">
            {imagePreview && (
                <div className="max-w-3xl mx-auto mb-3 flex items-center">
                    <div className="relative">
                        <img 
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-slate-700"
                        />
                        <button
                            onClick={removeImage }
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex-item items-center justify-center text-slate-200 hover:bg-slate-700"
                        >
                            <XIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleMessage} className="max-w-3xl mx-auto flex space-x-4">
                <input 
                    type="text"
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                        isSoundEnabled && playRandomKeyStrokeSound();
                    }}
                    className="py-2 px-4 flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg"
                    placeholder="Type your message..."
                />
                <input 
                    type="file"
                    accept="image/*"
                    ref={fileInputRef} 
                    onChange={handleImageChange}
                    className="hidden"                  
                />
                <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`px-4 bg-slate-800/50 text-slate-400 hover:text-slate-200 rounded-lg transition-colors ${imagePreview ? "text-cyan-500" : ""} `}
                >
                    <ImageIcon className="w-5 h-5" />
                </button>
                <button
                    type="submit"
                    disabled={!text.trim() && !imagePreview}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-medium rounded-lg hover:from-cyan-500 hover:to-cyan-600 transition-colors"
                >
                    <SendIcon className="w-5 h-5" />
                </button>
            </form>
        </div> 
    )
}

export default MessageInput;