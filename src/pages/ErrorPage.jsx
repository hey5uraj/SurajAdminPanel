import React from 'react'
import { NavLink } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <>
      <main>
        <section className='section-hero'>
          <div className="container main-section">
            <div className="error-content">
              <h1>404</h1>
              <p>sorry!page not found</p>
              <p>Oops! It seems like the page you are looking for does not exist.If you believe there's on issue. feel free to report it and we'll look into it.</p>
              <div className="btn btn-group err-btn">
                <NavLink to="/">
                  <button>return home</button>
                </NavLink>
                <NavLink to="/">
                  <button className='btn secondary-btn'>report problems</button>
                </NavLink>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default ErrorPage
