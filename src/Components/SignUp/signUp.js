import React, { Component } from 'react';
import Modal from "react-modal"
import "./signup.css";
import { Link } from 'react-router-dom';
import Axios from 'axios';


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      transform             : 'translate(-50%, -50%)',
      width:'70%'
    },
    
  };

export default class signUp extends Component {
    constructor(props){
        super(props);
        this.state={
            username:"",
            email:"",
            Password:"",
            ConfirmPassword:"",
            image:process.env.PUBLIC_URL+'/usericon.png',
            nameInfo:false,
            imgInfo:false,
            mailInfo:false,
            passInfo:false,
            cPassInfo:false,
            modalIsOpen:false,
            availableInfo:process.env.PUBLIC_URL+'/qm.png'
        }
        this.openModal = this.openModal.bind(this);
           
            this.closeModal = this.closeModal.bind(this);
    }

    handleChange=(event)=>{
        this.setState({[event.target.name] : event.target.value})
        // console.log(event.target.value)
       if(event.target.name==="username"){
            if(event.target.value.length>4){
                this.setState({nameInfo:true})
            }
            else{
                this.setState({nameInfo:false})
            }
       }
        if(event.target.name==="Password")
        {
            if(event.target.value.length>=5){
                this.setState({passInfo:true})
            }
            else{
                this.setState({passInfo:false})
            }
        }
       if(event.target.name==="ConfirmPassword"){
            if(event.target.value===this.state.Password){
                this.setState({cPassInfo:true})
            }
            else{
                this.setState({cPassInfo:false})
            }
        }
        
       }

       handleImgChange=(event)=>{
        
        console.log(event.target.files[0].name)
        let file = event.target.files[0];
        // this.setState({image:file,imgInfo:true})
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          this.setState({
            image: reader.result,dpInfo:file.name,imgInfo:true,imagefile:file
          });
        };
    }

    handleMailChange(event){
        if(event.target.value.match(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )){
           this.setState({mailInfo:true})
        }
        else{
            this.setState({mailInfo:false})
        }
        this.setState({[event.target.name] : event.target.value})
       }

       openModal() {
        this.setState({modalIsOpen: true,username:"",Password:"",email:"",ConfirmPassword:"",image:process.env.PUBLIC_URL+'/usericon.png'});
        
      }

      closeModal() {
        this.setState({modalIsOpen: false});
      }

      checkUnique(){
          Axios.post(`${this.props.url}/uniqueCheck`,{username:this.state.username})
          .then(res=>{
              if(res.data){
                  this.setState({availableInfo:process.env.PUBLIC_URL+'/correct.png'})
              }
              else{
                  this.setState({availableInfo:process.env.PUBLIC_URL+'/wrong.png'})
              }
          })
      }
    

   async handleSubmit(){
        let imageurl='';
        if(this.state.nameInfo&&this.state.imgInfo&&this.state.mailInfo&&this.state.passInfo&&this.state.cPassInfo){
            let formData=new FormData();
            formData.append('file',this.state.imagefile)
            await Axios.post(`${this.props.url}/addImage`,formData,{
                headers:{'Content-Type':'multipart/form-data'}
            })
            .then(res=>{
                 imageurl=this.props.url+"/uploads/"+res.data.filename;
                 console.log(res)
            })
            Axios.post(`${this.props.url}/signup`,{email:this.state.email,username:this.state.username,password:this.state.Password,dp:imageurl})
            .then(data=>{
                console.log(data);
                this.openModal();
            })
            
        }

    }

    
    render() {
    //    console.log(this.state.Password)
        return (
            <div className="signup-div">
                 <img class="_1-kh img-signup" src="https://scontent.fmaa1-1.fna.fbcdn.net/v/t39.8562-6/37789948_1959933824027454_666414594595487744_n.png?_nc_cat=1&amp;_nc_ohc=WfCF2ifiz24AX_fA89K&amp;_nc_ht=scontent.fmaa1-1.fna&amp;oh=dc142a289ffeab8db71dd56635893e24&amp;oe=5EBAA44D" alt="Messenger"></img>
                <h1 className="head-signup">Create an account</h1>
                
                <div className="adduser-div" style={{"width":"100%"}}>
                <label >
                <input className="input-fields signup-details file" type="file"  onChange={(event)=>this.handleImgChange(event)} required></input>
                <img alt="addUser" className="add-user" src={this.state.image}></img>
                </label>
                </div>

                <input className="input-fields signup-details" name="username" value={this.state.username} onChange={(event)=>this.handleChange(event)} placeholder="Username" required></input>
                <div style={{display:"flex"}}>
                <button className="uniqueBtn" onClick={()=>this.checkUnique()}>Check availability</button>
                <img className="availablePng" src={this.state.availableInfo}></img>
                </div>
                <p className="info"><span style={{"color":"red"}}>*</span>Username must be more than 4 Characters.</p>
                
                <input className="input-fields signup-details" name="email" value={this.state.email} placeholder="E-mail" onChange={(event)=>this.handleMailChange(event)} required></input>
                 <p className="info"><span style={{"color":"red"}}>*</span>E-mail must be Vaild with proper domain.</p>
                
                <input className="input-fields signup-details" name="Password" value={this.state.Password} type="password" placeholder="Password" onChange={(event)=>this.handleChange(event)} required></input>
                <p className="info"><span style={{"color":"red"}}>*</span>Password should contain minimum 5 characters.</p>
                
                <input className="input-fields signup-details" name="ConfirmPassword" value={this.state.ConfirmPassword} type="password" placeholder="Confirm Password" onChange={(event)=>this.handleChange(event)} required></input>
                <p>( <span style={{"color":"red"}}>*</span> All Fields Required)</p>
                
                <button className="login_btn submit-signup" onClick={()=>this.handleSubmit()}>Submit</button>
               


                <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          
        >
            <div className="signup-modal">
           <img alt="" src={process.env.PUBLIC_URL+'/correct.png'}></img>
          <h2>Yayy!! Successfully signed-up</h2>
          </div>
          <h3 className="signin-route"><Link to="/">Click Here</Link> to switch to login page</h3>
        </Modal>
                
            </div>
        )
    }
}
