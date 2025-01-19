import React from 'react'
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';


const AddServices = () => {

    // const URL = "https://surajadminpanel.netlify.app/api/form/addService"
    const URL = ""


    const defaultServiceFormData = {
        provider: "",
        price: "",
        service: "",
        description: ""
    }
    const { user } = useAuth();

    const [service, setService] = useState(defaultServiceFormData);

    const [userData, setUserData] = useState(true);

    if (userData && user) {
        setService({
            provider: user.provider,
            price: user.price,
            service: user.price,
            description: ""
        })
        setUserData(false);
    }


    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value
        setService({
            ...service,
            [name]: value
        })
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(service)
      })

      if (res.ok) {
        // setContact((prevService) => ({
        //   ...prevService,
        //   description: "", 
        // }));
        toast.success("Message sent successfully");
      } 
    //   else {
    //     const errorData = await res.json();
    //     toast.error(errorData.message || "Failed to send message");
    //   }
    } catch (error) {
      console.log(error);
    }
  }



    return (
        <>
            <main>
                <section>
                    <div className="section-registration">
                        <div className="container">

                            <div className="registration-form">
                                <h1 className='main-heading'>Add Serive</h1>
                                <form onSubmit={handleSubmit} className='main-form'>
                                    <div>
                                        <label htmlFor="provider">Provider:</label>
                                        <input
                                            type="text"
                                            id="provider"
                                            name="provider"
                                            placeholder='Enter your provider'
                                            autoComplete='off'
                                            required
                                            value={service.provider}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="price">Price:</label>
                                        <input
                                            type="text"
                                            id="price"
                                            name="price"
                                            placeholder='Enter your price'
                                            autoComplete='off'
                                            required
                                            value={service.price}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="service">Service:</label>
                                        <input
                                            type="text"
                                            id="service"
                                            name="service"
                                            placeholder='Enter your service'
                                            autoComplete='off'
                                            required
                                            value={service.service}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="description">Description:</label>
                                        <textarea
                                            type="text"
                                            id="description"
                                            name="description"
                                            autoComplete='off'
                                            placeholder='Please Enter Your description'
                                            required
                                            value={service.description}
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

            </main>
        </>
    )
}

export default AddServices
