"use client"
import Resume1 from '../../components/templates/Resume1'
import Resume2 from '../../components/templates/Resume2'
import { globalContext } from '../../contextApi/GlobalContext';
import { useContext } from 'react';

const page = ()=>{
    const {currentResume} = useContext(globalContext)

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

export default page;