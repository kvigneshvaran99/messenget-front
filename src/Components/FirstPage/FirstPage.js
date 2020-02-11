import React, { Component } from 'react'
import {withRouter} from "react-router-dom"
import axios from "axios";
import "./firstpage.css";
class FirstPage extends Component {

         constructor(props) {
             super(props);
             this.state={
                 input:"",
                 password:"",
                 info:""
             }
             
         }
         handleChange(event){
             this.setState({[event.target.name]:event.target.value})
         }
         handleSubmit(){
             axios.post("http://localhost:8080/usercheck",{username:this.state.input,password:this.state.password})
             .then(res=>{ 
                 console.log(res.data);
                 this.setState({password:""})
                 if(res.data.loggedIn){
                     localStorage.setItem("user",JSON.stringify(res.data));
                     this.props.setUser(res.data);
                    this.props.history.push('/userlist')
                 }
                 else{
                     this.setState({info:"Invalid Credintials"})
                 }
             })
             
         }

    render() {
        
        return (
            <div>
                <div className="top-head"> 
                <img class="_1-kh img" src="https://scontent.fmaa1-1.fna.fbcdn.net/v/t39.8562-6/37789948_1959933824027454_666414594595487744_n.png?_nc_cat=1&amp;_nc_ohc=WfCF2ifiz24AX_fA89K&amp;_nc_ht=scontent.fmaa1-1.fna&amp;oh=dc142a289ffeab8db71dd56635893e24&amp;oe=5EBAA44D" alt="Messenger"></img>
                <h1>
                   Messenger
                </h1>
                </div>
                <input name="input" className="input-fields" placeholder="Username" value={this.state.input} onChange={(event)=>this.handleChange(event)}></input>
                <br></br>
                <br></br>
                <input name="password" type="password" className="input-fields"  placeholder="Password" value={this.state.password} onChange={(event)=>this.handleChange(event)}></input>
                <br></br>
                <br></br>
                <h3>{this.state.info}</h3>
                <button className="login_btn" onClick={()=>this.handleSubmit()}>Log-In</button>
            </div>
        )
    }
}

export default withRouter(FirstPage);