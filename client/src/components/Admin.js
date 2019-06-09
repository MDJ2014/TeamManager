import React, {Component} from 'react';

 import AdminEditHome from '../components/AdminEditHome';
 import EditTeams from '../components/EditTeams';
// import Messages from '../messages/Messages';
 import EditUser from '../components/EditUser';
// import AdminEditPlayer from '../adminEditPlayers/AdminEditPlayers';
// import Accounts from '../accounts/Accounts';

import { Link } from 'react-router-dom';
import AdminEditAbout from './AdminEditAbout';
import AdminEditContact from './AdminEditContact';
import Messages from './Messages';
import AdminEditPrivacy from '../components/AdminEditPrivacy';
import AdminEditTerms from '../components/AdminEditTerms';
import AdminEditLicense from '../components/AdminEditLicense';

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
      this.handleUpdate = this.handleUpdate.bind(this);
    }


    handleMenu(event){
      const target = event.target;
      const value = target.value;
      const name = target.name;

   this.setState({editView: name});
  }


handleUpdate(){
  this.props.updatePage();
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
         <button className="adminBtn"type="button" name="about" onClick={this.handleMenu}>
          About<span>></span>
  </button>     
  <button className="adminBtn"type="button" name="contact" onClick={this.handleMenu}>
          Contact<span>></span>
  </button> 
 <button className="adminBtn"type="button" name="teams" onClick={this.handleMenu}>
          Teams<span>></span>
  </button>
<button className="adminBtn"type="button" name="messages" onClick={this.handleMenu}>
          Messages <span>></span>
         </button>
         <button className="adminBtn"type="button" name="members" onClick={this.handleMenu}> 
          Members <span>></span>
         </button>     
         <button className="adminBtn"type="button" name="players" onClick={this.handleMenu}>
          Players <span>></span>
         </button>   
         <button className="adminBtn"type="button" name="accounts" onClick={this.handleMenu}>
          Accounts <span>></span>
         </button>    
         <button className="adminBtn"type="button" name="privacy" onClick={this.handleMenu}>
          Privacy Statement <span>></span>
         </button>    
         <button className="adminBtn"type="button" name="terms" onClick={this.handleMenu}>
          Terms of use <span>></span>
         </button>    
         <button className="adminBtn"type="button" name="license" onClick={this.handleMenu}>
          License Agreement <span>></span>
         </button>    
         <Link to="/">
         <button className="adminBtn"type="button" name="close">
          Close Admin</button>    
          </Link>
</div>
<div id="adminBody">

{this.state.editView === 'home'?
<AdminEditHome/>
:
this.state.editView === 'about'?
<AdminEditAbout/>
:
this.state.editView === 'contact'?
<AdminEditContact/>
:

this.state.editView === 'teams'?
<EditTeams/>
:

this.state.editView === 'messages'?
<Messages/>
:

this.state.editView === 'members'?
<EditUser/>

:
/*
this.state.editView === 'players'?
<AdminEditPlayer/>
:
this.state.editView === 'accounts'?
<Accounts/>
:
*/
this.state.editView === 'privacy'?
<AdminEditPrivacy/>
:

this.state.editView === 'terms'?
<AdminEditTerms/>
:

this.state.editView === 'license'?
<AdminEditLicense/>
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