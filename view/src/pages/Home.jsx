import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import './Home.css'


const Home = () => {
    return (
        <div> 
            <ul className="menu">
                <Link className="user" to="/user">user</Link>
                <Link className="email" to="/email">email</Link>
                <Link className="password" to="/password">password</Link>
                <Link className="wait" to="/wait">wait</Link>
            </ul>
        </div>
    )
}

export default Home
