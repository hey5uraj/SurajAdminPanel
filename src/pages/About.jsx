import React from 'react'
import Analytics from '../components/Analytics'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../store/auth'

const About = () => {

  const {user} = useAuth();
  // console.log("ddddddddd",userData);
  return (
   <>
   <main>
   <section className='section-hero'>
          <div className="container grid grid-two-cols">

            <div className="hero-content">
              <p>Welcome. <span>{user ? user.username : "to our website"}</span></p>
              <h1 className="hero-title">Why Choose Us?</h1>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum blanditiis recusandae, quis hic minima vero! Repudiandae nulla est quasi ipsa.</p>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum blanditiis recusandae, quis hic minima vero! Repudiandae nulla est quasi ipsa.</p>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum blanditiis recusandae, quis hic minima vero! Repudiandae.</p>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum blanditiis recusandae, quis hic minima vero! Repudiandae  beatae dolor, nisi iure.</p>

              <div className="btn btn-group">
                <NavLink to="/contact">
                  <button>Connect Now</button>
                </NavLink>
                <NavLink to="service">
                  <button className='btn secondary-btn'>Learn More</button>
                </NavLink>
              </div>
            </div>

            <div className="hero-image">
              <img src="/images/about.png" alt="coding"
                width={500} height={500} />
            </div>

          </div>

        </section>


      <Analytics/>


   </main>
   </>
  )
}

export default About
