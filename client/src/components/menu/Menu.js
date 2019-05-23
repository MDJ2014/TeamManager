import React, {Component} from 'react';
import './Menu.css';
import { Link } from 'react-router-dom';


class Menu extends Component {
  constructor(props){
    super(props);
  
 this.state = {
     authenticated: false
    }
this.changeToAbout = this.changeToAbout.bind(this);
  }




/*
    getResponse = async() =>{
        const response = await fetch('/home');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body; 
      }

componentDidMount(){
  this.getResponse()
  .then(res => {
    const data = res;
    this.setState({renderedResponse: data});
  })
}
*/
changeToAbout(page){
this.props.onClick(page);
}
  render(){

    // onClick = {this.changeToAbout("About")}
 return (

 <div id="menuList">
 
   <ul>

<li><Link to="">Teams</Link></li>
<li><Link to="">My Team</Link></li>
<li><Link to="users/profile">My Profile</Link></li>
<li><Link to="/register">Register</Link></li>
<li><Link to="/login">Log In</Link></li>
<li><Link to="/users/logout">Log Out</Link></li>
<li><Link to="/about">About</Link></li>
<li><Link to="/contact">Contact</Link></li>
<li><Link to="/">Home</Link></li>

   </ul>
   </div>
  
  );

  }

  
}

export default Menu;
