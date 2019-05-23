import React, {Component} from 'react';
import './Register.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Redirect } from 'react-router';

class Register extends Component {
  constructor(props){
    super(props);
  
    this.state = {
      renderedResponse: '',
      redirect:false,
      firstName:'',
      lastName:'',
      email:'',
      userName:'',
      password:'',
      confirmPassword:''

    };

   // this.onClick = this.onClick.bind(this);
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
  }

  getResponse = async() =>{
    const response = await fetch('/users/register');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body; 
  }
  
  componentDidMount(){
    this.getResponse()
    .then(res => {
      const data = res;
      this.setState({renderedResponse: data.title});
    })
  }


  handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;

    this.setState({[name]: value});
  }

  handleSubmit= async(event)=>{
    event.preventDefault();

    const body = JSON.stringify({
      userEmail: this.state.email, 
      passWord:this.state.password,
      firstName: this.state.firstName, 
      lastName: this.state.lastName, 
      userName: this.state.userName, 
      confirmPassword: this.state.confirmPassword
    });

    const headers = {'content-type': 'application/json', accept: 'application/json'};

    await fetch('/users/register',{method: 'POST', headers, body})
    .then((res)=>this.setState({redirect:true}))
    .catch(function(response){
      //this.setState({error:true, errmsg: error});
      //console.log(response.data)
    })

  }

 



  render(){
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/users/profile'/>;
    }

      return(
      

         
<div id="outside">
<div id="top"><h1>Registration</h1>        
    <p></p>  
</div>    
<div id="left"></div>
<div id="middle">
  
<div id="formContainer">
<div id="formHeader">Create New Account</div>
<div id="formBody">

<p>Register Now for Douglasville Youth Tackle Football!</p>
<form id="registerForm" onSubmit={this.handleSubmit}>

<label>
      
       <input className="registerInput" type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder="First Name"/>
     </label>
     <div className="space"></div>
     <label>
    
       <input className="registerInput" type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} placeholder="Last Name" />
     </label>
     <div className="space"></div>
     <label>
     
       <input className="registerInput" type="text" name="email"value={this.state.email} onChange={this.handleChange} placeholder="Email"/>
     </label>
     <div className="space"></div>
     <label>
      
       <input className="registerInput" type="text" name="userName"value={this.state.userName} onChange={this.handleChange} placeholder="Username"/>
     </label>
     <div className="space"></div>
     <label>
      
       <input className="registerInput" type="text" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password"/>
     </label>
     <div className="space"></div>
     <label>
   
       <input className="registerInput" type="text" name="confirmPassword"value={this.state.confirmPassword} onChange={this.handleChange} placeholder="Re-enter Password"/>
     </label>
     <div className="space"></div>
<div><h6>By clicking Create Account you agree
to the <br/>Terms of Service,  Privacy Policy,  and License<br/> Agreement.</h6></div>
<div className="space"></div>
     <button type="submit">
           Create Account
         </button>
         <div className="space"></div>

</form>
</div>
</div>



</div>
<div id="right"></div>
<div id="bottom"></div>
</div>



      );
  }

}


// getResponse = async() =>{
//   const response = await fetch('/home');
//   const body = await response.json();
//   if (response.status !== 200) throw Error(body.message);
//   return body; 
// }

// componentDidMount(){
//   this.getResponse()
//   .then(res => {
//     const data = res;
//     this.setState({renderedResponse: data});
//   })
// }






  


export default Register;
