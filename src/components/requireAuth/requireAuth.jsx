import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom"


export const RequireAuth = () => {
    const location = useLocation();
    const {token} = useSelector((store)=>store.auth);

    return token? <Outlet/> : <Navigate to="/home" state={{from:location}} replace />
}