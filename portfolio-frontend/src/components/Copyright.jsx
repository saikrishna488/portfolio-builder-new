import React from 'react'

const Footer = () => {
    return (
        <footer className="text-center text-lg-start bg-white text-muted">

            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">

                <div>
                    <a href="" className="me-4 link-secondary">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="" className="me-4 link-secondary">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="" className="me-4 link-secondary">
                        <i className="fab fa-google"></i>
                    </a>
                    <a href="" className="me-4 link-secondary">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="" className="me-4 link-secondary">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="" className="me-4 link-secondary">
                        <i className="fab fa-github"></i>
                    </a>
                </div>

            </section>

            <section className="">
                <div className="container text-center text-md-start mt-5">

                    <div className="row mt-3">

                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

                            <h6 className="text-uppercase fw-bold mb-4">
                                <i className="fas fa-gem me-3 text-secondary"></i>ApnAInterview Cracker
                            </h6>
                            <p>
                            ApnAInterview Cracker revolutionizes job readiness with AI-driven mock interviews, market insights, and portfolio tools. Our platform empowers users with personalized feedback, industry trends, and ATS-optimized resume templates, ensuring they're prepared for employment. Join us in bridging the gap between education and industry, enhancing your career journey today.
                            </p>
                        </div>

                        
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                            <p><i className="fas fa-home me-3 text-secondary"></i> Hyderabad, HY 10012, India</p>
                            <p>
                                <i className="fas fa-envelope me-3 text-secondary"></i>
                                ApnAInterview@example.com
                            </p>
                           
                        </div>
                    </div>
                </div>
            </section>

            <div className="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.025)"}}>
                © 2024 Copyright : 
                <a className="text-reset fw-bold" href="https://mdbootstrap.com/">ApnAInterviewcracker.com</a>
            </div>
        </footer>
    )
}

export default Footer;
