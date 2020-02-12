import React, { Component } from 'react';
import axios from "axios";
import "./userlist.css";
import { withRouter } from 'react-router-dom';
class UserList extends Component {

    constructor(props){
        super(props);
        this.state={
           allUsers:[],
           online:[]
        }
    }

    componentDidMount(){
         axios.post("/backend/getAllUsers",{id:this.props.user.id})
         .then(res=>{
             console.log(res.data);
             this.setState({allUsers:res.data.data,online:res.data.online});
         })
    }

    userChat(username,id){
        console.log(username,id)
        localStorage.setItem("reciever",JSON.stringify({"username":username,"id":id}));
        this.props.setReciever({"username":username,"id":id});
        this.props.history.push("/chats");
    }
    checkOnline(name){
       let onlineUser=this.state.online;
       let flagOnline=0;
       for(let i=0;i<onlineUser.length;i++){
           if(name===onlineUser[i]){
               flagOnline=1;
               break;
           }
       }
       if(flagOnline===1){
           return true
       }
       return false
    }
    render() {
        
        return (
            <div>
               {this.props.user!==""?
                    <div className="userlist-div">
                        <div className="logged-user">
                        <img alt="messenger" className="list-main" src={this.props.maindp}></img>
                        <h1 className="head-chat">Chats</h1>
                        </div>
                        <div className="listing">
                        {this.state.allUsers.map((Element,index)=>{
                            if(this.props.user.username!==Element.username){
                                return(
                                    <div id={Element.id} className="each-user" onClick={()=>this.userChat(Element.username,Element.id)}>
                                        <div className="image-con"> 
                                        <img alt="dp" className="image-comp" src={this.props.usersdp[index]}></img>
                                        {this.checkOnline(Element.username)?<span className="online-type"></span>:<span></span>}
                                        
                                        </div>
                                        <div className="image-right">
                                        <h3 className="users-list">{Element.username}</h3>
                                        {
                                            Element.message===null?<p className="list-message">Say <span></span>👋 to your Facebook Friend</p>:<p className="list-message">{Element.message.message}</p>
                                        }
                                        </div>
                                        </div>
                                )
                            } 
                            return(<div></div>)
                        })} 
                        </div>
                    </div>:this.props.history.push('/')}
            </div>
        )
    }
}
export default withRouter(UserList);