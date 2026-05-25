import React,{ createContext , useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
     
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
    //   if(user) return;
      const accessToken = localStorage.getItem("accessToken");
        if(!accessToken){    
            setLoading(false);
            return ;
        }
         const fetchUser = async()=>{   
            try{
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setUser(response.data);
            }   catch(error){
                console.error("User not Authenticated",error.data);
                CleanUser();
            }finally{
                setLoading(false);

            }
        }
      fetchUser();

   
     }, []);
         const CleanUser = () => { 
            setUser(null);
            localStorage.removeItem("accessToken");
         
        }
         
        const updateUser = (userData)=>{
       setUser(userData);
       localStorage.setItem("accessToken",userData.token);
       setLoading(false);  
      }
    return(
       <UserContext.Provider value={{user,loading,updateUser,CleanUser}}>
        {children}
       </UserContext.Provider>
     
    );


};

export default  UserProvider;