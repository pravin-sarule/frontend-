// import React from 'react';
// import { Link } from 'react-router-dom';

// const SignIn: React.FC = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
//         <form>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="Enter your password"
//             />
//           </div>
//           <div className="flex items-center justify-between">
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Sign In
//             </button>
//             <Link to="/signup" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
//               Don't have an account? Sign Up
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignIn;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Eye, EyeOff } from 'lucide-react';
// import { toast, ToastContainer } from 'react-toastify';
// import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { auth } from '../../firebase';
// import 'react-toastify/dist/ReactToastify.css';

// const provider = new GoogleAuthProvider();

// const SignIn: React.FC = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

//   const validate = () => {
//     const newErrors: typeof errors = {};
//     if (!email) newErrors.email = 'Email is required';
//     else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Invalid email format';
//     if (!password) newErrors.password = 'Password is required';
//     else if (password.length < 6) newErrors.password = 'Min 6 characters';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleManualLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validate()) {
//       toast.success('✅ Logged in successfully!', { position: 'top-center', autoClose: 2000 });
//       setTimeout(() => navigate('/dashboard'), 2100);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       toast.success(`👋 Welcome ${result.user.displayName}`, {
//         position: 'top-center',
//         autoClose: 2000,
//       });
//       setTimeout(() => navigate('/dashboard'), 2100);
//     } catch (error) {
//       console.error(error);
//       toast.error('❌ Google sign-in failed', { position: 'top-center' });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-4">
//       <ToastContainer />
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
//         <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-6">Sign In</h2>

//         <form onSubmit={handleManualLogin} className="space-y-5">
//           {/* Email */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email"
//               id="email"
//               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//               }`}
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//           </div>

//           {/* Password */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//               Password <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 id="password"
//                 className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                   errors.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//                 }`}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <div
//                 className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-blue-600"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </div>
//             </div>
//             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
//           >
//             Sign In
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="text-center my-4 text-sm text-gray-500">OR</div>

//         {/* Google Sign-In */}
//         <button
//           onClick={handleGoogleSignIn}
//           className="w-full py-2 px-6 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-semibold rounded-lg flex items-center justify-center space-x-2 transition"
//         >
//           <img
//             src="https://www.svgrepo.com/show/475656/google-color.svg"
//             alt="Google"
//             className="w-5 h-5"
//           />
//           <span>Sign in with Google</span>
//         </button>

//         {/* Link to Sign Up */}
//         <p className="text-center text-sm text-gray-600 mt-4">
//           Don’t have an account?{' '}
//           <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Eye, EyeOff } from 'lucide-react';
// import { toast, ToastContainer } from 'react-toastify';
// import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { auth } from '../../firebase';
// import 'react-toastify/dist/ReactToastify.css';

// const provider = new GoogleAuthProvider();

// interface SignInProps {
//   onAuth: () => void;  // ✅ receive onAuth prop
// }

// const SignIn: React.FC<SignInProps> = ({ onAuth }) => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

//   const validate = () => {
//     const newErrors: typeof errors = {};
//     if (!email) newErrors.email = 'Email is required';
//     else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Invalid email format';
//     if (!password) newErrors.password = 'Password is required';
//     else if (password.length < 6) newErrors.password = 'Min 6 characters';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleManualLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validate()) {
//       toast.success('✅ Logged in successfully!', { position: 'top-center', autoClose: 1500 });
//       localStorage.setItem('isAuthenticated', 'true'); // optional redundancy
//       onAuth(); // ✅ Set authenticated state
//       setTimeout(() => navigate('/dashboard'), 1600);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       toast.success(`👋 Welcome ${result.user.displayName}`, {
//         position: 'top-center',
//         autoClose: 1500,
//       });
//       localStorage.setItem('isAuthenticated', 'true');
//       onAuth(); // ✅ Ensure proper routing
//       setTimeout(() => navigate('/dashboard'), 1600);
//     } catch (error) {
//       console.error(error);
//       toast.error('❌ Google sign-in failed', { position: 'top-center' });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-4">
//       <ToastContainer />
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
//         <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-6">Sign In</h2>

//         <form onSubmit={handleManualLogin} className="space-y-5">
//           {/* Email */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email"
//               id="email"
//               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//               }`}
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//           </div>

