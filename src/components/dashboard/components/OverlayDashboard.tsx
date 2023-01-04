import React, {FC} from 'react'

type OverlayProp = {
    open: boolean,
    setOpen: (value: React.SetStateAction<boolean>) => void,
}

const OverlayDashboard:FC<OverlayProp> = ({open, setOpen}) => {
  return (
    <>
        {open && <div className="bg-black opacity-30 fixed top-0 bottom-0 z-50 w-full h-full left-0 right-0 block lg:hidden" onClick={() => setOpen(false)}></div>}
    </>
  )
}

export default OverlayDashboard;