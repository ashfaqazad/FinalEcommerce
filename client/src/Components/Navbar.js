import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure Bootstrap Icons are imported
import Cookies from 'js-cookie';  // For managing authentication token
import axios from 'axios'




const Navbar = () => {
    const [authToken, setAuthToken] = useState(null);
  


    const { state, dispatch } = useAppContext();
    const basketLength = state.basket ? state.basket.length : 0; // Handle undefined basket case
    const navigate = useNavigate();


    useEffect(() => {
        const token = Cookies.get('token');
        setAuthToken(token);
    }, [authToken]);


    const handleLogout = () => {

        axios.get('http://localhost:5000/auth/logout', { withCredentials: true })
            .then(response => {
                if (response.data.status) {
                    console.log(response.data.msg);
                    Cookies.remove('token'); // Remove token from cookies
                    setAuthToken(null); // Update state
                    navigate('/login'); // Redirect to login page
                }
            })
            .catch(error => {
                console.error('Error during logout:', error);
            });

        dispatch({ type: 'LOGOUT' });

        Cookies.remove('token');  // Removes token from cookies
        navigate('/');  // Redirect to home page


    };






    return (

        <>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    {/* Navbar Brand */}
                    <Link className="navbar-brand text-white fw-bold fst-italic" to="/">eSHOP</Link>

                    {/* Toggle Button */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navbar Links */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* Left Side Links */}
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/">Home</Link>
                            </li>





                            <div className=''>

                                {authToken && (

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/MyOrders">My Orders</Link>
                                    </li>
                                )}

                            </div>
                        </ul>

                        {/* Centered Search Bar with Icon */}
                        <div className="d-flex justify-content-center flex-grow-1">
                            <div className="input-group w-100 me-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search here..."
                                    aria-label="Search"
                                />
                                <span className="input-group-text bg-warning">
                                    <i className="bi bi-search"></i> {/* Search Icon */}
                                </span>
                            </div>
                        </div>

                        <div>

                            {/* Basket Link */}
                            {authToken ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white d-flex align-items-center" to="/cart">
                                            <i className="bi bi-basket2 me-2 text-white"></i>
                                            <span>{basketLength}</span>
                                        </Link>
                                    </li>


                                    {/* Logout button */}
                                    <button onClick={handleLogout} className="btn bg-white text-danger mx-1" style={{ textDecoration: 'none' }}>Logout</button>
                                </>

                            ) : (


                                <>
                                    {/* Right Side Buttons */}

                                    <div className='d-flex'>
                                        <button
                                            onClick={() => navigate('/login')}
                                            className="btn bg-white text-success mx-1"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            Login
                                        </button>
                                        {/* Signup button - opens SignupModal */}
                                        <button
                                            onClick={() => navigate('/signup')}
                                            className="btn bg-white text-success mx-1"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            Signup
                                        </button>
                                    </div>
                                </>
                            )}

                        </div>

                    </div>
                </div>
            </nav>

        </>


    );
};

export default Navbar;
