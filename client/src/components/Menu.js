import React, {Component} from 'react';

import { Link } from 'react-router-dom';


class Menu extends Component {
  constructor(props){
    super(props);
  
 this.state = {
     authenticated: false
    }
this.changeToAbout = this.changeToAbout.bind(this);
  }


changeToAbout(page){
this.props.onClick(page);
}
  render(){

 return (

 <div className="menuList">
 
   <ul>
<li><Link to="/admin"><div id="gear"></div></Link></li>
<li><Link to="/teams">Teams</Link></li>
<li><Link to="/team">My Team</Link></li>
<li><Link to="users/profile">My Profile</Link></li>
<li><Link to="/register">Register</Link></li>
<li><Link to="/login/login">Log In</Link></li>
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
