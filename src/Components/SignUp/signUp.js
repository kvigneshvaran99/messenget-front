import React, { Component } from 'react'
import "./signup.css";
export default class signUp extends Component {
    constructor(props){
        super(props);
        this.state={
            username:"",
            email:"",
            Password:"",
            ConfirmPassword:"",
            dpFile:"",
            dpInfo:"Choose File"
        }
    }

    
    render() {
        return (
            <div className="signup-div">
                 <img class="_1-kh img-signup" src="https://scontent.fmaa1-1.fna.fbcdn.net/v/t39.8562-6/37789948_1959933824027454_666414594595487744_n.png?_nc_cat=1&amp;_nc_ohc=WfCF2ifiz24AX_fA89K&amp;_nc_ht=scontent.fmaa1-1.fna&amp;oh=dc142a289ffeab8db71dd56635893e24&amp;oe=5EBAA44D" alt="Messenger"></img>
                <h1 className="head-signup">Your Details here:</h1>
                <input className="input-fields signup-details" placeholder="Username" required></input>
              
                <input className="input-fields signup-details" placeholder="E-mail" required></input>
             
                <input className="input-fields signup-details" placeholder="Password" required></input>
         
                <input className="input-fields signup-details" placeholder="Confirm Password" required></input>
              
            
                <label>{this.state.dpInfo}<input className="input-fields signup-details file" type="file" required></input>
                
                </label>
                <button className="login_btn submit-signup">Submit</button>
            </div>
        )
    }
}
