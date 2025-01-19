import React, { useEffect, useRef, useState } from 'react'

const Analytics = () => {

    const [counts, setCounts] = useState([0, 0, 0, 0]);
    const finalCounts = [50, 100, 150, 200];
    const sectionRef = useRef(null);

    const labels = [
        'Registered Companies',
        'Active Projects',
        'Completed Projects',
        'Happy Clients'
    ];

    
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            finalCounts.forEach((finalValue, index) => {
              let current = 0;
              const interval = setInterval(() => {
                setCounts(prev => prev.map((count, i) => (i === index ? current : count)));
                current++;
                if (current === finalValue) clearInterval(interval); 
              }, 2000 / finalValue);
            });
            observer.disconnect();
          }
        }, { threshold: 0.5 });
        
        if (sectionRef.current) observer.observe(sectionRef.current);
        }, []);

    return (
        <>
            <section className='section-analytics' ref={sectionRef}>
                <div className="container grid grid-four-cols">
                    {
                        counts.map((item, index) => (
                            <div className="dives" key={index}>
                                <h2>{item}+</h2>
                                <p>{labels[index]}</p>
                            </div>
                        ))
                    }
                </div>
            </section>
        </>
    )
}

export default Analytics
