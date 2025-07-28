// import React from 'react';
// import { Link } from 'react-router-dom';

// const SignUp: React.FC = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
//         <form>
//           <div className="mb-4">
//             <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="Choose a username"
//             />
//           </div>
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
//               placeholder="Create a password"
//             />
//           </div>
//           <div className="flex items-center justify-between">
//             <button
//               type="submit"
//               className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Sign Up
//             </button>
//             <Link to="/signin" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
//               Already have an account? Sign In
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Eye, EyeOff } from 'lucide-react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const SignUp: React.FC = () => {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string }>({});

//   const validate = () => {
//     const newErrors: typeof errors = {};
//     if (!username.trim()) newErrors.username = 'Username is required';
//     if (!email) newErrors.email = 'Email is required';
//     else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Enter a valid email address';
//     if (!password) newErrors.password = 'Password is required';
//     else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validate()) {
//       // Simulate backend call success
//       toast.success('🎉 Sign up successful! Redirecting to Sign In...', {
//         position: 'top-center',
//         autoClose: 2500,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: false,
//         draggable: false,
//         theme: 'colored',
//       });

//       setTimeout(() => {
//         navigate('/signin');
//       }, 2600);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-4">
//       <ToastContainer />
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
//         <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-6">Create Account</h2>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Username */}
//           <div>
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
//               Username <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               id="username"
//               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.username ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//               }`}
//               placeholder="Your username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
//           </div>

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
//                 placeholder="Create a password"
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

//           {/* Submit */}
//           <div>
//             <button
//               type="submit"
//               className="w-full py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
//             >
//               Sign Up
//             </button>
//           </div>

//           {/* Switch to Sign In */}
//           <p className="text-center text-sm text-gray-600 mt-4">
//             Already have an account?{' '}
//             <Link to="/signin" className="text-blue-600 font-semibold hover:underline">
//               Sign In
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Eye, EyeOff } from 'lucide-react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// // import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// // import { app } from '../../firebase'; // update this path based on your project structure

// const SignUp: React.FC = () => {
//   const navigate = useNavigate();
//   const auth = getAuth(app);
//   const provider = new GoogleAuthProvider();

//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string }>({});

//   const validate = () => {
//     const newErrors: typeof errors = {};
//     if (!username.trim()) newErrors.username = 'Username is required';
//     if (!email) newErrors.email = 'Email is required';
//     else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Enter a valid email address';
//     if (!password) newErrors.password = 'Password is required';
//     else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validate()) {
//       // Simulate success
//       toast.success('🎉 Sign up successful! Redirecting to dashboard...', {
//         position: 'top-center',
//         autoClose: 2500,
//         theme: 'colored',
//       });

//       setTimeout(() => {
//         navigate('/dashboard');
//       }, 2600);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       toast.success(`✅ Welcome ${user.displayName || 'user'}! Redirecting to dashboard...`, {
//         position: 'top-center',
//         autoClose: 2000,
//         theme: 'colored',
//       });

//       setTimeout(() => {
//         navigate('/dashboard');
//       }, 2100);
//     } catch (error) {
//       toast.error('Google sign-in failed. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-4">
//       <ToastContainer />
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
//         <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-6">Create Account</h2>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Username */}
//           <div>
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
//               Username <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               id="username"
//               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.username ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//               }`}
//               placeholder="Your username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
//           </div>

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
//                 placeholder="Create a password"
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

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
//           >
//             Sign Up
//           </button>

//           {/* Google Sign In */}
//           <button
//             type="button"
//             onClick={handleGoogleSignIn}
//             className="w-full py-2 px-6 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
//           >
//             Sign Up with Google
//           </button>

//           {/* Switch to Sign In */}
//           <p className="text-center text-sm text-gray-600 mt-4">
//             Already have an account?{' '}
//             <Link to="/signin" className="text-blue-600 font-semibold hover:underline">
//               Sign In
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Eye, EyeOff } from 'lucide-react';
// import { toast, ToastContainer } from 'react-toastify';
// import { signInWithPopup } from 'firebase/auth';
// import { auth, provider } from '../../firebase';
// import 'react-toastify/dist/ReactToastify.css';

