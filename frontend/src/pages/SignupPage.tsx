import { useState } from "react";
import { LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router";


import BorderAnimatedContainer from "../components/BorderAnimatedContainer";





const SignupPage: React.FC = () => {
	const [formData, setFormData] = useState({firstName: "", lastName: "", email: "", password: ""});
	const {signup, isSigningUp} = useAuthStore();
	
	const handleSubmit = (e : any) => {
		e.preventDefault();
		signup(formData);
	}
	const inputs = [
		{
			label: "First Name",
			variable: "firstName",
			onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, firstName: e.target.value}),
			type: "text",
			icon: <UserIcon className="auth-input-icon" />,
		},
		{
			label: 'Last Name',
			variable: "lastName",
			onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, lastName: e.target.value}),
			type: "text",
			icon: <UserIcon className="auth-input-icon" />,
		},
		{
			label: 'Email',
			variable: "email",
			onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value}),
			type: "email",
			icon: <MailIcon className="auth-input-icon" />
		},
		{
			label: 'password',
			variable: "password",
			onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, password: e.target.value}),
			type: "password",
			icon: <LockIcon className="auth-input-icon" />
		},
	];
	
	return (
		<div className="w-full p-4  flex items-center justify-center  bg-slate-900">
			<div className="w-full max-w-6xl md:h-fit h-fit relative">
				<BorderAnimatedContainer>
					<div className="w-full flex flex-col md:flex-row">
						{/** Form in left side */}
						<div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
							<div className="w-full max-w-md">
								{/** Heading Text */}
								<div className="text-center mb-8">
									{/** It should be imported from "lucid-react" */}
									{/* <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />  */} 
									<img src="./quick-chat-logo.png" className="w-[240px] mx-auto"/>
									<h2 className="mb-6 text-3xl text-slate-200 font-bold">Create an Account</h2>
									<p>Signup for a new account</p>
								</div>

								{/** Form */}
								<form onSubmit={handleSubmit}  className="space-y-6"> {/** onSubmit={handleSubmit} */}
									{inputs.map(input => {
										return <div>
											{/* <label className="auth-input-label">{input.label}</label> */}
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
									
									{/** Submit button */}
									<button 
										className="auth-btn" 
										type="submit" 
										disabled={isSigningUp }
									>
										{isSigningUp ? (<LoaderIcon className="w-full h-5 text-center animate-spin"/>) : ("Create Account")}
									</button>
								</form>
								<div className="mt-6 text-center">
									<span className="mr-2">Already have an account?</span>
									<Link to="/login" className="auth-link">Login</Link>
								</div>
							</div>
						</div>
						{/** Form in right side  */}
						<div
							className="hidden md:w-1/2 md:flex item-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent"
						>
							<div>
								<img 
									src="/quick-chat.png"
									alt="quick chat logo and slogan"
									className="w-full h-auto object-contain"
								/>	
								<div className="mt-6 text-center">
									<h3 className="text-xl font-medium text-cyan-400">Let's Chat Quick</h3>
									<div className="mt-4 flex justify-center gap-4">
										<span className="auth-badge">Free</span>
										<span className="auth-badge">Easy Setup</span>
										<span className="auth-badge">Private</span>
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

export default SignupPage;
