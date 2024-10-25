import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Stylesheet.css';

function FormRegistration({ initialUser = {}, onSubmit, isAdmin = false}) {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: ""
    });

    useEffect(() => {
        if (Object.keys(initialUser).length > 0) {
            setUser(initialUser);
        }
    }, [initialUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(user); 
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
            {isAdmin && (
                <>
                 <div>
                    <label htmlFor="role">Role: </label>
                    <select 
                        id="role" 
                        value={user.role} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                </div>
                <br />
                </>
            )}
            <button type="submit">{Object.keys(initialUser).length > 0 ? 'Update' : 'Submit'}</button>
        </form>
    );
}

FormRegistration.propTypes = {
    initialUser: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string,
    }),
    onSubmit: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool
};

export default FormRegistration;
