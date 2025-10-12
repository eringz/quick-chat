import { useState } from "react";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";





const SignupPage: React.FC = () => {
	const [formData, setFormData] = useState({firstName: "", lastName: "", email: "", password: ""});
	// const [signup, isSignUp] = useAuthStore();
	
	// const handleSubmit = (e : any) => {
	// 	console.log(e.target);
	// }
	const inputs = [
		{
			label: "First Name",
			variable: "firstName",
			onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, firstName: e.target.value}),
			type: "text",
		},
		{
			label: 'Last Name',
			variable: "lastName",
			onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, lastName: e.target.value}),
			type: "text",
		},
		{
			label: 'Email',
			variable: "email",
			onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value}),
			type: "email",
		},
		{
			label: 'password',
			variable: "password",
			onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, password: e.target.value}),
			type: "password",
		},
	];
	
	return (
		<div className="w-full p-4  flex items-center justify-center  bg-slate-900">
			<div className="w-full max-w-6xl md:h-[800px] h-[650px] relative">
				<BorderAnimatedContainer>
					<div className="w-full flex flex-col md:flex-row">
						{/** Form in left panel */}
						<div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
							<div className="w-full max-w-md">
								{/** Heading Text */}
								<div className="text-center mb-8">
									{/* <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" /> */}
									<img src="./quick-chat-log.png" className="w-[240px] mx-auto"/>
									<h2 className="mb-6 text-3xl text-slate-200 font-bold">Create an Account</h2>
									<p>Signup for a new account</p>
								</div>

								{/** Form */}
								<form  className="space-y-6"> {/** onSubmit={handleSubmit} */}
									{inputs.map(input => {
										return <div>
											<label className="auth-input-label">{input.label}</label>
											<div className="relative">
												<UserIcon className="auth-input-icon" />

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
									
									
								</form>
							</div>
						</div>
					</div>
				</BorderAnimatedContainer>
			</div>
		</div>
  	);
};

export default SignupPage;
