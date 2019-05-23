import React, {Component} from 'react';
import './Login.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Redirect } from 'react-router';

class LogIn extends Component {
  constructor(props){
    super(props);
  
    this.state = {
      renderedResponse: '',
      email:'',
      password:'',
     redirect: false,
     error:false,
     errmsg:""


   
    };
   // this.onClick = this.onClick.bind(this);
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);

  }

  getResponse = async() =>{
    const response = await fetch('/users/login');
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
      return <Redirect to='/users/profile'/>;
    }
{/* <Redirect to={{
            pathname: '/users/profile',
            state: { id: '123' }
        }}
/> */}
      return(
      

         
<div id="outside">
<div id="top"><h1>Log In </h1>        
    <p></p>  
</div>    
<div id="left"><p id="pspace"></p></div>
<div id="middle">
  
<div id="formContainer">
<div id="formHeader">Log In</div>
<div id="formBody">

<p><h6>Registered users: Log in with your username and password.  If you need help email secretary@gmail.com
New users: Create an account with your email.</h6></p>
{this.state.error?
<p>{this.state.errmsg}</p>
:
null
}


<form id="loginForm" action="" onSubmit={this.handleSubmit}>

<label>
     
     
       <input className="registerInput" type="text" name="email"value={this.state.email} onChange={this.handleChange} placeholder="Email"/>
     </label>
     <div className="space"></div>

     <label>
      
      
       <input className="registerInput" type="text" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password"/>
     </label>
     <div className="space"></div>
  
     
     <button type="submit">
           Log In
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

  


export default LogIn;
