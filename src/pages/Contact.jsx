import React, { useState } from 'react'
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const Contact = () => {

  const URL = "https://surajadminpanel.netlify.app/api/form/contact"

  const defaultContactFormData = {
    username: "",
    email: "",
    message: "",
  }
  const { user } = useAuth();

  const [contact, setContact] = useState(defaultContactFormData);

  const [userData, setUserData] = useState(true);

  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    })
    setUserData(false);
  }


  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value
    setContact({
      ...contact,
      [name]: value
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user)
    try {
      const res = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(contact)
      })

      if (res.ok) {
        setContact((prevContact) => ({
          ...prevContact,
          message: "", 
        }));
        // setContact(defaultContactFormData);
        // const res_data = await res.json();
        // storeTokenInLS(res_data.token);
        toast.success("Message sent successfully");
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to send message");
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <main>
        <section>
          <div className="section-registration">
            <div className="container grid grid-two-cols">

              <div className="registration-image">
                <img src="/images/support.png" alt="contact Image"
                  width={500} height={500} />

              </div>
              <div className="registration-form">
                <h1 className='main-heading'>Contact Us</h1>
                <form onSubmit={handleSubmit} className='main-form'>
                  <div>
                    <label htmlFor="username">Username:</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder='Enter your name'
                      autoComplete='off'
                      required
                      value={contact.username}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email:</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder='Enter your email'
                      autoComplete='off'
                      required
                      value={contact.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                      type="text"
                      id="message"
                      name="message"
                      autoComplete='off'
                      placeholder='Please Enter Your massage'
                      required
                      value={contact.message}
                      onChange={handleInput}
                      maxLength={1000}
                      minLength={10}
                    />
                  </div>
                  <button type='submit' className='btn btn-submit'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4316.829201487822!2d73.8256670756582!3d18.6504406651934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9b9963fcbb5%3A0xeeb0c0d315491499!2sB%2015%20Jaigad%2C%20Sector%2012!5e1!3m2!1sen!2sin!4v1732874379894!5m2!1sen!2sin" width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </section>
      </main>
    </>
  )
}

export default Contact
