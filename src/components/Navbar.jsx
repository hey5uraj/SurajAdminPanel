import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useAuth } from '../store/auth';
import LogoIcon from '../icons/LogoIcon';
import LogoIcon2 from '../icons/LogoIcon2';


const Navbar = () => {

    const { user } = useAuth();

    const [showMenu, setShowMenu] = useState(false);

    const handleBtnToggle = () => {
        setShowMenu(!showMenu);
    }

    const { isLoggedIn } = useAuth();

    // console.log("dddddddddd",user)

    return (
        <>
            <header>
                <div className="container navContainer">
                    <div className="log-brand">
                        {
                            isLoggedIn ? (
                                <NavLink to="/" className="logo">{user.username}</NavLink>
                            ) : (
                                // <NavLink to="/" className="logo"> <span> <LogoIcon/></span></NavLink>
                                // <NavLink to="/" className="logo"> <span> <LogoIcon2/></span></NavLink>
                                <NavLink to="/" className="logo">Your Logo</NavLink>

                            )
                        }
                    </div>

                    <nav className={showMenu ? "menu-mobile" : "menu-web"}  >
                        <ul>
                            <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
                            <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink></li>
                            <li><NavLink to="/service" className={({ isActive }) => isActive ? 'active' : ''}>Service</NavLink></li>
                            <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink></li>
                            {
                                isLoggedIn ? (

                                    <li><NavLink to="/logout" className={({ isActive }) => isActive ? 'active' : ''}>Logout</NavLink></li>
                                ) : (
                                    <>
                                        <li><NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>SignUp</NavLink></li>
                                        <li><NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Login</NavLink></li>
                                    </>
                                )
                            }
                        </ul>
                    </nav>

                    <div className="ham-menu">
                        <button onClick={handleBtnToggle}>
                            <MenuOutlinedIcon />
                        </button>
                    </div>

                </div>
            </header>
        </>
    )
}

export default Navbar
