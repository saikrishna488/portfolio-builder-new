import React, { useState } from 'react'; // Assuming you have a CSS file for styling

const Achievements = () => {

    const [click,setClick] = useState(false);
  return (
    <div className="achievements-container">
        <h4>Achievements</h4>
        <div className='achievement-item'>
        <img src="ach1.png" alt="achievement 1" onClick={()=>setClick(!click)} className={click? 'zoom' :'achievement'} />
        </div>
        
    </div>
  );
};

export default Achievements;
