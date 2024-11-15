"use client";
import { useContext, useState } from 'react';
import { globalContext } from '../../contextApi/GlobalContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { User, Lock, Mail, Eye, EyeOff } from 'lucide-react'; // Import lucide icons

const Page = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const { user, setUser } = useContext(globalContext);
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();

    if (username.length > 5) {
      if (name.length > 5) {
        if (password.length > 5) {
          let obj = {
            username: username,
            name: name,
            email: email,
            password: password
          };

          try {
            let res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/register', {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(obj)
            });
            let data = await res.json();
            if (data.login === true) {
              toast.success("Registration successful! Please login to continue.");
              router.push('/login');
            } else {
              toast.error("Username or email already exists.");
            }
          } catch (err) {
            toast.error("Registration failed. Please try again.");
          }
        } else {
          toast.error("Password should be at least 6 characters long.");
        }
      } else {
        toast.error("Name should be at least 6 characters long.");
      }
    } else {
      toast.error("Username should be at least 6 characters long.");
    }
  }

  return (
    <div className='flex items-center justify-center h-full pt-20'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-gray-800 text-center'>Register</h2>
        <form onSubmit={submit}>
          <div className='mb-4'>
            <label htmlFor="username" className='block text-gray-700 text-sm font-semibold mb-2'>Username</label>
            <div className='flex items-center border-2 rounded-lg hover:border-blue-600'>
              <User className='ml-3 text-gray-400' size={20} />
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder='Enter your username'
                className='w-full p-3 pl-10 border-0 rounded-lg focus:ring-0 focus:outline-none'
              />
            </div>
          </div>

          <div className='mb-4'>
            <label htmlFor="name" className='block text-gray-700 text-sm font-semibold mb-2'>Name</label>
            <div className='flex items-center border-2 rounded-lg hover:border-blue-600'>
              <User className='ml-3 text-gray-400' size={20} />
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder='Enter your name'
                className='w-full p-3 pl-10 border-0 rounded-lg focus:ring-0 focus:outline-none'
              />
            </div>
          </div>

          <div className='mb-4'>
            <label htmlFor="email" className='block text-gray-700 text-sm font-semibold mb-2'>Email</label>
            <div className='flex items-center border-2 rounded-lg hover:border-blue-600'>
              <Mail className='ml-3 text-gray-400' size={20} />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='Enter your email'
                className='w-full p-3 pl-10 border-0 rounded-lg focus:ring-0 focus:outline-none'
              />
            </div>
          </div>

          <div className='mb-6'>
            <label htmlFor="password" className='block text-gray-700 text-sm font-semibold mb-2'>Password</label>
            <div className='flex items-center border-2 rounded-lg hover:border-blue-600'>
              <Lock className='ml-3 text-gray-400' size={20} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Enter your password'
                className='w-full p-3 pl-10 border-0 rounded-lg focus:ring-0 focus:outline-none'
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className='mr-3'
              >
                {showPassword ? <EyeOff size={20} className='text-gray-400' /> : <Eye size={20} className='text-gray-400' />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className='w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200'
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">Already have an account? <span
            onClick={() => router.push('/login')}
            className="text-blue-500 cursor-pointer hover:text-blue-600">
            Login
          </span></p>
        </div>
      </div>
    </div>
  )
}

export default Page;
