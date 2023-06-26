import {useState, useEffect} from 'react'

export default function Login() {

    const [page, setPage] = useState("login")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [message, setMessage] = useState("")

    const login = (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        }).then((res) => res.json()).then((data) => {
            if (data.length > 1) {
                localStorage.setItem("user", JSON.stringify(data[1]));
                window.location.replace("/");
            } else {
                setMessage(data.message)
            }

        })

    }

    const register = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, repeatPassword }),
        })

            .then((response) => response.json()).then((data) => {
                setMessage(data.message)
                if (data.message == "Created succesfully") {
                    localStorage.setItem("user", JSON.stringify(data.session))
                    window.location.replace("/");
                }
            })
            .catch((error) => {
                // handle error
            });
    }   



    const loginPage = () => {
        return (
            <>
                <form onSubmit={login}>
                    <label>Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)}></input>
                    <label>Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
                    <button type="submit">Login</button>
                </form>
                <a href="#" onClick={changePage}>Register</a>
            </>
        )
    }

    const registerPage = () => {
        return (
            <>
                <form onSubmit={register}>
                    <label>Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)}></input>
                    <label>Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
                    <label>Repeat password</label>
                    <input type="password" onChange={(e) => setRepeatPassword(e.target.value)}></input>
                    <button type="submit">Register</button>
                </form>
                <a href="#" onClick={changePage}>Login</a>
            </>
        )
    }

    const changePage = (e) => {
        e.preventDefault();

        if(page == "login") {
            setPage("register")
        } else {
            setPage("login")
        }
    }

    return (
        <>  
            {message ? <span>{message}</span> : ''}
            {page == "login" ? loginPage() : registerPage()}
        </>
    )
}