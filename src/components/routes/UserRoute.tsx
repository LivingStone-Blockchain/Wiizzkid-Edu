import React, { useContext } from 'react'
import { UserContext, UserContextType } from '../../context/user.context';
import LoadingToRedirect from './LoadingToRedirect';


type UserRouteProp = {
    children: React.ReactNode | JSX.Element,
}

const UserRoute = ({children}: UserRouteProp) => {
    const { user } = useContext(UserContext) as UserContextType;

  return (
  <>
  {user && user.tokens ? children : <LoadingToRedirect />}
  </>
  )
}

export default UserRoute;