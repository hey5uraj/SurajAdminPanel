import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmation from '../components/DeleteConfirmation'
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';


const AdminUsers = () => {
  const URL = "https://surajadminpanel.netlify.app/api/admin/users"
  const DeleteURL = "https://surajadminpanel.netlify.app/api/admin/users/delete"

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const { authorizationToken } = useAuth();
  const [userData, seUserData] = useState([]);


  const getAllUsersData = async () => {
    try {
      const res = await fetch(URL, {
        method: 'GET',
        headers: {
          Authorization: authorizationToken,
        },
      })
      if (res.ok) {
        const data = await res.json();
        seUserData(data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllUsersData();
  }, [])



  const handleDeleteModal = (id) => {
    setDeleteModal(prev => !prev);
    if (id !== null) {
      setDeleteId(id);
    }
  }


  const handleUserDelete = async (id) => {
    try {
      const res = await fetch(`${DeleteURL}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: authorizationToken,
        },
      })
      const data = await res.json();
      console.log(`User after ${data} deleted successfully.`);
      toast.success("Delete Successful");
      if (res.ok) {
        getAllUsersData();
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllUsersData();
  }, []);




  return (
    <>
      <section className='admin-user-section'>
        <div className="heading">
          <h1>Admin Users panel</h1>
        </div>


        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Action</td>
              </tr>
            </thead>

            <tbody>
              {userData.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <span>
                      <NavLink to={`/admin/users/${user._id}/edit`}>
                      <EditIcon />
                      </NavLink>
                    </span>
                    <span onClick={() => handleDeleteModal(user._id)}>
                      <DeleteIcon />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>


        </div>

      </section>

      <DeleteConfirmation
        onCancel={handleDeleteModal}
        onConfirm={() => { handleUserDelete(deleteId); handleDeleteModal() }}
        open={deleteModal}>
        <h2>Delete User</h2>
        <p>Are you sure you want to delete this User?</p>

      </DeleteConfirmation>
    </>
  )
}

export default AdminUsers
