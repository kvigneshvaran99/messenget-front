import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import io from 'socket.io-client';
import FirstPage from './Components/FirstPage/FirstPage';
import UserList from './Components/UserList/UserList';
import UserChat from './Components/UserChat/UserChat';

function App() {

var global ;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [reciever, setReciever] = useState(JSON.parse(localStorage.getItem("reciever")));
  const users=["https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
                "https://americancrew-assets1.netlify.com/images/00tallcollection/Styling_0004_Styling.jpg",
                 "https://c6oxm85c.cloudimg.io/cdno/n/q85/https://az617363.vo.msecnd.net/imgmodels/models/MD30001511/alessio400bbed6c271a3837f0f96a657c45e99e_thumbdf45b371c880d5f88a2af85f236c239f_thumb.jpg",
                "data:image/jpeg;base64,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",
                 "https://s7g3.scene7.com/is/image/soloinvest/n00551A?fmt=jpeg,rgb&qlt=70&wid=2000",
                "https://www.fusalp.com/c/1214-cat_big/men-sweaters-and-light-jackets.jpg",
              "https://i2-prod.manchestereveningnews.co.uk/incoming/article15874870.ece/ALTERNATES/s615/0_SAP_MEN_MARSHALL_____02JPG.jpg",
            "https://media1.fdncms.com/stranger/imager/u/large/40901734/gettyimages-92204237_mag.jpg",
          "https://manofmany.com/wp-content/uploads/2019/06/50-Short-Haircuts-Hairstyle-Tips-for-Men.jpg",
        "https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.upp-prod-us.s3.amazonaws.com%2F83afb31c-38fc-11e9-9988-28303f70fcff?fit=scale-down&source=next&width=700"];


  const url=process.env.NODE_ENV==="development"?"http://192.168.0.189:8080":"/backend";

  if (user !== null) {
    const socket = io.connect(`${url}/` + user.username);
    const audio = new Audio(process.env.PUBLIC_URL+'/message.mp3');
    global=socket;
    socket.on('back to front', (data) => {
      audio.play();
      console.log(data);
    })

  }

  return (

      <div className="App"  >
        <Router>
          <Route exact path="/"><FirstPage setUser={setUser} global={global} url={url}/></Route>
          {
                user!==null?
                <div>
                <Route exact path="/userlist"><UserList user={user} setReciever={setReciever} usersdp={users} maindp={users[user.id-1]} url={url}/></Route>
                {
                  reciever!==null? <Route exact path="/chats"><UserChat reciever={reciever} user={user} global={global} dp={users[reciever.id-1]} url={url}/></Route>:<div></div>
                }
         
          </div>
          :<div></div>
          }
          
        </Router>
      </div>


  );
}

export default App;
