import React, { useContext, useState } from 'react';
import { UserContext, UserContextType } from '../context/user.context';
import { SideBar, OverlayDashboard, MainBar } from './../components/dashboard/components/index';



const Dashboard = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { user, handleLogout } = useContext(UserContext) as UserContextType;



  return (
    <div className="bg-gray-100">
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
    </div>

  )
}

export default Dashboard