import { useState } from "react";



function useLocalstorage(key,insitialvalue){

    const[storedValue,setstoredValue]=useState(()=>{

       try {
         const item=localStorage.getItem(key);
         return item ? JSON.parse(item) :insitialvalue;
       } catch (error) {
        console.error(error);
        return insitialvalue;
       }
    })

    const setValue=(value)=>{
        try {
            setstoredValue(value);
            localStorage.setItem(key,JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    }

    const getValue=()=>{
        try {
            const item=localStorage.getItem(key);
            return item ? JSON.parse(item) :insitialvalue;
        } catch (error) {
            console.error(error)
            return insitialvalue;
        }
    }

    const removeValue=()=>{
        try {
            localStorage.removeItem(key)
            setstoredValue(insitialvalue)
        } catch (error) {
            console.error(error)
        }
    }

    return(
        [storedValue,setValue,getValue,removeValue]
    )
}

export default useLocalstorage;