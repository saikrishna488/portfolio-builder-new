"use client";
import React, { useEffect, useState, useContext } from 'react'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { globalContext } from '../contextApi/GlobalContext';
import { toast } from 'react-toastify';

const Tutorials = () => {

    const { data } = useContext(globalContext);
    const [items, setItems] = useState([]);



    useEffect(() => {
        let itms = ['https://www.youtube.com/embed/RGOj5yH7evk?si=KGEXUQQMxr2RQR2Y','https://www.youtube.com/embed/f0kUfDLXqPE?si=LF89Q3BYdbHiprcS','https://www.youtube.com/embed/5b36UTNRmtI?si=55ZFnCGsM05mIR85','https://www.youtube.com/embed/RWgW-CgdIk0?si=8zcmiizr9fOLdGfZ']
        setItems(itms)
    }, []);
    const leftArrow = () => {
        let left = document.getElementsByClassName('holder-tutorials')[0];
        left.scrollBy(-360, 0);
    }
    const rightArrow = () => {
        let right = document.getElementsByClassName('holder-tutorials')[0];
        right.scrollBy(360, 0);
    }

    return (
        <div className='portfolio'>
            <h4 style={{ color: 'white' }}>Tutorials to Crack Interviews</h4>
            <span className='left-arrow' onClick={leftArrow}><BsFillArrowLeftCircleFill size={40} /></span>
            <span className='right-arrow' onClick={rightArrow}><BsFillArrowRightCircleFill size={40} /></span>
            <div className='holder-tutorials'>
                {
                    items.map((item, id) => (
                        <div className="port-card" key={id}>
                            <iframe width="400" height="200"
                                src={item}>
                            </iframe>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Tutorials;
