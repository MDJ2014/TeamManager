import React, {Component} from 'react';
import './Admin.css';
import AdminEditHome from '../adminEditHome/AdminEditHome';
import Teams from '../teams/Teams';
import { Link } from 'react-router-dom';

class Admin extends Component {
    constructor(props){
      super(props);
    
      this.state = {
        editView : "",
        memberView: false,
        teamView: false,
        playerView: false,
        messageView: false,
        homePageView:false,
        editMember:false,
        editTeam:false,
        editPlayer:false
               
      };
      this.handleMenu = this.handleMenu.bind(this);
    }


    handleMenu(event){
      const target = event.target;
      const value = target.value;
      const name = target.name;

   this.setState({editView: name});
  }




    render() {



        return( 
<React.Fragment>


<div id="adminHeader">Admin Panel</div>



<div id="adminContainer">

<div id="stats">
<div id="teamStats" className="statBox">Teams: 9</div>
<div id="gameStats" className="statBox">Games: 50</div>
<div id="memberStats" className="statBox">Members: 100</div>
<div id="playerStats" className="statBox">Players: 36</div>
<div id="coachStats" className="statBox">Coaches: 36</div>
<div id="incomeStats" className="statBox">Income: $2000</div>
</div>




<div id="adminMenu">
 <button className="adminBtn"type="button" name="home" onClick={this.handleMenu}>
          Home Page <span>></span>
         </button>
 <button className="adminBtn"type="button" name="teams" onClick={this.handleMenu}>
          Teams<span>></span>
  </button>
<button className="adminBtn"type="button">
          Messages <span>></span>
         </button>
         <button className="adminBtn"type="button">
          Members <span>></span>
         </button>     
         <button className="adminBtn"type="button">
          Accounts <span>></span>
         </button>    
         <Link to="/">
         <button className="adminBtn"type="button" name="close" onClick={this.handleMenu}>
          Close Admin</button>    
          </Link>
</div>
<div id="adminBody">

{this.state.editView === 'home'?
<AdminEditHome/>
:
this.state.editView === 'teams'?
<Teams/>
:
null
}







</div>
</div>
</React.Fragment>
);
      }
}
export default Admin;