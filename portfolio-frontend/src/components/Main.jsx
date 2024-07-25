import React from 'react'
import AnimatedTexts from './AnimatedTexts'

const Main = () => {
    return (
        <div className='mid'>

            <div className='mid-left'>
                <AnimatedTexts />
                <p>ApnAInterview Cracker revolutionizes job readiness with AI-driven mock interviews, market insights, and portfolio tools. Our platform empowers users with personalized feedback, industry trends, and ATS-optimized resume templates, ensuring they're prepared for employment. Join us in bridging the gap between education and industry, enhancing your career journey today.</p>
            </div>
            <div className='mid-right'>
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner mid-imgs">
                        <div className="carousel-item active">
                            <img src="/img1.jpg" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="img2.jpg" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="img3.jpg" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Main
