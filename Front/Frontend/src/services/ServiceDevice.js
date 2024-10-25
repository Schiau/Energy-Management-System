// Device mock data
let lastDeviceId = 6; // Starting ID for devices
let mockDevices = [
    {
        id: 0,
        name: 'Smart Thermostat',
        location: 'Living Room',
        energyConsumption: '120',
        description: 'Automatically adjusts temperature for comfort and efficiency.'
    },
    {
        id: 1,
        name: 'Smart Light',
        location: 'Bedroom',
        energyConsumption: '60',
        description: 'A dimmable, color-changing smart light bulb.'
    },
    {
        id: 2,
        name: 'Smart Plug',
        location: 'Kitchen',
        energyConsumption: '25',
        description: 'Allows remote control of appliances and monitors power usage.'
    },
    {
        id: 3,
        name: 'Security Camera',
        location: 'Front Yard',
        energyConsumption: '40',
        description: 'Captures HD video and provides real-time alerts.'
    },
    {
        id: 4,
        name: 'Smart Door Lock',
        location: 'Main Door',
        energyConsumption: '10',
        description: 'Keyless entry system with remote control and monitoring.'
    },
    {
        id: 5,
        name: 'Smart Speaker',
        location: 'Office',
        energyConsumption: '30',
        description: 'Voice-activated assistant with multi-room audio capability.'
    }
];

// Device service functions

async function GetAll() {
    return mockDevices; // Returns all mock devices
}

async function GetDeviceById(id) {
    const deviceFound = mockDevices.find(device => device.id === id);
    return deviceFound ? deviceFound : {}; // Returns the device if found, or an empty object
}

async function addNew(device) {
    lastDeviceId++; 
    const newDevice = { ...device, id: lastDeviceId }; 
    mockDevices.push(newDevice); 
    console.log(mockDevices);
    return newDevice; 
}

async function Update(device, id) {
    const deviceIndex = mockDevices.findIndex(d => d.id === id);
    if (deviceIndex === -1) {
        return "No device found"; 
    }
    mockDevices[deviceIndex] = { ...device, id }; // Update the device with the new data
    return mockDevices[deviceIndex]; 
}

async function Remove(id) {
    mockDevices = mockDevices.filter(device => device.id !== id); // Remove device by ID
}

// Device-User Mapping (deviceId => userId)
let deviceUserMapping = {
    0: 3, // 'Smart Thermostat' belongs to user with ID 3
    1: 1, // 'Smart Light' belongs to user with ID 1
    4: 4  // 'Smart Door Lock' belongs to user with ID 4
}; 

async function GetDevicesByUserId(userId) {
    const userDevices = mockDevices.filter(device => deviceUserMapping[device.id] === userId);
    return userDevices;
}

async function GetUnassignedDevices() {
    const unassignedDevices = mockDevices.filter(device => !(device.id in deviceUserMapping));
    return unassignedDevices;
}

async function AddDeviceToUser(deviceId, userId) {
    if (deviceUserMapping[deviceId] == undefined)
        deviceUserMapping[deviceId] = userId;
}

async function RemoveDeviceFromUser(deviceId) {
    console.log(deviceId)
    if (!(deviceId in deviceUserMapping)) {
        return;
    }
    delete deviceUserMapping[deviceId]; 
}

function get()
{
    return deviceUserMapping
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
    RemoveDeviceFromUser,
    get
}
