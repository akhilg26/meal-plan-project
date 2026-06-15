import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import MealPlan from "./pages/MealPlan"

function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to ="/register"/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/meal-plan" element={<MealPlan/>}/>
        </Routes>
        </BrowserRouter>    
    )
}

export default App