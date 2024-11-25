import { useState, useEffect } from 'react';
import {authentification} from "../../services/ServiceUser"
import { useNavigate } from 'react-router-dom';
import './FormRegistrationGuest.css';

function FormRegistration() {
    const navigator = useNavigate()
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
  
    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = sessionStorage.getItem("token");
                if (token) {
                    navigator("/user");
                }
            } catch (e) {
                console.log("No token or error occurred: " + e);
            }
        };
  
        checkToken(); 
    }, []);
  
    const handleSubmit = async (e) => {
        e.preventDefault(); 
  
        try {
            const token = await authentification(user.firstName,user.lastName,user.email,user.password); 
            if (token) {
                sessionStorage.setItem("token", token);
                navigator("/user");
            } else {
                alert("Registration failed");
            }
        } catch (error) {
            alert("An error occurred during registration: " + error.message);
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [id]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className='form-reg'>
            <div>
                <label htmlFor="firstName">First Name: </label>
                <input 
                    type="text" 
                    id="firstName" 
                    value={user.firstName} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <br />
            <div>
                <label htmlFor="lastName">Last Name: </label>
                <input 
                    type="text" 
                    id="lastName" 
                    value={user.lastName} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <br />
            <div>
                <label htmlFor="email">Email: </label>
                <input 
                    type="email" 
                    id="email" 
                    value={user.email} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <br />
            <div>
                <label htmlFor="password">Password: </label>
                <input 
                    type="password" 
                    id="password" 
                    value={user.password} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <br />
            <button type="submit">Create account</button>
        </form>
    );
}
export default FormRegistration;
