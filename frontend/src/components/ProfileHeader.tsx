import React from "react";

const ProfileHeader: React.FC = () => {
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
                            John Ronald Santos
                        </h3>
                        <p className="text-slate-400 text-xs">Online</p>
                    </div>
                </div>
            </div>
	    </div>
    );
};

export default ProfileHeader;
