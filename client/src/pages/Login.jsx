import { login } from '../api/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    
    async function handleSubmit(e){
        e.preventDefault() // prevents browser from reloading
        try {
            const response = await login(username, password)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('id', response.data.id)
            navigate("/meal-plan")
        }
        catch (error) {
            console.log(error)
        }
    }
    
    return <div>
    <div className='page-title'>
        <h1>Welcome back!</h1>
        <p>Sign in to your meal plan</p>
        </div>   
    <form onSubmit={handleSubmit}>
<input type="text" id="username" name="username" placeholder="Username" value = {username} onChange={(e) => setUsername(e.target.value)}></input> <br />
<input type="password" id="password" name="password" placeholder="Password" value = {password} onChange={(e) => setPassword(e.target.value)}></input> <br />
<button type="submit">Login</button>
    </form>
    </div>
}
export default Login