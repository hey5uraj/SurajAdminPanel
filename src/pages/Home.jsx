import React from 'react'
import Analytics from '../components/Analytics'

const Home = () => {
  
  return (
    <>
      <main>

        <section className='section-hero'>
          <div className="container grid grid-two-cols">

            <div className="hero-content">
              <p>We are the best IT compnay</p>
              <h1 className="hero-title">Welcome to our website</h1>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum blanditiis recusandae, quis hic minima vero! Repudiandae nulla est quasi ipsa, esse accusantium itaque adipisci quia aliquid beatae dolor, nisi iure.</p>

              <div className="btn btn-group">
                <a href="/contact">
                  <button>Connect Now</button>
                </a>
                <a href="/service">
                  <button className='btn secondary-btn'>Learn More</button>
                </a>
              </div>
            </div>

            <div className="hero-image">
              <img src="/images/home.png" alt="coding"
                style={{width:"95%"}} />
            </div>

          </div>

        </section>




        <Analytics />


        <section className='section-hero'>
          <div className="container grid grid-two-cols">

            <div className="hero-image">
              <img src="/images/design.png" alt="coding"
                width={500} height={500} />
            </div>

            <div className="hero-content">
              <p>We are here to help you</p>
              <h1 className="hero-title">Get Started Today</h1>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum blanditiis recusandae, quis hic minima vero! Repudiandae nulla est quasi ipsa, esse accusantium itaque adipisci quia aliquid beatae dolor, nisi iure.</p>

              <div className="btn btn-group">
                <a href="/contact">
                  <button>Connect Now</button>
                </a>
                <a href="service">
                  <button className='btn secondary-btn'>Learn More</button>
                </a>
              </div>
            </div>



          </div>

        </section>
      </main>
    </>
  )
}

export default Home
