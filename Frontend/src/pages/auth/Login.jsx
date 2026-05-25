import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import  Input  from '../../components/inputs/input';
import { validateEmail } from '../../utils/helper';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { UserContext} from '../../context/userContext';
// import axios from 'axios';

export const Login = ({ setCurrentPage}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [error, setError] = useState(null);
  

  const { updateUser } = useContext(UserContext);  
 const navigate = useNavigate();

 //Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email) ){
      setError("please enter a valid email address");
      return;
    }

    if(!password){
      setError("password cannot be empty");
      return; 
    }

     setError(""); // Clear previous errors

     //login api call
    try {

     const respose = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password }); 

     const {token} = respose.data;
     if(token){
      localStorage.setItem("accessToken", token); // Store JWT token in localStorage
      updateUser(respose.data); // Update user context with logged-in user details
      navigate('/dashboard'); // Redirect to dashboard or desired page 
    }

    }catch(error){
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      } else{
        setError("An error occurred during login. Please try again later.");  
      }
    }



  };
  
  const handleSignupClick = () => {
    setCurrentPage("signup");
  };

  return (
    <div className='w-full p-6 flex flex-col justify-center items-center gap-4'>

   <h3 className='text-2xl font-semibold text-black'>Welcome Back</h3> 
   <p className='text-xs text-slate-500 mt-[5px] mb-4'>
    please enter your details to login to your account
   </p>
  
  <form onSubmit={handleLogin} className='w-full flex flex-col gap-4'>
    
    <Input
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      label="Email Address"
      placeholder='sujal thakkar'
      type='email'
    />
    <Input
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      label="Password"
      placeholder='Enter your password'
      type='password'
    />
    
    {/* <Input
    value={ password }
    onChange={(e)=>setPassword(e.target.value)}
    label= "Password"
    placeholder='Enter your password'
    type='password'
    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500'
    /> */}
     {
      error && <p className='text-red-500 text-sm'>{error}</p>
     }  
    <button
      type='submit'
      className='w-full bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-white font-semibold py-2 rounded-lg hover:opacity-90 transition'
    >
      Login
    </button>
  </form>
   
 

  <div className='flex gap-2 text-sm mt-2'>
    <span className='text-gray-600'>Don't have an account?</span>
    <button
      onClick={handleSignupClick}
      className='text-orange-500 font-semibold hover:text-orange-600'
    >
      Sign Up
    </button>
  </div>


    </div>
  )
}
