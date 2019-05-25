import React, {Component} from 'react';
import './Admin.css';



class Admin extends Component {
    constructor(props){
      super(props);
    
      this.state = {
        memberView: false,
        teamView: false,
        playerView: false,
        messageView: false,
        homePageView:false,
        editMember:false,
        editTeam:false,
        editPlayer:false
               
      };
     
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
 <button className="adminBtn"type="button">
          Home Page <span>></span>
         </button>
 <button className="adminBtn"type="button">
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
</div>
<div id="adminBody">










</div>
</div>
</React.Fragment>
);
      }
}
export default Admin;