import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../../context/userContext';

 const ProfileInfoCard = () => {
  const {user,CleanUser} = useContext(UserContext);
  const navigation = useNavigate();

  const handleLogout = () => {
   CleanUser();
    localStorage.removeItem("token"); // Remove JWT token from localStorage
    navigation("/"); // Redirect to landing page or login page
    // window.location.href = "/"; // Redirect to landing page or login page
 };
  
  if (!user) {
    return null;
  }
  
    return (
<>
        <div className="flex items-center">
  <img
    src={user.profileImageUrl || ""}
    alt=""
    className="w-11 h-11 bg-gray-300 rounded-full mr-3"
  />

  <div>
    <div className="text-[15px] text-black font-bold leading-3">
      {user.name || ""}
    </div>

    <button
      className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
      onClick={handleLogout}
    >
      Logout
    </button>
  </div>
</div>
</>
  )
}
export default ProfileInfoCard;