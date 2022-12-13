import React, { useContext, useState } from 'react';
import { UserContext, UserContextType } from '../context/user.context';
import { Windmill, Button } from '@windmill/react-ui';
import { SideBar, OverlayDashboard, MainBar } from './../components/dashboard';



const Dashboard = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { user, handleLogout } = useContext(UserContext) as UserContextType;



  return (
    <Windmill className="bg-gray-100">
      <OverlayDashboard open={open} setOpen={setOpen} />
      <SideBar 
        userFullName={user?.full_name}
        open={open}
        setOpen={setOpen}
        handleLogout={handleLogout}
      />
      <MainBar 
        open={open}
        setOpen={setOpen} 
      />
    </Windmill>

  )
}

export default Dashboard