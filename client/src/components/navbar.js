
import {useState, useEffect} from 'react';

export default function Navbar() {

    const [user, setUser] = useState("")

    const currentUsersRole = async () => {
        if (localStorage.getItem('user')){
            let email = JSON.parse(localStorage.getItem('user')).email
        
        await fetch("http://localhost:5000/current_user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        })

            .then((response) => response.json()).then((data) => {
                setUser(data)
            })
            .catch((error) => {
                // handle error
            });
        }
    }

    useEffect(() => {
        currentUsersRole()
    }, [])

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('user')
        setUser("")
    }
    
    return (
        <>
            <ul>
                <li>
                    <a href="/">Home</a>    
                </li>
                {user ? <li><a href="#" onClick={logout}>Logout</a></li> : <li><a href="/login">Login</a></li>}
                {user ? <li>
                    <a href="/user_events">My events</a>
                </li> : ''}
                {user.role == 'admin' ? <li>
                    <a href="/admin/events">Event administration</a>
                </li> : ''}
            </ul>
        </>
    )
}