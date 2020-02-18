import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
 import io from 'socket.io-client';
import FirstPage from './Components/FirstPage/FirstPage';
import UserList from './Components/UserList/UserList';
import UserChat from './Components/UserChat/UserChat';
import SignUp from './Components/SignUp/signUp';

function App() {

var global ;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [reciever, setReciever] = useState(JSON.parse(localStorage.getItem("reciever")));
  
  const url=process.env.NODE_ENV==="development"?"http://192.168.1.140:8080":"/backend";

  if (user !== null) {
     const socket = io.connect(`${url}/` + user.username);
    const audio = new Audio(process.env.PUBLIC_URL+'/message.mp3');
     global=socket;
     socket.on('back to front', (data) => {
       audio.play();
      // console.log(data);
     })

  }

  return (

      <div className="App"  >
        <Router>
          <Route exact path="/"><FirstPage setUser={setUser} global={global} url={url}/></Route>
          <Route exact path="/signup"><SignUp url={url}/></Route>
          {
                user!==null?
                <div>
                <Route exact path="/userlist"><UserList user={user} setReciever={setReciever} url={url}/></Route>
                {
                  reciever!==null? <Route exact path="/chats"><UserChat reciever={reciever} user={user} global={global}  url={url}/></Route>:<div></div>
                }
         
          </div>
          :<div></div>
          }
          
        </Router>
      </div>


  );
}

export default App;
