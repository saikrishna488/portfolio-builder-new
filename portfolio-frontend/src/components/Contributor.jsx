import React from 'react'

const Contributor = () => {
  return (
    <div className='contributor'>
      <h4>Ready to be a Open-Source Contributor</h4>
      <div className='contributor-box'>
      <iframe width="400" height="300" src="https://www.youtube.com/embed/Po-WbVjPxCI?si=sD2x9408xXlErcOr" title="YouTube video player" allowFullScreen={true}></iframe>
      <iframe width="400" height="300" src="https://www.youtube.com/embed/RHETubkhjY8?si=fRUfpPEgtqAz14fc" title="YouTube video player" allowFullScreen={true}></iframe>
      </div>
      <a href="https://ssocseason3.devfolio.co/" style={{marginTop:"10px",padding:"10px"}} target='_blank'>Click Here to Join</a>
    </div>
  )
}

export default Contributor
