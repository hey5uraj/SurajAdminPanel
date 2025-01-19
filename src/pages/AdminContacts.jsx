import React, { useState, useEffect } from 'react'
import { useAuth } from '../store/auth';
// import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmation from '../components/DeleteConfirmation'
import { toast } from 'react-toastify';



const AdminContacts = () => {
  const URL = "https://surajadminpanel.netlify.app/api/admin/contacts"
  const DeleteURL = "https://surajadminpanel.netlify.app/api/admin/contacts/delete"

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const { authorizationToken } = useAuth();
  const [contactData, seContactData] = useState([]);

  const handleDeleteModal = (id) => {
    setDeleteModal(prev => !prev);
    if (id !== null) {
      setDeleteId(id);
    }
  }



  const getAllContactData = async () => {
    try {
      const res = await fetch(URL, {
        method: 'GET',
        headers: {
          Authorization: authorizationToken,
        },
      })
      if (res.ok) {
        const data = await res.json();
        seContactData(data || []);
        // console.log("suraj", data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   getAllContactData();
  // }, [])




  const handleContactDelete = async (id) => {
    try {
      const res = await fetch(`${DeleteURL}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: authorizationToken,
        },
      })
      const data = await res.json();
      console.log(`User after ${data} deleted successfully.`);
      getAllContactData();
      toast.success("Delete Successful");

    } catch (error) {
      console.error(error);
      toast.error("Delete Failed");
    }
  }

  useEffect(() => {
    getAllContactData();
  }, []);



  return (
    <>
      <section className='admin-user-section'>
        <div className="heading">
          <h1>Admin Contact panel</h1>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Email</td>
                <td>Message</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {contactData.length > 0 ? (
                contactData.map((user, index) => (
                  <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.message}</td>
                    <td>
                      <span>
                        {/* <EditIcon /> */}
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
                    No Contacts found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </section>


      <DeleteConfirmation
        onCancel={handleDeleteModal}
        onConfirm={() => { handleContactDelete(deleteId); handleDeleteModal() }}
        open={deleteModal}>
        <h2>Delete Contact</h2>
        <p>Are you sure you want to delete this Contact?</p>

      </DeleteConfirmation>

    </>
  )
}

export default AdminContacts

