"use client";
import React, { useEffect, useState, useContext } from 'react'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { globalContext } from '../contextApi/GlobalContext';
import { toast } from 'react-toastify';

const Portfolio = () => {

    const { data } = useContext(globalContext);
    const [portfolio, setPortfolio] = useState([]);
    useEffect(() => {
        const fetchAll = () => {
            fetch(process.env.NEXT_PUBLIC_BACKEND_URL+'/portfolio', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                return res.json();
            }).then((data) => {
                setPortfolio(data)
                console.log(data)
            });
        }

        fetchAll();
    },[]);
    const leftArrow = () => {
        let left = document.getElementsByClassName('holder')[0];
        left.scrollBy(-360, 0);
    }
    const rightArrow = () => {
        let right = document.getElementsByClassName('holder')[0];
        right.scrollBy(360, 0);
    }

    const build = async (item) => {
        try {
            if (data.id) {
                let reqData = {
                    tem : item.name,
                    ...data
                }
                console.log(data);
                let res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+'/portfolio',{
                    method : 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body : JSON.stringify(reqData)
                });

                let d = await res.json();
                if(d.message == true){
                    toast("success");
                    console.log(d);
                    window.open(process.env.NEXT_PUBLIC_BACKEND_URL+"/"+d.url, '_blank');
                }
            }
            else{
                console.log("err occured",data);
                toast("Please fill your data in profile section");
            }
        }
        catch(err){
            console.log(err);
            toast("error");
        }
        
    }

    return (
        <div className='portfolio'>
            <h4 style={{ color: 'white' }}>Portfolio (choose templates)</h4>
            <span className='left-arrow' onClick={leftArrow}><BsFillArrowLeftCircleFill size={40} /></span>
            <span className='right-arrow' onClick={rightArrow}><BsFillArrowRightCircleFill size={40} /></span>
            <div className='holder'>
                {
                    portfolio.map((item) => (
                        <div className="port-card" onClick={() => build(item)} key={item.name}>
                            <img src={process.env.NEXT_PUBLIC_BACKEND_URL+"/" + item.url} alt="" />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Portfolio
