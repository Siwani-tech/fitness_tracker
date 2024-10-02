

import { createContext,useContext } from "react";

export const Profilecontext=createContext({
    data:[null],
    setdata:()=>{}
});


export const DataProvider=Profilecontext.Provider;


export default function useProfileData(){
    return useContext(Profilecontext)
}