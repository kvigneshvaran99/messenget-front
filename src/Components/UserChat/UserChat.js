import React, { Component } from 'react'
import "./userchat.css";
import axios from "axios";
import img from "./back.png";

import Modal from 'react-modal';
import {withRouter} from "react-router-dom";

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      transform             : 'translate(-50%, -50%)'
    },
    
  };

class UserChat extends Component {
       constructor(props){
           super(props);
           this.state={
              message:"" ,
              allMessageData:[],
              modalIsOpen: false,
              deleteChatId:0
           }
           this.openModal = this.openModal.bind(this);
           
            this.closeModal = this.closeModal.bind(this);
            this.handleButtonPress = this.handleButtonPress.bind(this)
            this.handleButtonRelease = this.handleButtonRelease.bind(this)
       }
        componentDidMount(){
            
            axios.post(`${this.props.url}/allmessages`,{id1:this.props.user.id,id2:this.props.reciever.id})
            .then(res=>{
                this.setState({allMessageData:res.data});
                this.scrollToBottom();
            })
            this.props.global.on('back to front',(data)=>{
                console.log(data);
                // console.log(this.state);
                 let dataArray=this.state.allMessageData;
                 dataArray.push(data)
                 this.setState({allMessageData:dataArray})
                  this.scrollToBottom();
            })
            this.props.global.on('delete res',(data)=>{
                let dataArray=this.state.allMessageData;
                for (let i=0;i<dataArray.length;i++){
                    if(data===dataArray[i].id){
                        dataArray.splice(i,1);
                        break;
                    }
                }
                this.setState({allMessageData:dataArray,modalIsOpen:false})
            })
            
        }
        deleteChat(id){
            this.props.global.emit('delete req',{"id":id,"from":this.props.user,"to":this.props.reciever});
            console.log(this.props.global)
            let dataArray=this.state.allMessageData;
            for (let i=0;i<dataArray.length;i++){
                if(id===dataArray[i].id){
                    dataArray.splice(i,1);
                    break;
                }
            }
            this.setState({allMessageData:dataArray,modalIsOpen:false})
        }


        openModal(id) {
            this.setState({modalIsOpen: true,deleteChatId:id});
            
          }

          closeModal() {
            this.setState({modalIsOpen: false});
          }
         


       handleChange(event){
           this.setState({[event.target.name]:event.target.value})
       }

    
      scrollToBottom() {
        this.el.scrollIntoView({  inline: "nearest" });
      }
       handleSubmit(){
           if(this.state.message.trim()!==""){
            this.props.global.emit('front to back',{"message":this.state.message,"from":this.props.user,"to":this.props.reciever})
            let dataArray=this.state.allMessageData;
            let newMessage={
                recieversId:this.props.reciever.id,
                message:this.state.message
            }
            dataArray.push(newMessage);
            console.log()
            this.setState({allMessageData:dataArray,message:""})
           }
        else{
               this.setState({message:""})
           }
           this.scrollToBottom();
        }

        previousPage(){
            this.props.history.push("/userlist");
        }
        handleKeyPress=(target=>{
            if(target.charCode===13){
                this.handleSubmit()   
              } 
        })

        handleButtonPress (id) {
            console.log(id)
            this.buttonPressTimer = setTimeout(() => this.openModal(id), 1000);
          }
        
          handleButtonRelease () {
            clearTimeout(this.buttonPressTimer);
          }
       
    render() {
       
       console.log(this.state.allMessageData)
        return (
            <div id="user-chat">
                <div className="top-bar">
                    <img className="back" src={img} alt="prev" onClick={()=>this.previousPage()}></img>
                    <img alt="messenger" className="img-chat" src={this.props.dp}></img>
                    <h2 className="username-chat">{this.props.reciever.username}</h2>
                </div>
                
                <div className="all-messages">
                   {this.state.allMessageData.map(Element=>{
                       
                       if(Element.recieversId===this.props.reciever.id)
                      return(
                          <div className="reciever-end">
                             <p onTouchStart={()=>this.handleButtonPress(Element.id)} 
                                onTouchEnd={this.handleButtonRelease} 
                                onMouseDown={()=>this.handleButtonPress(Element.id)} 
                                onMouseUp={this.handleButtonRelease} 
                                onMouseLeave={this.handleButtonRelease} className="reciever-msg">{Element.message}</p>
                              </div>
                      )
                      else{
                          return(
                              <div className="sender-end">
                                  <img className="sender-chat-img" alt="dp" src={this.props.dp}></img>
                                  <p >{Element.message}</p>
                                  
                              </div>
                          )
                      }
                   })}
                    <div ref={el => { this.el = el; }} />
                  
                </div>
                <div className="input-field">
                <input className="user-message" name="message" value={this.state.message} onKeyPress={this.handleKeyPress} onChange={(event)=>this.handleChange(event)} placeholder="Your Text here...."></input>
                <button className="send-btn" onClick={()=>this.handleSubmit()}>Send</button>
                </div>


                <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h3 className="delete-head">Delete Message?</h3>
          <div className="model-delete">
          <button className="delete-btn-model" onClick={this.closeModal}>Cancel</button>
          <button onClick={()=>this.deleteChat(this.state.deleteChatId)}>Confirm</button>
          </div>
        </Modal>


                
            </div>
        )
    }
}
export default withRouter(UserChat);