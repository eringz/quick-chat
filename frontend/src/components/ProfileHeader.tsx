import React from "react";
import { LogOutIcon, Volume2Icon, VolumeOffIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3"); 

const ProfileHeader: React.FC = () => {
    const { logout, authUser } = useAuthStore(); 
    const { isSoundEnabled, toggleSound } = useChatStore();


    return (
	    <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/** Avatar */}
                    <div className="avatar online">
                        <button className="size-14 rounded-full overflow-hidden relative group">
                            <img 
                                src="/ron-ngayon.png"
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
                            className="hidden"
                        />
                    </div>
                    {/** Username and online text */}
                    <div>
                        <h3 className="text-slate-200 max-w-[180px] font-medium text-base truncate">
                            {authUser ? authUser.firstName : ""} {authUser ? authUser.lastName : ""}
                        </h3>
                        <p className="text-slate-400 text-xs">Online</p>
                    </div>
                </div>
                    {/** Buttons */}
                    <div className="flex gap-4 items-center">
                        {/** Logout Button */}
                        <button
                            className="text-slate-400 hover:text-slate-200 transition-colors"
                            onClick={logout}
                        >
                            <LogOutIcon className="size-5"/>
                        </button>
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
