import axios from "axios"


async function register(username, password, email){
    try{
        const response = await axios.post('http://localhost:8080/api/auth/register', {username: username, email: email, password: password})
        return response
    } catch (error) {
        throw error
    }
}

async function login(username, password){
    try {
        const response = await axios.post('http://localhost:8080/api/auth/login', {username: username, password: password})
        return response
    }

    catch (error) {
        throw error
    }
}

export {register, login}

