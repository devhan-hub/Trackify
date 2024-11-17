import { useSelector } from "react-redux"
import {selectUserId}  from '../Redux/User'
import { Outlet , Navigate } from "react-router-dom"
const ProtectedRoute = () => {
const userId = useSelector(selectUserId)
  return (
    userId ? <Outlet/> : <Navigate to={'/login'}/>
  )
}

export default ProtectedRoute
