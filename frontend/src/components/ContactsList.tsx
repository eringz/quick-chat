import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton  from "../components/UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

const ContactsList: React.FC = () => {
    const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();
    const { onlineUsers } = useAuthStore();
    useEffect(() => {
        getAllContacts();
    }, [getAllContacts]);

    if (isUsersLoading) return <UsersLoadingSkeleton />

    return (
        <>
            {allContacts.map((contact) => {
                return <div
                    className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
                    onClick={() => setSelectedUser(contact)}
                >
                    <div className="flex items-center gap-3">
                        <div className={`avatar ${onlineUsers?.includes(contact._id) ? "online" : "offline"} `}>
                            <div className="size-12 rounded-full">
                                <img src={contact?.profilePic || "/avatar.png"} alt={contact.firstName} />
                            </div>
                        </div>
                        <h4 className="text-slate-200 font-medium truncate">{contact.firstName} {contact.lastName}</h4>
                    </div>
                </div>
            })}      
        </>
    )
}

export default ContactsList;