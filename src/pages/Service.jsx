import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../store/auth';



const Service = () => {

  const { services } = useAuth();

  console.log("my service data", services);

  return (
    <>
      <main>
        <section className='section-service'>

          <div className="container" style={{ padding: "2rem 2.4rem" }}>
            <h1 className='main-heading'>Services</h1>
          </div>

          <div className="container grid grid-three-cols">
            {
              services && services.map((item, index) => {
                return (
                  <NavLink to='https://heysuraj.info/' target='_blank' key={index} >
                    <div className="service-divs"  >
                      <div className="service-image">
                        <img src="/images/register.png" alt="a user is trying to do registration"
                          width={500} height={500} />
                      </div>
                      <div className="service-content">
                        <p>{item.provider}</p>
                        <p> <span>{item.price}</span><span>{item.price}</span> </p>
                        <h3>{item.service}</h3>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </NavLink>
                )
              })
            }
          </div>
        </section>
      </main>
    </>
  );
};

export default Service
