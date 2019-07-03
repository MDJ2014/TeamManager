import React, {Component} from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Redirect } from 'react-router';
import trophy from '../assets/trophy.png';
import trophy2 from '../assets/tropyh2.png';




class LogIn extends Component {
  constructor(props){
    super(props);
  
    this.state = {
      renderedResponse: '',
      email:'',
      password:'',
     redirect: false,
     error:false,
     errmsg:"",
     emailValid:false,
     passwordValid:false,
     formValid:false

   
    };
   // this.onClick = this.onClick.bind(this);
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
 this.validate = this.validate.bind(this);
  }

  getResponse = async() =>{
    const response = await fetch('/users/login');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body; 
  }

  
  
  componentDidMount(){
 
 this.setState({renderedResponse: this.props.type});
 
  }


  handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;



    this.setState({[name]: value}, this.validate(name,value));
  }

  handleSbmit(event) {
   event.preventDefault();
    fetch("/users/login",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body:{"email":this.state.email, "password":this.state.password}
    })
   .then(()=>   this.setState({redirect:true})     )
   .catch(function(error){
     
   })


  }
  

  validate (name,value) {

var emailValid=this.state.emailValid;
var passValid = this.state.passwordValid;
var formValid=this.state.formValid;
var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



switch(name) {
case 'email':  emailValid = re.test(value);
break;
case 'password': passValid = value.length >=6;
break;
      }
    
if(this.state.emailValid && this.state.passwordValid){
  formValid = true;
}else{
  formValid = false;
}
    this.setState({emailValid: emailValid, passwordValid:passValid, formValid: formValid});
    
  }





    handleSubmit = async(event)=>{
      event.preventDefault();

      const body = JSON.stringify({email: this.state.email, password:this.state.password});
      const headers = {'content-type': 'application/json', accept: 'application/json'};

      await fetch('/users/login',{method: 'POST', headers, body})
      .then(()=>this.setState({redirect:true}))
      .catch(function(error){
        this.setState({error:true, errmsg: error});
      })



    }
  
    
    
 
  


  render(){
    const { redirect } = this.state;
   
    if (redirect) {
      return <Redirect to='/profile'/>;
    }
{/* <Redirect to={{
            pathname: '/users/profile',
            state: { id: '123' }
        }}
/> */}
      return(
      

         
<div id="outside">
  
<div id="left"><p id="pspace"></p><img src={trophy}></img></div>
<div id="middle">
  
<div className="formContainer">
<div className="form-header">Log In</div>
<div className="form-body">

<p><h6>Registered users: Log in with your username and password.  If you need help email secretary@gmail.com
New users: Create an account with your email.</h6></p>
{this.state.error?
<p>{this.state.errmsg}</p>
:
null
}
 <div className="space"></div>
 

<form id="loginForm"  onSubmit={this.handleSubmit}>
     
    
          
     <h6>Email</h6>
      <input className="form-input" type="email" name="email"value={this.state.email} onChange={this.handleChange} placeholder="Email"/>
    {this.state.emailValid === false? <h6>Must be in this form: '---@---.com'</h6>:null}
    <div className="space"></div>

     
    <h6>Password</h6>
      <input className="form-input" minLength="6" type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password"/>
      {this.state.passwordValid === false? <h6>Password must be 7 or more characters.</h6>:null}
      <div className="space"></div>
      <button className="form-btn" type="submit" form="loginForm" disabled={this.state.formValid===false}>
Log In
</button>

     </form>




</div>
<div className="form-footer"></div>



</div>


</div>
<div id="right"><img src={trophy2}></img></div>
<div id="bottom"></div>
</div>



      );
  }

}

  


export default LogIn;