// const SignUp: React.FC = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string }>({});

//   const validate = () => {
//     const newErrors: typeof errors = {};
//     if (!username.trim()) newErrors.username = 'Username is required';
//     if (!email) newErrors.email = 'Email is required';
//     else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Enter a valid email address';
//     if (!password) newErrors.password = 'Password is required';
//     else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleManualSignUp = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validate()) {
//       // Simulate success
//       toast.success('🎉 Sign up successful! Redirecting to dashboard...', {
//         position: 'top-center',
//         autoClose: 2500,
//         theme: 'colored',
//       });
//       setTimeout(() => navigate('/dashboard'), 2600);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       toast.success(`👋 Welcome ${result.user.displayName}`, {
//         position: 'top-center',
//         autoClose: 2000,
//         theme: 'colored',
//       });
//       setTimeout(() => navigate('/dashboard'), 2100);
//     } catch (error) {
//       console.error(error);
//       toast.error('❌ Google sign-in failed', {
//         position: 'top-center',
//         theme: 'colored',
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-4">
//       <ToastContainer />
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
//         <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-6">Create Account</h2>
//         <form onSubmit={handleManualSignUp} className="space-y-5">
//           {/* Username */}
//           <div>
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
//               Username <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               id="username"
//               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.username ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//               }`}
//               placeholder="Your username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
//           </div>

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
//                 placeholder="Create a password"
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

//           {/* Manual Submit */}
//           <button
//             type="submit"
//             className="w-full py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
//           >
//             Sign Up
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="text-center my-4 text-sm text-gray-500">OR</div>

//         {/* Google Sign-In */}
//         <button
//           onClick={handleGoogleSignIn}
//           className="w-full py-2 px-6 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-semibold rounded-lg flex items-center justify-center space-x-2 transition"
//         >
//           <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
//           <span>Sign up with Google</span>
//         </button>

//         {/* Switch to Sign In */}
//         <p className="text-center text-sm text-gray-600 mt-4">
//           Already have an account?{' '}
//           <Link to="/signin" className="text-blue-600 font-semibold hover:underline">
//             Sign In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import 'react-toastify/dist/ReactToastify.css';

interface SignUpProps {
  onAuth: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onAuth }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string }>({});

  const API_BASE = 'http://34.47.179.91:8000/auth';

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Enter a valid email address';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleManualSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: username,
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Registration failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      onAuth(); // Call onAuth after successful sign-up

      toast.success('🎉 Sign up successful! Redirecting...', { position: 'top-center', autoClose: 2500 });
      setTimeout(() => navigate('/dashboard'), 2600);
    } catch (err: any) {
      toast.error(`❌ ${err.message}`, { position: 'top-center' });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken(); // 🔑 Firebase token

      const response = await fetch(`${API_BASE}/google-signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: result.user.displayName || '',
          google_id: idToken,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Google sign-in failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);

      toast.success(`👋 Welcome ${result.user.displayName}`, { position: 'top-center', autoClose: 2000 });
      setTimeout(() => navigate('/dashboard'), 2100);
    } catch (error: any) {
      console.error(error);
      toast.error(`❌ ${error.message || 'Google sign-in failed'}`, { position: 'top-center' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-4">
      <ToastContainer />
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-6">Create Account</h2>
        <form onSubmit={handleManualSignUp} className="space-y-5">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="username"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.username ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
              }`}
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          {/* Email */}
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

          {/* Password */}
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
                placeholder="Create a password"
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
            Sign Up
          </button>
        </form>

        <div className="text-center my-4 text-sm text-gray-500">OR</div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full py-2 px-6 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-semibold rounded-lg flex items-center justify-center space-x-2 transition"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          <span>Sign up with Google</span>
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/signin" className="text-blue-600 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
