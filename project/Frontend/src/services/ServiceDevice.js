const BASE_URL = "http://microservice2.localhost";
//http://microservice2.localhost
//http://localhost:8081
const getAuthHeaders = () => {
    const token = sessionStorage.getItem('token');
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
};

const handleFetchError = async (response) => {
    if (!response.ok) {
        const errorMessage = await response.text(); // Get error message from response
        throw new Error(`Error ${response.status}: ${errorMessage}`);
    }
    return response.json();
};

async function GetAll() {
    const response = await fetch(`${BASE_URL}/devices`, getAuthHeaders());
    return handleFetchError(response);
}

async function GetDeviceById(id) {
    const response = await fetch(`${BASE_URL}/devices/${id}`, getAuthHeaders());
    return handleFetchError(response);
}

async function addNew(device) {
    const response = await fetch(`${BASE_URL}/devices`, {
        ...getAuthHeaders(),
        method: "POST",
        body: JSON.stringify(device)
    });
    return handleFetchError(response);
}

async function Update(device, id) {
    const response = await fetch(`${BASE_URL}/devices/${id}`, {
        ...getAuthHeaders(),
        method: "PUT",
        body: JSON.stringify(device)
    });
    return handleFetchError(response);
}

async function Remove(id) {
    await fetch(`${BASE_URL}/devices/${id}`, {
        ...getAuthHeaders(),
        method: "DELETE"
    });
}

async function GetUnassignedDevices() {
    const response = await fetch(`${BASE_URL}/devices/unsigned`, getAuthHeaders());
    return handleFetchError(response);
}

async function GetDevicesByUserId(userId) {
    const response = await fetch(`${BASE_URL}/devices/signed/${userId}`, getAuthHeaders());
    return handleFetchError(response);
}

async function AddDeviceToUser(deviceId, userId) {
    console.log(`${BASE_URL}/devices/${deviceId}/assign/${userId}`)
    const response = await fetch(`${BASE_URL}/devices/${deviceId}/assign/${userId}`, {
        ...getAuthHeaders(),
        method: "POST"
    });
    return handleFetchError(response);
}

async function RemoveDeviceFromUser(deviceId) {
    const response = await fetch(`${BASE_URL}/devices/assign/${deviceId}`, {
        ...getAuthHeaders(),
        method: "DELETE"
    });
    return handleFetchError(response);
}



export { 
    GetAll, 
    GetDeviceById, 
    addNew, 
    Update, 
    Remove,
    GetDevicesByUserId, 
    GetUnassignedDevices, 
    AddDeviceToUser, 
    RemoveDeviceFromUser
}
