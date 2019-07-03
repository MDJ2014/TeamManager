import React, {Component} from 'react';

import { Link } from 'react-router-dom';


class Menu extends Component {
  constructor(props){
    super(props);
  // if(window.reactApp){
  //   this.setState({user: window.reactApp.currentUser})
  // }else{
  //   this.setState({user: undefined})
  //}
 this.state = {
    // user: undefined,
     authenticated: false
    }
this.changeToAbout = this.changeToAbout.bind(this);
this.handleLogout = this.handleLogout.bind(this);
  }

   
  getResponse = async()=>{
    const response = await fetch('/users/user',{method:'GET', headers:{'Content-Type': 'application/json'}
  
  });
    const body = await response;
    if (response.status !== 200) 
    //throw Error(body.message);
    {

 //this.setState({"redirect":true})

    } else{
       return body; 
    }
  }




  componentDidMount(){

    this.getResponse()
    .then(res => {

      
      const data = res;
      this.setState({authenticated: data},()=>alert(this.state.authenticated));
    })


  }







changeToAbout(page){
this.props.onClick(page);
}


handleLogout= async(event)=>{
  event.preventDefault();

  // const body = JSON.stringify({
  //   userEmail: this.state.email, 
  //   passWord:this.state.password,
  //   firstName: this.state.firstName, 
  //   lastName: this.state.lastName, 
  //   userName: this.state.userName, 
  //   confirmPassword: this.state.confirmPassword
  // });

  const headers = {'content-type': 'application/json', accept: 'application/json'};

  await fetch('/users/logout',{method: 'GET', headers})
  .then((res)=>this.setState({redirect:true, authenticated: false}))

  .then(window.location.href = '/')
  .catch(function(response){
    //this.setState({error:true, errmsg: error});
    //console.log(response.data)
  })

}





  render(){

 return (

 <div className="menuList">
 
   <ul>
<li><Link to="/admin"><div id="gear"></div></Link></li>
{this.state.authenticated? 
    null
      : 
<li><Link to="/login/login">Log In</Link></li>
  }

  {this.state.authenticated? 
    null
      : 
      <li><Link to="/register">Register</Link></li>
      }

{this.state.authenticated?
  <li><Link onClick={this.handleLogout}>Log Out</Link></li>
  : null}

{this.state.authenticated? 
<li><Link to="/teams">Teams</Link></li>
:null}

{this.state.authenticated? 
<li><Link to="/profile">My Profile</Link></li>
: null}



 

<li><Link to="/about">About</Link></li>
<li><Link to="/contact">Contact</Link></li>
<li><Link to="/">Home</Link></li>


   </ul>
   </div>
  
  );

  }

  
}

export default Menu;
