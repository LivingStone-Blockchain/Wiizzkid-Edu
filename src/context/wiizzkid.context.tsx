import { createContext, FC, useState, useEffect, useMemo } from "react";



export interface WiizzkidContextType {
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>,
    openVideo: boolean,
    setOpenVideo: React.Dispatch<React.SetStateAction<boolean>>,
    dashBoardMode: boolean,
    setDashBoardMode: React.Dispatch<React.SetStateAction<boolean>>
    // openPresale: boolean,
    // setOpenPresale: React.Dispatch<React.SetStateAction<boolean>>
}

export const WiizzkidContext = createContext<WiizzkidContextType | null>(null);


const WiizzkidProvider: FC<any> = ({ children }) => {
    const [value, setValue] = useState<number>(0);
    const [openVideo, setOpenVideo] = useState<boolean>(false);
    const [dashBoardMode, setDashBoardMode] = useState<boolean>(false)
    // const [ openPresale, setOpenPresale] = useState<boolean>(true);
   

    //create color carousel;
    useEffect(() => {
    const interval = setInterval(() => {
        setValue((v) => {
        return v === 2 ? 0 : v + 1;
        });
    }, 7000);

    return () => clearInterval(interval);
    })


    const values = useMemo(
        () => ({ 
            value, 
            setValue,
            openVideo,
            setOpenVideo,
            dashBoardMode, 
            setDashBoardMode,
            // openPresale,
            // setOpenPresale
        }),
        [
            value, 
            setValue,
            openVideo,
            setOpenVideo,
            dashBoardMode, 
            setDashBoardMode,
            // openPresale,
            // setOpenPresale
        ])

    return (
        <WiizzkidContext.Provider 
            value={values }
        >
            {children}
        </WiizzkidContext.Provider>
    )
}

export default WiizzkidProvider;