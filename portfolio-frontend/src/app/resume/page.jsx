"use client";


import dynamic from 'next/dynamic';
import { useContext } from 'react';
import { globalContext } from '../../contextApi/GlobalContext';

const Resume1 = dynamic(() => import('../../components/templates/Resume1'), { ssr: false });
const Resume2 = dynamic(() => import('../../components/templates/Resume2'), { ssr: false });
import { toast } from 'react-toastify';

const page = ()=>{
    const {currentResume, user} = useContext(globalContext)

    if (user.username){
        return (
            <>
            {
                currentResume == 'resume1' ? (
                    <Resume1/>
                ) : currentResume == 'resume2' ? (
                    <Resume2/>
                ) : (
                    null
                )
            }
            
            </>
        )
    }
    else{

        toast("Login to access")
        return (
            <>
            </>
        )
    }

    

}

export default page;
