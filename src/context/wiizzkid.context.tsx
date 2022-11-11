import { createContext, FC, useState, useEffect } from "react";


export interface WiizzkidContextType {
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>,
}

export const WiizzkidContext = createContext<WiizzkidContextType | null>(null);


const WiizzkidProvider: FC<any> = ({ children }) => {
    const [value, setValue] = useState<number>(0);


    //create color carousel;
    useEffect(() => {
    const interval = setInterval(() => {
        setValue((v) => {
        return v === 2 ? 0 : v + 1;
        });
    }, 7000);

    return () => clearInterval(interval);
    })



    return (
        <WiizzkidContext.Provider 
            value={{ value, setValue }}
        >
            {children}
        </WiizzkidContext.Provider>
    )
}

export default WiizzkidProvider;