import React, {Component} from 'react';

import { Link } from 'react-router-dom';


class Menu extends Component {
  constructor(props){
    super(props);

 this.state = {
     usertype: undefined,
     authenticated: false
    }
this.changeToAbout = this.changeToAbout.bind(this);
this.handleLogout = this.handleLogout.bind(this);

  }

   
  getResponse = async()=>{
    const response = await fetch('/users/user',{method:'GET', headers:{'Content-Type': 'application/json'}
  
  });
    const body = await response;
    if (response.status !== 200) { 
     this.setState({authenticated: false, usertype: undefined})
     //this.setState({"redirect":true})
        // return {found: false}
    } else{
      return body; 
     
    }
  }




  componentDidMount(){
    this.getResponse()
   
    .then((response) => {
      if(response === undefined || response === null){
        return {empty: true}
      }else{
         return response.json() 
      }
     
   })
   .then((data)=> {
     if(data.empty){
      this.setState({authenticated: false, usertype: undefined})
     }else{
      this.setState({authenticated: data, usertype: data.userType})
     }

   })
  


  }

 



changeToAbout(page){
this.props.onClick(page);
}


handleLogout= async(event)=>{
  event.preventDefault();


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

{this.state.usertype === "Admin" || this.state.usertype==="Coach" ? 
<li><Link to="/admin"><div id="gear"></div></Link></li>
: null}

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
  <li><Link to="" onClick={this.handleLogout}>Log Out</Link></li>
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
