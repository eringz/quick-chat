import React, { useRef, useState } from "react";
import { LogOutIcon, Volume2Icon, VolumeOffIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3"); 

const ProfileHeader: React.FC = () => {
    const { logout, authUser, updateProfile } = useAuthStore(); 
    const { isSoundEnabled, toggleSound } = useChatStore();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null); 

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        const reader = new FileReader();
        console.log(reader);

        reader.readAsDataURL(file);

        reader.onloadend = async () => {
            if (typeof reader.result === "string") {
                const base64Image = reader.result;
                setSelectedImage(base64Image);
                await updateProfile({profilePic: base64Image})
            }   
        }
    }   

    

    return (
	    <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/** Avatar */}
                    <div className="avatar online">
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="size-14 rounded-full overflow-hidden relative group"
                        >
                            <img 
                                src={selectedImage || authUser?.profilePic  || "/avatar.png"}
                                alt="user photo"
                                className="size-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <span className="text-xs">Change</span>
                            </div>
                        </button>
                        <input 
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </div>
                    {/** Username and online text */}
                    <div>
                        <h3 className="text-slate-200 max-w-[180px] font-medium text-base truncate">
                            {authUser ? authUser.firstName : "Our"} {authUser ? authUser.lastName : "Guest"}
                        </h3>
                        <p className="text-slate-400 text-xs">Online</p>
                    </div>
                </div>
                    {/** Buttons */}
                    <div className="flex gap-4 items-center">
                        {/** Logout Button */}
                        {authUser && <button
                            className="text-slate-400 hover:text-slate-200 transition-colors"
                            onClick={logout}
                        >
                            <LogOutIcon className="size-5"/>
                        </button>
                        }
                        
                        {/** Sound Toggle Button */}
                        <button
                            className="text-slate-400 hover:text-slate-200 transition-colors"
                            onClick={() => {
                                mouseClickSound.currentTime = 0;
                                mouseClickSound.play().catch((error) => console.log("Audio play failed", error));
                                toggleSound();
                            }}
                        >
                            {/** for sound enabled / disabled */}
                            {isSoundEnabled ? (<Volume2Icon className="size-5" />) : (<VolumeOffIcon className="size-5" />)}  
                        </button>
                    </div>
            </div>
	    </div>
    );
};

export default ProfileHeader;
