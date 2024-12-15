import { useSelector } from "react-redux";
import { selectUserId } from '../Redux/User';
import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const userId = useSelector(selectUserId);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId !== undefined) {
      setLoading(false);
    }
  }, [userId]);

  if (loading) {
    return(  
      
      <div className="flex justify-center items-center h-screen">
    <div className="animate-spin border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full"></div>
  </div>) ; 
  }

  return userId ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
