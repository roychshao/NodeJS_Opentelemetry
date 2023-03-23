import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Password = () => {

    const [data, setData] = useState({})

    useEffect(() => {
        axios.get('http://localhost:3000/api/password')
            .then((response) => {
                console.log(response);
                setData(response.data);
            });
    },[])

    return (
        <div>
            <Link to="/">Home</Link>
            <p>{JSON.stringify(data)}</p>
        </div>
    )
}

export default Password
