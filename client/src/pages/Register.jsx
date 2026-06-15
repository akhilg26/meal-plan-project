import { useState } from 'react'
import { register } from '../api/auth'
import { useNavigate } from 'react-router-dom'

function Register(){
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        try{
            const response = await register(username, password, email)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('id', response.data.id)
            navigate("/profile")
        }
        catch (error) {
            console.log(error)
        }
    }
    return <div>
        
        <div className='page-title'>
    <h1>Meal Plan Generator</h1>
    <p>Please Register Below to Get Started!</p>
    
        </div>
        <form onSubmit={handleSubmit} style = {{marginBottom: '20px'}}>
            <input type="text" id="username" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></input> <br />
            <input type="text" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input> <br />
            <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input> <br />
            <button type="submit">Register</button>
        </form>
        <p style={{textAlign: 'center'}}>Already have an account? <Link to='/login'>Login</Link></p>
    </div>
}
export default Register