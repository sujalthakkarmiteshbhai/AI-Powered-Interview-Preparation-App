import { useContext, useState } from 'react'
import Input from '../../components/inputs/input';
import { ProfilePhotoSelector } from '../../components/inputs/ProfilePhotoSelector';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';  
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { uploadImage } from '../../utils/uploadImages';

export const Signup = ({ setCurrentPage, onClose }) => {
  const [name, setName] = useState("");
  const [userProfilePicture, setUserProfilePicture] = useState(null);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  
  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    try {
      let profileImageUrl = "";

      if (userProfilePicture) {
        const imgUploadRes = await uploadImage(userProfilePicture);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name,
        email,
        password,
        profileImageUrl,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("accessToken", token);
        updateUser(response.data);
        onClose?.();
        navigate("/dashboard");
      } else {
        setError("Signup failed: no token returned");
      }
    } catch (error) {
      console.error("Signup API error", error);

      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError("An error occurred during signup. Please try again later.");
      }
    }
  };
  
  const handleLoginClick = () => {
    setCurrentPage("login");
  };

  return (



    <div className='w-full p-6 flex flex-col justify-center items-center gap-4'>
      <h3 className='text-2xl font-semibold text-black'>Create Account</h3>
      <p className='text-xs text-slate-500 mt-[5px] mb-4'>
        please enter your details to create your account
      </p>
      
      <form onSubmit={handleSignup} className='w-full flex flex-col gap-4'>
        {error && (
          <div className='text-red-500 text-sm'>
            {error}
          </div>
        )}
        <ProfilePhotoSelector image={userProfilePicture} setImage={setUserProfilePicture} />
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Full Name'
          type='text'
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500'
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email Address'
          type='email'
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500'
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          type='password'
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500'
        />
        <Input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='Confirm Password'
          type='password'
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500'
        />
        
        <button
          type='submit'
          className='w-full bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-white font-semibold py-2 rounded-lg hover:opacity-90 transition'
        >
          Sign Up
        </button>
      </form>
      
      <div className='flex gap-2 text-sm mt-2'>
        <span className='text-gray-600'>Already have an account?</span>
        <button
          onClick={handleLoginClick}
          className='text-orange-500 font-semibold hover:text-orange-600'
        >
          Login
        </button>
      </div>
      
     
  
    </div>
  )
}