//           {/* Password */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//               Password <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 id="password"
//                 className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                   errors.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//                 }`}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <div
//                 className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-blue-600"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </div>
//             </div>
//             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
//           >
//             Sign In
//           </button>
//         </form>

//         <div className="text-center my-4 text-sm text-gray-500">OR</div>

//         <button
//           onClick={handleGoogleSignIn}
//           className="w-full py-2 px-6 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-semibold rounded-lg flex items-center justify-center space-x-2 transition"
//         >
//           <img
//             src="https://www.svgrepo.com/show/475656/google-color.svg"
//             alt="Google"
//             className="w-5 h-5"
//           />
//           <span>Sign in with Google</span>
//         </button>

//         <p className="text-center text-sm text-gray-600 mt-4">
//           Don’t have an account?{' '}
//           <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignIn;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Eye, EyeOff } from 'lucide-react';
// import { toast, ToastContainer } from 'react-toastify';
// import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { auth } from '../../firebase';
// import 'react-toastify/dist/ReactToastify.css';

// const provider = new GoogleAuthProvider();

// interface SignInProps {
//   onAuth: () => void;
// }

// const SignIn: React.FC<SignInProps> = ({ onAuth }) => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

//   const API_BASE = 'http://localhost:8000/auth';

//   const validate = () => {
//     const newErrors: typeof errors = {};
//     if (!email) newErrors.email = 'Email is required';
//     else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Invalid email format';
//     if (!password) newErrors.password = 'Password is required';
//     else if (password.length < 6) newErrors.password = 'Min 6 characters';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleManualLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       const response = await fetch(`${API_BASE}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         const err = await response.json();
//         throw new Error(err.detail || 'Login failed');
//       }

//       const data = await response.json();
//       localStorage.setItem('token', data.access_token); // ✅ Store token
//       onAuth();
//       toast.success('✅ Logged in successfully!', { position: 'top-center', autoClose: 1500 });
//       setTimeout(() => navigate('/dashboard'), 1600);
//     } catch (err: any) {
//       toast.error(`❌ ${err.message}`, { position: 'top-center' });
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const idToken = await result.user.getIdToken(); // 🔑 Firebase token

//       const response = await fetch(`${API_BASE}/google-signin`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           full_name: result.user.displayName || '',
//           google_id: idToken,
//         }),
//       });

//       if (!response.ok) {
//         const err = await response.json();
//         throw new Error(err.detail || 'Google login failed');
//       }

//       const data = await response.json();
//       localStorage.setItem('token', data.access_token); // ✅ Store token
//       onAuth();
//       toast.success(`👋 Welcome ${result.user.displayName}`, {
//         position: 'top-center',
//         autoClose: 1500,
//       });
//       setTimeout(() => navigate('/dashboard'), 1600);
//     } catch (error: any) {
//       console.error(error);
//       toast.error(`❌ ${error.message || 'Google sign-in failed'}`, { position: 'top-center' });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-4">
//       <ToastContainer />
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
//         <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-6">Sign In</h2>

//         <form onSubmit={handleManualLogin} className="space-y-5">
//           {/* Email */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email"
//               id="email"
//               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//               }`}
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//           </div>

//           {/* Password */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//               Password <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 id="password"
//                 className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                   errors.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//                 }`}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <div
//                 className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-blue-600"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </div>
//             </div>
//             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
//           >
//             Sign In
//           </button>
//         </form>

//         <div className="text-center my-4 text-sm text-gray-500">OR</div>

//         <button
//           onClick={handleGoogleSignIn}
//           className="w-full py-2 px-6 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-semibold rounded-lg flex items-center justify-center space-x-2 transition"
//         >
//           <img
//             src="https://www.svgrepo.com/show/475656/google-color.svg"
//             alt="Google"
//             className="w-5 h-5"
//           />
//           <span>Sign in with Google</span>
//         </button>

//         <p className="text-center text-sm text-gray-600 mt-4">
//           Don’t have an account?{' '}
//           <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignIn;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Eye, EyeOff } from 'lucide-react';
// import { toast, ToastContainer } from 'react-toastify';
// import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { auth } from '../../firebase';
// import 'react-toastify/dist/ReactToastify.css';

