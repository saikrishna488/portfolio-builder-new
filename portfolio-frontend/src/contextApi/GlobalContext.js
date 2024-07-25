"use client";
import { createContext,useState} from 'react';

export const globalContext = createContext();

const GlobalContext = ({children}) => {

    const [user,setUser] = useState({});
    const [data,setData] = useState({});
    const [refresh,setRefresh] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentResume,setCurrentResume] = useState("");

    // const setUserdata = (data)=>{
    //     setUser(data);
    // }

    // const setData = (data)=>{
    //     setDetails(data);
    // }
    return (
        <globalContext.Provider value={{
            user,
            setUser,
            data,
            setData,
            refresh,
            setRefresh,
            questions,
            setQuestions,
            currentResume,
            setCurrentResume
        }}
        >
            {children}
        </globalContext.Provider>
    )
}

export default GlobalContext;
