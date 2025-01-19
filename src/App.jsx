import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Service from './pages/Service';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorPage from './pages/ErrorPage';
import { Logout } from './pages/Logout';
import AdminLayout from './components/layouts/AdminLayout';
import AdminUsers from './pages/AdminUsers';
import AdminContacts from './pages/AdminContacts';
import AdminServices from './pages/AdminServices';
import AdminUserUpdate from './pages/AdminUserUpdate';


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          <Route path='/admin' element={<AdminLayout />}>
            <Route path='users' element={<AdminUsers />} />
            <Route path="users/:id/edit" element={<AdminUserUpdate />} />
            <Route path='contacts' element={<AdminContacts />} />
            <Route path='services' element={<AdminServices />} />
          </Route>

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