// const provider = new GoogleAuthProvider();

// interface SignInProps {
//   onAuth: () => void;
// }

// const SignIn: React.FC<SignInProps> = ({ onAuth }) => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

//   const API_BASE = 'http://localhost:8000/auth';

//   const validate = () => {
//     const newErrors: typeof errors = {};
//     if (!email) newErrors.email = 'Email is required';
//     else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Invalid email format';
//     if (!password) newErrors.password = 'Password is required';
//     else if (password.length < 6) newErrors.password = 'Min 6 characters';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleManualLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       const response = await fetch(`${API_BASE}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         const err = await response.json();
//         throw new Error(err.detail || 'Login failed');
//       }

//       const data = await response.json();
//       localStorage.setItem('token', data.access_token); // ✅ Store JWT
//       onAuth();
//       toast.success('✅ Logged in successfully!', { position: 'top-center', autoClose: 1500 });
//       setTimeout(() => navigate('/dashboard'), 1600);
//     } catch (err: any) {
//       toast.error(`❌ ${err.message}`, { position: 'top-center' });
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const idToken = await result.user.getIdToken();
//       const fullName = result.user.displayName || 'Google User';

//       const response = await fetch(`${API_BASE}/google-signin`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           full_name: fullName,
//           google_id: idToken,
//         }),
//       });

//       if (!response.ok) {
//         const err = await response.json();
//         console.error("Google Sign-In API error:", err);
//         throw new Error(err.detail || 'Google login failed');
//       }

//       const data = await response.json();
//       localStorage.setItem('token', data.access_token); // ✅ Store JWT
//       onAuth();
//       toast.success(`👋 Welcome ${fullName}`, {
//         position: 'top-center',
//         autoClose: 1500,
//       });
//       setTimeout(() => navigate('/dashboard'), 1600);
//     } catch (error: any) {
//       console.error("Google sign-in failed:", error);
//       toast.error(`❌ ${error.message || 'Google sign-in failed'}`, {
//         position: 'top-center',
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-4">
//       <ToastContainer />
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
//         <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-6">Sign In</h2>

//         <form onSubmit={handleManualLogin} className="space-y-5">
//           {/* Email */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email"
//               id="email"
//               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//               }`}
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//           </div>

//           {/* Password */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//               Password <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 id="password"
//                 className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                   errors.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//                 }`}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <div
//                 className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-blue-600"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </div>
//             </div>
//             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
//           >
//             Sign In
//           </button>
//         </form>

//         <div className="text-center my-4 text-sm text-gray-500">OR</div>

//         <button
//           onClick={handleGoogleSignIn}
//           className="w-full py-2 px-6 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-semibold rounded-lg flex items-center justify-center space-x-2 transition"
//         >
//           <img
//             src="https://www.svgrepo.com/show/475656/google-color.svg"
//             alt="Google"
//             className="w-5 h-5"
//           />
//           <span>Sign in with Google</span>
//         </button>

//         <p className="text-center text-sm text-gray-600 mt-4">
//           Don’t have an account?{' '}
//           <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// // export default SignIn;
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Eye, EyeOff } from 'lucide-react';
// import { toast, ToastContainer } from 'react-toastify';
// import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { auth } from '../../firebase';
// import 'react-toastify/dist/ReactToastify.css';

// const provider = new GoogleAuthProvider();

// interface SignInProps {
//   onAuth: () => void;
// }

// const SignIn: React.FC<SignInProps> = ({ onAuth }) => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

//   const API_BASE = 'http://127.0.0.1:8000/auth';

//   const validate = () => {
//     const newErrors: typeof errors = {};
//     if (!email) newErrors.email = 'Email is required';
//     else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Invalid email format';
//     if (!password) newErrors.password = 'Password is required';
//     else if (password.length < 6) newErrors.password = 'Min 6 characters';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleManualLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       const response = await fetch(`${API_BASE}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.detail || 'Login failed');

//       localStorage.setItem('token', data.access_token);
//       localStorage.setItem('user', JSON.stringify({ email }));
//       onAuth();
//       toast.success('✅ Logged in successfully!', { position: 'top-center', autoClose: 1500 });
//       setTimeout(() => navigate('/dashboard'), 1600);
//     } catch (err: any) {
//       toast.error(`❌ ${err.message}`, { position: 'top-center' });
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       const idToken = await user.getIdToken();
//       const fullName = user.displayName || 'Google User';
//       const email = user.email || '';

