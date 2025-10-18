import React, {useState } from "react";
import { Link } from "react-router";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { LoaderIcon, LockIcon, MailIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore"

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({email: "", password:""});
  const {login, isLoggingIn} = useAuthStore();
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    login(formData);
  }

  const inputs = [
    {
      label: "Email",
      variable: "email",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value}),
      type: "email",
      icon: <MailIcon className="auth-input-icon" />
    },
    {
      label: "Password",
      variable: "password",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, password: e.target.value}),
      type: "password",
      icon: <LockIcon className="auth-input-icon"/>
    }
  ];
  
  return (
	<div className="w-full p-4 flex items-center justify-center bg-slate-900" >
	  <div className="w-full max-w-6xl md:h-fit h-fit relative">
      <BorderAnimatedContainer>
        <div className="w-full flex flex-col md:flex-row">
          {/** Left Side Form */}
          <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
            <div className="w-full max-w-md">
              {/** Heading Text */}
              <div className="text-center mb-8">
                <img src="./quick-chat-logo.png" alt="logo for quick chat" className="w-[240px] mx-auto"/>
                <h2 className="mb-6 text-3xl text-slate-200 font-bold">Log In</h2>
                <p></p>
              </div>
              {/** Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {inputs.map((input, index) => {
                  return <div key={index}>
                    <div className="relative">
                      {input.icon}
                      <input 
                        type={input.type}
                        value={formData[input.variable as keyof typeof formData]}
                        onChange={input.onChange}
                        className="input"
                        placeholder={input.label}
                      />
                    </div>
                  </div>
                })}
                  <button type="submit" className="auth-btn hover:animate-pulse" disabled={isLoggingIn}>
                    {isLoggingIn ? (<LoaderIcon className="w-full h-5 text-center animate animate-spin"/>) : ("Login")}
                  </button>
              </form>
              {/** If don't have account */}
              <div className="mt-6 text-center">
                <span className="mr-2">Need an account</span>
                <Link to="/signup" className="auth-link">Signup</Link>
              </div>
            </div>  
          </div>
          {/** Right Side */}
          <div className="hidden md:w-1/2 md:flex item-center justify-center p-6 bg-gradien-to-bl from-slate-800/20 via-transparent to-slate-800/20">
            <div>
              <img 
                src="/quick-chat-logo.png"
                alt="quick chat logo"
                className="w-full h-auto object-contain"
              />
              <div className="mt-6 text-center">
                <h3 className="text-xl font-medium text-cyan-400">Let's Chat Quick</h3>
                <div className="mt-4 flex justify-center gap-4">
                  <span className="auth-badge">Free</span>
                  <span className="auth-badge">Easy Setup</span>
                  <span className="auth-badge">Exciting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BorderAnimatedContainer>
    </div>

	</div>
  );
};

export default LoginPage;

//4:21