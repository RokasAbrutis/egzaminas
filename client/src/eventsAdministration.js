
import {useState, useEffect} from 'react'

export default function EventsAdministration() {

    const [eventsData, setEventsData] = useState("")
    const [message, setMessage] = useState("")
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [date, setDate] = useState("")
    const [address, setAddress] = useState("")
    const [image, setImage] = useState("")
    const [status, setStatus] = useState("")
    const [page, setPage] = useState("index")
    const [id, setId] = useState('')
    const [user, setUser] = useState('')

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
                if(data.role != 'admin') {
                    console.log('true')
                    window.location.replace('/')
                }
            })
            .catch((error) => {
                // handle error
            });
        }
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
                          <button onClick={() => editEvent(item.id)}>Edit</button>
                          <button onClick={() => deleteEvent(item.id)}>Delete</button>
                      </div>
                  )
              })  
            }
          </>
        )
      }

      const editEvent = (id) => {
        eventsData.forEach(element => {
            if(element.id == id) {
                setName(element.name)
                setCategory(element.category)
                setDate(element.date)
                setAddress(element.address)
                setStatus(element.status)
                setId(id)
            }
        });

        setPage('edit')
      }

      const editEventPage = () => {
        return (
            <form onSubmit={(e) => edit(e)}>
                <label>Name</label>
                <input type="text" onChange={(e) => setName(e.target.value)} value={name}></input>
                <label>Status</label>
                <input type="text" onChange={(e) => setStatus(e.target.value)} value={status}></input>
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

    const edit = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:5000/admin/edit_event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, name, category, date, address, status }),
        })

            .then((response) => response.json()).then((data) => {
                setPage("index")
               setMessage(data.message)
               getAllEvents();
            })
            .catch((error) => {
                // handle error
            });
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
                getAllEvents();
                setMessage(data.message)
            })
            .catch((error) => {
                // handle error
            });
    }

    useEffect(() => {
        currentUsersRole()
        getAllEvents()
    }, [])
    

    return (
        <>
            {eventsData && page == 'index' ? eventsPage() : ''}
            {page == 'edit' ? editEventPage() : ''}
        </>
    )
}