//       const response = await fetch(`${API_BASE}/google-signin`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           full_name: fullName,
//           google_id: idToken
//         })
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         const errorDetail = Array.isArray(data.detail)
//           ? data.detail.map((d: any) => d.msg).join(', ')
//           : data.detail;
//         throw new Error(errorDetail || 'Google login failed');
//       }

//       // ✅ Store full response
//       localStorage.setItem('token', data.access_token);
//       localStorage.setItem('user', JSON.stringify({ email, name: fullName }));

//       onAuth();
//       toast.success(`👋 Welcome ${fullName}`, {
//         position: 'top-center',
//         autoClose: 1500,
//       });
//       setTimeout(() => navigate('/dashboard'), 1600);
//     } catch (error: any) {
//       console.error('❌ Google Sign-In failed:', error);
//       toast.error(`❌ ${error.message || 'Google sign-in failed'}`, {
//         position: 'top-center',
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-4">
//       <ToastContainer />
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
//         <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-6">Sign In</h2>

//         <form onSubmit={handleManualLogin} className="space-y-5">
//           {/* Email */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email"
//               id="email"
//               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//               }`}
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//           </div>

//           {/* Password */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//               Password <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 id="password"
//                 className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                   errors.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//                 }`}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <div
//                 className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-blue-600"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </div>
//             </div>
//             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
//           >
//             Sign In
//           </button>
//         </form>

//         <div className="text-center my-4 text-sm text-gray-500">OR</div>

//         <button
//           onClick={handleGoogleSignIn}
//           className="w-full py-2 px-6 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-semibold rounded-lg flex items-center justify-center space-x-2 transition"
//         >
//           <img
//             src="https://www.svgrepo.com/show/475656/google-color.svg"
//             alt="Google"
//             className="w-5 h-5"
//           />
//           <span>Sign in with Google</span>
//         </button>

//         <p className="text-center text-sm text-gray-600 mt-4">
//           Don’t have an account?{' '}
//           <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignIn;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Eye, EyeOff } from 'lucide-react';
// import { toast, ToastContainer } from 'react-toastify';
// import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
// import { auth } from '../../firebase';
// import 'react-toastify/dist/ReactToastify.css';

// const provider = new GoogleAuthProvider();

// interface SignInProps {
//   onAuth: () => void;
// }

// const SignIn: React.FC<SignInProps> = ({ onAuth }) => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isGoogleLoading, setIsGoogleLoading] = useState(false);
//   const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

//   const API_BASE = 'http://127.0.0.1:8000/auth';

//   const validate = () => {
//     const newErrors: typeof errors = {};
//     if (!email) newErrors.email = 'Email is required';
//     else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Invalid email format';
//     if (!password) newErrors.password = 'Password is required';
//     else if (password.length < 6) newErrors.password = 'Min 6 characters';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleManualLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       const response = await fetch(`${API_BASE}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.detail || 'Login failed');

//       localStorage.setItem('token', data.access_token);
//       localStorage.setItem('user', JSON.stringify({ email }));
//       onAuth();
//       toast.success('✅ Logged in successfully!', { position: 'top-center', autoClose: 1500 });
//       setTimeout(() => navigate('/dashboard'), 1600);
//     } catch (err: any) {
//       toast.error(`❌ ${err.message}`, { position: 'top-center' });
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     if (isGoogleLoading) return;
//     setIsGoogleLoading(true);

//     try {
//       await signOut(auth); // 🔄 Clear any pending popup
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       const idToken = await user.getIdToken();
//       const fullName = user.displayName || 'Google User';
//       const email = user.email;

//       if (!idToken || !fullName || !email) {
//         throw new Error("Missing Firebase ID token or user info.");
//       }

//       const payload = {
//         full_name: fullName,
//         google_id: idToken,
//       };

//       console.log("Sending to backend:", payload);

//       const response = await fetch(`${API_BASE}/google-signin`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         const errorDetail = Array.isArray(data.detail)
//           ? data.detail.map((d: any) => d.msg).join(', ')
//           : data.detail;
//         throw new Error(errorDetail || 'Google login failed');
//       }

