import React, { useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
// import isTokenExpired from "../helpers/isTokenExpired";
import { useAuth } from "../hooks/useAuth";
import { useApp } from "../hooks/useApp";

const ProtectedRouter = ({ children }) => {
  
  const { user, handleLogout } = useAuth();
  const { setToastAction } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
// console.log(user);

  useEffect(() => {
    if (!user.data) {
      navigate('/',{
        replace: true,
        state: { from: location }
      })
    }

    // if (user && isTokenExpired(user?.token)) {
    //   setToastAction({
    //     severity: "error",
    //     summary: "Erreur",
    //     detail: "Session expirée",
    //     life: 3000,
    //   })

    //   handleLogout()

    //   navigate('/', {
    //     replace: true,
    //     state: { from: location }
    //   })
    // }

    if (!user.data?.token) {
      handleLogout()
      navigate('/', {
        replace: true,
        state: { from: location }
      })
    }
  }, [user])

  return children;
}

export default ProtectedRouter;