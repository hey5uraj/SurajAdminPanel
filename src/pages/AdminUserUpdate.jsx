import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';


const AdminUserUpdate = () => {

  const params = useParams();
  console.log("Param user:", params);

  const navigate = useNavigate();
  const { authorizationToken } = useAuth();

  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });



  const handleInput = (e) => {

    let name = e.target.name;
    let value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  }


  const getSingleUserData = async () => {
    try {
      const res = await fetch(`https://surajadminpanel.netlify.app/api/admin/users/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await res.json();
      console.log("user single data", data);
      setData(data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSingleUserData();
  }, []);




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://surajadminpanel.netlify.app/api/admin/users/update/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizationToken,
        },
        body: JSON.stringify(data),
      }
      );
      if (res.ok) {
        toast.success("Updated Successfully");
        navigate("/admin/users");
      } else {
        toast.error("Not Updated");
      }
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <>
      <main>
        <section>
          <div className="section-registration">
            <div className="container">

              <div className="registration-form">
                <h1 className='main-heading'>User Update</h1>
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
                      value={data.username}
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
                      value={data.email}
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
                      value={data.phone}
                      onChange={handleInput}
                    />
                  </div>


                  <button type='submit' className='btn btn-submit'>Submit</button>
                </form>
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default AdminUserUpdate

