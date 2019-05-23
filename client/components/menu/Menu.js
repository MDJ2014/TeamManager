import React, {Component} from 'react';




class Menu extends Component {
  // constructor(props){
  //   super(props);
  
  // }


 state = {
     authenticated: false
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
  render(){


 return (

  <div>
   <ul>
      <li>Teams</li>
      <li>My Team</li>
      <li>My Profile</li>
      <li>Register</li>
      <li>Log In</li>
      <li>About</li>
      <li>Contact</li>
   </ul>
   
  </div>
  );

  }

  
}

export default Menu;
