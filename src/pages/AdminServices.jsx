import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import DeleteConfirmation from '../components/DeleteConfirmation';
// import { NavLink } from 'react-router-dom';


const AdminServices = () => {
  const URL = "https://surajadminpanel.netlify.app/api/admin/service"
  const DeleteURL = "https://surajadminpanel.netlify.app/api/admin/service/delete"

  const { authorizationToken } = useAuth();
  const [serviceData, setServiceData] = useState([]);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState();



  const getAllServicesData = async () => {
    try {
      const res = await fetch(URL, {
        method: 'GET',
        headers: {
          Authorization: authorizationToken,
        },
      })
      if (res.ok) {
        const data = await res.json();
        setServiceData(data);
        // console.log("serive", data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllServicesData();
  }, [])


  const handleDeleteModal = (id) => {
    setDeleteModal(prev => !prev);
    if (id !== null) {
      setDeleteId(id);
    }
  }


  const handleServiceDelete = async (id) => {
    try {
      const res = await fetch(`${DeleteURL}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: authorizationToken,
        },
      })
      const data = await res.json();
      if (res.ok) {
        getAllServicesData();
        toast.success("Delete Successful");
      } else {
        toast.error("Delete Failed");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllServicesData();
  }, []);



  return (
    <>
      <section className='admin-user-section'>
        <div className="heading">
          <h1>Admin Service panel</h1>
          {/* <NavLink to='/addService'>
          <button>Add Serice</button>
          </NavLink> */}
        </div>
        <div className="container admin-users admin-users2">
          <table>
            <thead>
              <tr>
                <td>Provider</td>
                <td>Service</td>
                <td>Price</td>
                <td>Description</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
            {serviceData.length > 0 ? (
              serviceData.map((user, index) => (
                <tr key={index}>
                  <td>{user.provider}</td>
                  <td>{user.service}</td>
                  <td>{user.price}</td>
                  <td>{user.description}</td>
                  <td>
                    <span>
                      <EditIcon />
                    </span>
                    <span onClick={() => handleDeleteModal(user._id)}>
                          <DeleteIcon />
                        </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No Serivces found.
                </td>
              </tr>
            )}
            </tbody>

          </table>


        </div>

      </section>


      <DeleteConfirmation
        onCancel={handleDeleteModal}
        onConfirm={() => { handleServiceDelete(deleteId); handleDeleteModal() }}
        open={deleteModal}>
        <h2>Delete Service</h2>
        <p>Are you sure you want to delete this Service?</p>

      </DeleteConfirmation>

    </>
  )
}

export default AdminServices
