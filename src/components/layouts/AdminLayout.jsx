import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useAuth } from '../../store/auth';


const AdminLayout = () => {
  const { user } = useAuth();
  console.log("admin", user)


  // if(isLoading) {
  //   return <div>Loading...</div>;
  // }
  if (!user.isAdmin) {
    return <div
      style={{
        width: '100%',
        height: `calc(100vh - 37vh)`,
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center'
      }}>

      <p style={{ textAlign: "center", color: "red" }}>
        You do not have permission to view this data.
      </p>
    </div>
  }

  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul>
              <li className='AdminNavList'><NavLink to="/admin/users"><PersonIcon />Users</NavLink></li>
              <li className='AdminNavList'><NavLink to="/admin/contacts"><ContactPageIcon />Contacts</NavLink></li>
              <li className='AdminNavList'><NavLink to="/admin/services"><ListAltIcon />Services</NavLink></li>
            </ul>
          </nav>
        </div>
      </header>
      <div className='PageContainer'>
        <Outlet />
      </div>
    </>
  )
}

export default AdminLayout
