import React from "react";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";

const ChatPage: React.FC = () => {
  return (
	<div className="relative w-full max-w-6xl h-[800px]">
	  <BorderAnimatedContainer>
      {/**Left Side */}
      <div className="w-80 bg-slate-800/50 backdrop-blur-sm">
          
      </div>

      {/** Right Side */}
      <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm justify-center text-center">
        Have a nice day Christina. Fighting!!! hahaha
      </div>
    </BorderAnimatedContainer>
	</div>
  );
};

export default ChatPage;