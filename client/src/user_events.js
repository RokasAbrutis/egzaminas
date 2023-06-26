import {useState, useEffect} from 'react'

export default function User_events() {

    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [date, setDate] = useState("")
    const [address, setAddress] = useState("")
    const [image, setImage] = useState("")
    const [message, setMessage] = useState("")
    const [data, setData] = useState("")
    const [page, setPage] = useState("index")
    const [pageProps, setPageProps] = useState("")

    const createEvent = async (e) => {
        e.preventDefault();
        
        let user = JSON.parse(localStorage.getItem('user')).email

        await fetch("http://localhost:5000/create_event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, category, date, address, user }),
        })

            .then((response) => response.json()).then((data) => {
                setMessage(data.message)
                setPage('index')
                getAllUserEvents()
            })
            .catch((error) => {
                // handle error
            });
    }

    const getAllUserEvents = async () => {

        let user = JSON.parse(localStorage.getItem('user')).email

        await fetch("http://localhost:5000/user_events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user }),
        })

            .then((response) => response.json()).then((data) => {
                setData(data)
            })
            .catch((error) => {
                // handle error
            });
    }

    const editEvent = async (e, id) => {
        e.preventDefault();
        await fetch("http://localhost:5000/edit_event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, name, category, date, address }),
        })

            .then((response) => response.json()).then((data) => {
                setPage("index")
               setMessage(data.message)
               getAllUserEvents();
            })
            .catch((error) => {
                // handle error
            });
    }


    const createEventPage = () => {
        return (
            <form onSubmit={createEvent}>
                <label>Name</label>
                <input type="text" onChange={(e) => setName(e.target.value)}></input>
                <label>Categoty</label>
                <input type="text" onChange={(e) => setCategory(e.target.value)}></input>
                <label>Date</label>
                <input type="date" onChange={(e) => setDate(e.target.value)}></input>
                <label>Address</label>
                <input type="text" onChange={(e) => setAddress(e.target.value)}></input>
                {/* <label>Image</label>
                <input type="file" onChange={(e) => setImage(e.target.files[0])}></input> */}
                <button type="submit">Create Event</button>
            </form>
        )
    }

    const editEventPage = () => {

        // data.forEach(element => {
        //     if (element.id == pageProps) {
        //         setName(element.name)
        //         setCategory(element.category)
        //         setDate(element.date)
        //         setAddress(element.address)
        //     }
        // });

        return (
            <form onSubmit={(e) => editEvent(e, pageProps)}>
                <label>Name</label>
                <input type="text" onChange={(e) => setName(e.target.value)} value={name}></input>
                <label>Categoty</label>
                <input type="text" onChange={(e) => setCategory(e.target.value)} value={category}></input>
                <label>Date</label>
                <input type="date" onChange={(e) => setDate(e.target.value)} value={date}></input>
                <label>Address</label>
                <input type="text" onChange={(e) => setAddress(e.target.value)} value={address}></input>
                {/* <label>Image</label>
                <input type="file" onChange={(e) => setImage(e.target.value)} value={image}></input> */}
                <button type="submit">Update Event</button>
            </form>
        )
    }

    const deleteEvent = async (id) => {
        await fetch("http://localhost:5000/event_delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        })

            .then((response) => response.json()).then((data) => {
                getAllUserEvents();
                setMessage(data.message)
            })
            .catch((error) => {
                // handle error
            });
    }

    const setEditPage = (id) => {
        setPage('edit')
        setPageProps(id)
    }

    const allUserEvents = () => {
        console.log('working')
        return (
            <>  
                {
                data.map((item) => {
                    return (
                        <div key={item.id}>
                            <span>Name: {item.name}</span>
                            <span>Category: {item.category}</span>
                            <span>Date: {item.date}</span>
                            <span>Address: {item.address}</span>
                            <span>Votes: {item.votes}</span>
                            <button onClick={() => setEditPage(item.id)}>Edit</button>
                            <button onClick={() => deleteEvent(item.id)}>Delete</button>
                        </div>
                    )
                })
                
                }
            </>
        )
    }


    useEffect(() => {
        getAllUserEvents();
    }, [])
    
    if(page == "index") {
        return (
            <>
                {message ? <span>{message}</span> : ''}
                <button onClick={() => setPage('create')}>Create event</button>
                {data ? allUserEvents() : ''}
            </>
        )
    } else if (page == "edit") {
        return (
            <>
                {message ? <span>{message}</span> : ''}
                {editEventPage()}
            </>
        )
    } else if (page == "create") {
    return (
        <>
            {message ? <span>{message}</span> : ''}
            {createEventPage()}
        </>
    )
    }
}