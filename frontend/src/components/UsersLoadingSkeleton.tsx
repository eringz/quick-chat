import React from "react";

const UsersLoadingSkeleton: React.FC = () => {
    return (
        <div className="space-y-2">
            {[1, 2, 3].map(item => {
                return <div key={item} className="bg-slate-800/30 p-4 rounded-lg animate-pulse">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-slate-700 rounded-full"></div>
                        <div className="flex-1">
                            <div className="h-4 mb-2 w-3/4 bg-slate-700 rounded"></div>
                            <div className="h-3 mb-2 w-1/2 bg-slate-700 rounded"></div>
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}

export default UsersLoadingSkeleton;