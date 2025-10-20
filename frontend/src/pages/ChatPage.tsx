import React, { useEffect, useState } from "react";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactsList from "../components/ContactsList";
import { useChatStore } from "../store/useChatStore";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

const ChatPage: React.FC = () => {
  const { activeTab, selectedUser } = useChatStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleSize = () => setIsMobile(window.innerWidth < 768);
    handleSize();

    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, []);

  const showLeftSide = !isMobile || (isMobile && !selectedUser);
  const showRightSide = !isMobile || (isMobile && selectedUser);
  return (
	<div className="relative w-full max-w-6xl h-[800px]">
	  <BorderAnimatedContainer className="">
      {/**Left Side */}
      {/* <div className="w-80 bg-slate-800/50 backdrop-blur-sm"> */}
      <div className={`w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col transition-all ease-in duration-1000 ${showLeftSide ? "block" : "hidden"}`}>
      {/* <div className={`w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col transition-all duration-1000 ${showLeftSide ? "translate-x-1/2" : "translate-x-0"}`}> */}
        <ProfileHeader />
        <ActiveTabSwitch />
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {activeTab === "chats" ? <ChatsList /> : <ContactsList />}
        </div>
      </div>

      {/** Right Side */}
      {/* <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm"> */}
      <div className={`flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm transition-all duration-1000 ease-in-out ${showRightSide ? "flex" : "hidden"}`}>
      {/* <div className={`flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm transition-all duration-1000 ${showRightSide ? "translate-x-0" : "translate-x-full"}`}> */}
        {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
      </div>
    </BorderAnimatedContainer>
	</div>
  );
};

export default ChatPage;