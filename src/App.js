
import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from 'react';
import {FaRegTrashAlt} from 'react-icons/fa'
const socket =io('ws://localhost:5000')

function App() {
  const [title,setTitle]=useState('')
  const [description,setDescription]=useState('')
  const [notes,setNotes]=useState([])
  const [edit,setEdit]=useState(false)
  const [getId,setGetId]=useState(0)

  const saveNote = (title, description) => {
    socket.emit("client:newnote", {
      title,
      description,
    });
  };




  const updateNote = (id,title, description) => {
    socket.emit("client:updatenote", {
      id,
      title,
      description,
    });
  };


  useEffect(() => {
    socket.on("server:loadnotes", (data)=>{
      setNotes(data)
    });
  }, [])
  
console.table(notes)

  const handleSubmit=(e)=>{
    e.preventDefault();

    if(!edit){
      saveNote(title,description)
      setTitle('')
      setDescription('')
    }
    if(edit){
      updateNote(getId,title,description)
      setGetId(0)
      setEdit(false)
      setTitle('')
      setDescription('')
     
    }
    
  }
  const deliteNote = (id)=>{
    socket.emit("client:deletenote", id);
  }

  const handleChangeState =(id)=>{
    setGetId(id)
    setEdit(true)
  }

  const handleCancel =()=>{
    setGetId(0)
    setEdit(false)
  }

  return (
    <div style={{width: '100%',
     height: '100vh',
     backgroundColor:'grey',
     display: 'flex',
     flexDirection: 'row',
    
     }}>
     <div style={{width: '20%',
     height:'100%',
     backgroundColor:'blue',
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
     }} >
      <form style={{
     display: 'flex',
     flexDirection: 'column',

     gap:'10px',
    //  margin:"0 15px"
     }}
     onSubmit={handleSubmit}
     >  <p>{edit?"Edycja":"Dodaj"}</p>
        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='title'  />
        <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="description"  />
        <button type="submit">Wyslij</button>
      </form>
     </div>
     <div style={{width: '80%',height:'100%',backgroundColor:'yellow'}}>
      {notes.map(el=>(
        <div style={{
          height:'50px',
          backgroundColor:'grey',
          display: 'flex',
          flexDirection:'row',
          marginBottom: '10px',
        }}>
          <div style={{width:'10%',display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
            <p>id:{el.id}</p>
            <p >Title: </p>
            <p>{el.title}</p>
          </div>
          <div style={{width:'90%',display:'flex',flexDirection:'row',justifyContent:'space-between',paddingRight:'20px'}}>
            <div style={{display:'flex',flexDirection:'row'}}>
            <p style={{marginRight:'10px',}}>Description: </p>
            <p>{el.description}</p>
            </div>
            <div style={{display:'flex',flexDirection:'row',justifyContent: 'space-around',alignItems: 'center'}}>
              <div >
                {edit ?<button onClick={handleCancel}>ANULUJ</button>:<button onClick={()=>handleChangeState(el.id)}>UPDATE</button>}
              </div>
              <div 
              onClick={()=>deliteNote(el.id)}
              style={{marginLeft:"10px",width:'50px',height:'50px',display:'flex',justifyContent:'center',alignItems: 'center',backgroundColor:"red",cursor: 'pointer'}} >  
                <FaRegTrashAlt size={25}/>
              </div>
            </div>
           </div>
        </div>
      ))}

     </div>
    </div>
  );
}

export default App;
