import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {getCurrentUser, logout} from "../../auth/AuthService";
import IUser from "../../models/UserModel";
export const Navbar = () => {
    const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

    useEffect(() => {
        const user = getCurrentUser();


        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const logOut = () => {
        logout();
        setCurrentUser(undefined);
    };

    return (
        <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
            <div className='container-fluid'>
                <span className='navbar-brand'>Eric Book Shop</span>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNavDropdown'
                    aria-controls='navbarNavDropdown'
                    aria-expanded='false'
                    aria-label='Toggle Navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/'>Home</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/search'>Search Books</NavLink>
                        </li>
                        {currentUser &&
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='/shelf'>Shelf</NavLink>
                            </li>
                        }
                    </ul>
                </div>
                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink to={"/profile"} className="nav-link">
                                {currentUser.username}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                LogOut
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink to={"/login"} className="nav-link">
                                Login
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to={"/register"} className="nav-link">
                                Sign Up
                            </NavLink>
                        </li>
                    </div>
                )}
            </div>
        </nav>
    );
};