//       localStorage.setItem('token', data.access_token);
//       localStorage.setItem('user', JSON.stringify({ email, name: fullName }));

//       onAuth();
//       toast.success(`👋 Welcome ${fullName}`, {
//         position: 'top-center',
//         autoClose: 1500,
//       });
//       setTimeout(() => navigate('/dashboard'), 1600);
//     } catch (error: any) {
//       console.error('❌ Google Sign-In failed:', error);
//       toast.error(`❌ ${error.message || 'Google sign-in failed'}`, {
//         position: 'top-center',
//       });
//     } finally {
//       setIsGoogleLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-4">
//       <ToastContainer />
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
//         <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-6">Sign In</h2>

//         <form onSubmit={handleManualLogin} className="space-y-5">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email"
//               id="email"
//               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//               }`}
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//               Password <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 id="password"
//                 className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                   errors.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//                 }`}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <div
//                 className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-blue-600"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </div>
//             </div>
//             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
//           >
//             Sign In
//           </button>
//         </form>

//         <div className="text-center my-4 text-sm text-gray-500">OR</div>

//         <button
//           onClick={handleGoogleSignIn}
//           disabled={isGoogleLoading}
//           className={`w-full py-2 px-6 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-semibold rounded-lg flex items-center justify-center space-x-2 transition ${
//             isGoogleLoading ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//         >
//           <img
//             src="https://www.svgrepo.com/show/475656/google-color.svg"
//             alt="Google"
//             className="w-5 h-5"
//           />
//           <span>{isGoogleLoading ? 'Signing in...' : 'Sign in with Google'}</span>
//         </button>

//         <p className="text-center text-sm text-gray-600 mt-4">
//           Don’t have an account?{' '}
//           <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import 'react-toastify/dist/ReactToastify.css';

const provider = new GoogleAuthProvider();

interface SignInProps {
  onAuth: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onAuth }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const API_BASE = 'https://api.digitizeindia.co.in/auth';

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Min 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Login failed');

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify({ email }));
      onAuth();
      toast.success('✅ Logged in successfully!', { position: 'top-center', autoClose: 1500 });
      setTimeout(() => navigate('/dashboard'), 1600);
    } catch (err: any) {
      toast.error(`❌ ${err.message}`, { position: 'top-center' });
    }
  };

  const handleGoogleSignIn = async () => {
    if (isGoogleLoading) return;
    setIsGoogleLoading(true);

    try {
      await signOut(auth); // 🔄 Clear any pending popup
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const idToken = await user.getIdToken();
      const fullName = user.displayName || 'Google User';
      const email = user.email;

      if (!idToken || !fullName || !email) {
        throw new Error("Missing Firebase ID token or user info.");
      }

      // ✅ FIXED: Add email to payload
      const payload = {
        full_name: fullName,
        email: email, // ✅ REQUIRED FIELD
        google_id: idToken,
      };

      console.log("📡 Sending to backend:", payload);

      const response = await fetch(`${API_BASE}/google-signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        const errorDetail = Array.isArray(data.detail)
          ? data.detail.map((d: any) => d.msg).join(', ')
          : data.detail;
        throw new Error(errorDetail || 'Google login failed');
      }

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify({ email, name: fullName }));

      onAuth();
      toast.success(`👋 Welcome ${fullName}`, {
        position: 'top-center',
        autoClose: 1500,
      });
      setTimeout(() => navigate('/dashboard'), 1600);
    } catch (error: any) {
      console.error('❌ Google Sign-In failed:', error);
      toast.error(`❌ ${error.message || 'Google sign-in failed'}`, {
        position: 'top-center',
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-4">
      <ToastContainer />
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-6">Sign In</h2>

        <form onSubmit={handleManualLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
              }`}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                }`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-blue-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            Sign In
          </button>
        </form>

        <div className="text-center my-4 text-sm text-gray-500">OR</div>

        <button
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading}
          className={`w-full py-2 px-6 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-semibold rounded-lg flex items-center justify-center space-x-2 transition ${
            isGoogleLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>{isGoogleLoading ? 'Signing in...' : 'Sign in with Google'}</span>
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
