import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh

        const formData = { username, email, password };

        try {
            const response = await axios.post('http://localhost:4000/auth/signup', formData);

            console.log(response.data);
            if (response.data.status) {
                navigate('/'); // Navigate to the home page on successful signup
            } else {
                console.error('Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }

        // Clear form fields after submission
        setUsername('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="bg-white p-3 rounded w-25">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-center">Sign Up</h2>

                    <div className="mb-2">
                        <label htmlFor="username">User Name</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter Username"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

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

                    <button type="submit" className="btn btn-warning rounded-0 w-100">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
