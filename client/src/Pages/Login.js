import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    // State to hold form data
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page

        try {
            // Send POST request to backend
            const response = await axios.post('http://localhost:4000/auth/login', {email, password});
            
            console.log('Response Data:', response.data);
            
            // Check if login was successful
            if (response.data.status === 'success') {
                // Save token or other user data in localStorage if needed
                localStorage.setItem('authToken', response.data.token);

                // Navigate to the home page
                navigate('/');
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login Error:', error);
            alert('An error occurred while logging in.');
        }

        // Optionally, clear the form fields after submission
        setEmail('');
        setPassword('');
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="bg-white p-3 rounded w-25">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-center">Sign In</h2>

                    <div className="mb-2">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-warning rounded-0 w-100">Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
