import React, { useState } from 'react'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';


const Register = () => {

  const navigate = useNavigate();
  const {storeTokenInLS} = useAuth();

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInput = (e) => {

    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user);
    try {
      const res = await fetch(`https://surajadminpanel.netlify.app/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      })
      const res_data = await res.json();
      console.log("Error",res_data.extraDetails);

      if (res.ok) {
        toast.success("Registration Successfull");
        storeTokenInLS(res_data.token);
        setUser({ username: "", email: "", phone: "", password: "", });
        navigate('/login');
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message)
      }
    } catch (error) {
      console.log(error);
    }
  }



  const [showpassword, setShowPassword] = useState(false);




  return (
    <>
      <main>
        <section>
          <div className="section-registration">
            <div className="container grid grid-two-cols">

              <div className="registration-image">
                <img src="/images/register.png" alt="a user is trying to do registration"
                  width={500} height={500} />
              </div>

              <div className="registration-form">
                <h1 className='main-heading'>Registration</h1>
                <form onSubmit={handleSubmit} className='main-form'>
                  <div>
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name='username'
                      placeholder='username'
                      id='username'
                      required
                      autoComplete='off'
                      value={user.username}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name='email'
                      placeholder='email'
                      id='email'
                      required
                      autoComplete='off'
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="number"
                      name='phone'
                      placeholder='phone'
                      id='phone'
                      required
                      autoComplete='off'
                      value={user.phone}
                      onChange={handleInput}
                    />
                  </div>
                  <div className='displayPassword'>
                    <label htmlFor="password">Password</label>
                    <input
                      type={showpassword ? "text" : "password"}
                      name='password'
                      placeholder='password'
                      id='password'
                      required
                      autoComplete='off'
                      value={user.password}
                      onChange={handleInput}
                    />
                    <div className="passwordDiv">
                      {
                        showpassword ?
                          (
                            <VisibilityOutlinedIcon onClick={() => setShowPassword(false)} />
                          ) :
                          (
                            <VisibilityOffOutlinedIcon onClick={() => setShowPassword(true)} />
                          )
                      }
                    </div>
                  </div>

                  <button type='submit' className='btn btn-submit'>Register Now</button>
                </form>
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Register
