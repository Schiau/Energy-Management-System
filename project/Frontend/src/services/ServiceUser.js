const API_BASE_URL = 'http://localhost:8080/api/v1';

// Fetch all users
async function GetAll() {
    const response = await fetch(`${API_BASE_URL}/user/all`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    if (response.ok) {
        return await response.json();
    }
    throw new Error("Error fetching users");
}

// Fetch user by ID
async function GetUserById(id) {
    const response = await fetch(`${API_BASE_URL}/user/${id}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    if (response.ok) {
        return await response.json();
    }
    throw new Error("User not found");
}

// Add a new user
async function addNew(user) {
    console.log(user)
    const response = await fetch(`${API_BASE_URL}/user`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(user)
    });
    const data = await response.json();
    if (response.ok && data.success) {
        return data;
    }
    throw new Error(data.message || "Error adding user");
}

// Update user by ID
async function update(user, id) {
    const response = await fetch(`${API_BASE_URL}/user/${id}`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(user)
    });
    const data = await response.json();
    if (response.ok && data.success) {
        return data;
    }
    throw new Error(data.message || "User not found or error updating");
}

// Delete user by ID
async function remove(id) {
    const response = await fetch(`${API_BASE_URL}/user/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    if (response.ok) {
        return "User deleted";
    }
    throw new Error("Error deleting user");
}

// Login function
async function logIn(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/authenticate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok && data.success) {
        localStorage.setItem('token', data.token);
        return data.token;
    }
    throw new Error(data.error || "Error registering user");
}

// Register (authentication) function
async function authentification(firstName, lastName, email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password })
    });
    const data = await response.json();
    if (response.ok && data.success) {
        localStorage.setItem('token', data.token);
        return data.token;
    }
    throw new Error(data.error || "Error registering user");
}

// Get role from token
async function getRollFromToken() {
    const response = await fetch(`${API_BASE_URL}/user/role`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await response.json();
    return response.ok ? data.admin : Promise.reject("Error retrieving role");
}


async function getUserByToken() {
    const response = await fetch(`${API_BASE_URL}/user`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` ,        headers: { 'Content-Type': 'application/json' }}
    });
    if (response.ok) {
        return await response.json();
    }
    throw new Error("Error fetching user by token");
}

export { GetAll, GetUserById, addNew, update, getRollFromToken, remove, logIn, getUserByToken, authentification };
