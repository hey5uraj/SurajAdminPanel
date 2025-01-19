import React, { useState } from 'react'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const Login = () => {
  
  const {storeTokenInLS} = useAuth();
  const URL = "https://surajadminpanel.netlify.app/api/auth/login"
  const navigate = useNavigate();
  
  const [showpassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value
    });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      })
      const res_data = await res.json();
      // console.log("ffffff", res_data.token);

      if (res.ok) {
        toast.success("Login Successful");
        storeTokenInLS(res_data.token);
        setUser({ email: "", password: "" });
        navigate('/');
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <>
      <main>
        <section >
          <div className="section-registration">
            <div className="container grid grid-two-cols">

              <div className="registration-image">
                <img src="/images/login.png" alt="lets fill the login form"
                  width={500} height={500} />
              </div>

              <div className="registration-form">
                <h1 className='main-heading'>Login</h1>
                <form onSubmit={handleSubmit} className='main-form'>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name='email'
                      id="email"
                      placeholder='Enter your email'
                      autoComplete='off'
                      required
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div className='displayPassword'>
                    <label htmlFor="password">Password</label>
                    <input
                      type={showpassword ? "text" : "password"}
                      name='password'
                      id="password"
                      placeholder='Enter your password'
                      autoComplete='off'
                      required
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
                  <button type="submit" className='btn btn-submit'>Login</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Login
