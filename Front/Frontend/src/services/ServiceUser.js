let lastId = 5; 
let mockData = [
    {
        id: 0,
        firstName: "John",
        lastName: "Doe",
        email: "john10.doe@altmail.com",
        password: "SecurePassword123",
        role: "USER"
    },
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john10.doe@altmail.com",
        password: "SecurePassword123",
        role: "USER"
    },
    {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@altmail.com",
        password: "Password456",
        role: "ADMIN"
    },
    {
        id: 3,
        firstName: "Emily",
        lastName: "Johnson",
        email: "emily.johnson@altmail.com",
        password: "MySecurePass789",
        role: "USER"
    },
    {
        id: 4,
        firstName: "Michael",
        lastName: "Brown",
        email: "michael.brown@altmail.com",
        password: "PassWord987",
        role: "USER"
    },
    {
        id: 5,
        firstName: "David",
        lastName: "Miller",
        email: "david.miller@altmail.com",
        password: "StrongPass123",
        role: "ADMIN"
    }
];

async function GetAll() {
    return mockData;
}

async function GetUserById(id) {
    const userFound = mockData.find(u => u.id === id);
    return userFound ? userFound : {}
}

async function addNew(user) {
    lastId++; 
    const newUser = { ...user, id: lastId }; 
    mockData.push(newUser); 
    console.log(mockData)
    return newUser; 
}

async function update(user, id) {
    const userIndex = mockData.findIndex(u => u.id === id);
    if (userIndex === -1) {
        return "No user found"; 
    }
    mockData[userIndex] = { ...user, id };
    return mockData[userIndex]; 
}

async function getRollFromToken(token) {
    return token
}

async function remove(id) {
    mockData = mockData.filter(u => u.id !== id);  
}

// eslint-disable-next-line no-unused-vars
async function getUserByToken(token) {
    return mockData[5];
}


async function logIn(name, password) {
    const user = mockData.find(u => u.email === name && u.password === password);
    return user ? "token": null
}

async function authentification(firstName, lastName,email, password) {
    const user =     {
        id: ++lastId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role: "USER"
    }
    mockData.concat(user)
    return "token"
}



export { GetAll, GetUserById, addNew, update, getRollFromToken, remove, logIn, getUserByToken, authentification };
