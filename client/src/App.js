import {useState, useEffect} from 'react'

export default function App() {

    const [page, setPage] = useState("login")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [message, setMessage] = useState("")
    const [user, setUser] = useState("")
    const [eventsData, setEventsData] = useState("")
    const [votes, setVotes] = useState("")

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

    useEffect(() => {
      setUser(localStorage.getItem('user'))
    },[])

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

    const getAllEvents = async () => {
      const response = await fetch("http://localhost:5000/all_events");
      const data = await response.json()
      setEventsData(data)
    }

    const eventsPage = () => {
      return (
        <>
          {
            eventsData.map((item) => {
                return (
                    <div key={item.id}>
                        <span>Name: {item.name}</span>
                        <span>Category: {item.category}</span>
                        <span>Date: {item.date}</span>
                        <span>Address: {item.address}</span>
                        <span>Votes: {item.votes}</span>
                        <button onClick={() => !localStorage.getItem('voted') ? vote(item.id) : ''}>Vote</button>
                    </div>
                )
            })  
          }
        </>
      )
    }

    const vote = async (id) => {
      await fetch("http://localhost:5000/votes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
    })

        .then((response) => response.json()).then((data) => {
           vote2(id, data.votes)
        })
        .catch((error) => {
            // handle error
        });       
    }

    const vote2 = async (id, votes) => {
      await fetch("http://localhost:5000/vote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, votes }),
        })

            .then((response) => response.json()).then((data) => {
                setMessage(data.message)
                if (data.message == "Voted successfully") {
                    localStorage.setItem("voted", "true")
                }
            })
            .catch((error) => {
                // handle error
            });
    }

    const changePage = (e) => {
        e.preventDefault();

        if(page == "login") {
            setPage("register")
        } else {
            setPage("login")
        }
    }

    useEffect(() => {
      getAllEvents();
    }, [])

    return (
        <>  
            {message ? <span>{message}</span> : ''}
            {page == 'login' && !user ? loginPage() : ''}
            {page == 'register' && !user ? registerPage() : ''}
            {user && eventsData ? eventsPage() : ''}
        </>
    )
}