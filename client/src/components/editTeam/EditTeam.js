import React, {Component} from 'react';
import './EditTeam.css';
import EditGame from '../editGame/EditGame';
import AddGame from '../addGame/AddGame';
import Roster from '../roster/Roster';
import AddTeamPlayer from '../addTeamPlayer/AddTeamPlayer';








class EditTeam extends Component{
    constructor(props){
        super(props);
      
        this.state = {
           delete: false,
           editGame: false,
           addGame: false,
           addPlayer: false
        }
        this.clickDelete = this.clickDelete.bind(this);
        this.clickEditGame = this.clickEditGame.bind(this);
        this.clickAddGame = this.clickAddGame.bind(this);
        this.clickAddPlayer = this.clickAddPlayer.bind(this);
    }


clickDelete(){
    this.state.delete? this.setState({delete: false}):this.setState({delete:true});
}
clickEditGame(){
    this.setState({editGame: true, addGame: false});
   

}
clickAddGame(){
    this.setState({addGame:true, editGame:false});
   

}

handleCloseEditAdd(){
    this.setState({editGame: false, addGame:false});
}


clickAddPlayer(){
    this.state.addPlayer? this.setState({addPlayer: false}):this.setState({addPlayer:true});
}






render(){
return(

<div id="adminEditTeam">
<div className="adminEditTeamTop" id="editTeamTop"><div id="adminEditTeamTeamName">TEAM NAME</div><div id="adminTeamEditSectionLogoContainer"><div id="adminTeamEditSectionLogo"></div></div></div>

<div id="schedule">
<div className="adminEditTeamCat">Schedule</div>
<div className="adminEditTeamBody">

<div id="editScheduleHeader">
<div id="editScheduleDate">Date</div>
<div id="editScheduleOpponent">Opponent</div>
<div id="editScheduleLocation">Location</div>
<div id="editScheduleHomeAway">Home/Away</div>
<div id="editScheduleTeamScore">Our Score</div>
<div id="editScheduleOpponentScore">Opp. Score</div>
<div id="editScheduleGameSpace"></div>
</div>

<div id="game">
<div id="editGameDate">6/17/2019</div> 
<div id="editGameOpponent">Bucs</div>  
 <div id="editGameLocation">City Park</div>
 <div id="editGameHome">Home</div>
 <div id="editGameTeamScore">17</div>
 <div id="editGameOpponentScore">14</div>
 <div id="editScheduleGameEditBtn">
<button className="adminEditGameButton" id="gameEditBtn"type="button" onClick={this.clickEditGame}>
           Edit
         </button>
 </div>      
 <div id="editGameDelBtn">
  <button className="adminEditGameButton" id="gameDeleteBtn"type="button" onClick={this.clickDelete}>
           Del
         </button> 
 </div>  
  

 </div>
{this.state.delete? 
    <div className="deleteWarning"><h6>Are you sure you want to delete this game? </h6>
    <div id="editScheduleGameDelCancelBtn">
    <button className="adminEditGameButton" id="gameDelCancelBtn"type="button" onClick={this.clickDelete}>
               Cancel
             </button>
     </div>      
     <div id="editGameCommitDelBtn">
      <button className="adminEditGameButton" id="gameCommitDeleteBtn"type="button" >
               Delete
             </button> 
     </div>  
    </div>
    : null}
<div className="space"></div>

 <button className="adminHomeButton" id="editTeamAddGameButton"type="submit" onClick={this.clickAddGame}>
           Add Game
         </button>    


</div>
</div>

<div id="scheduleEdit">
<h5>Edit pane</h5>

{this.state.editGame? 
<EditGame/>
:
this.state.addGame?
<AddGame/>
    :
    null
}




</div>

<div id="roster">
<div className="adminEditTeamCat">Roster</div>
<div className="adminEditTeamBody">

<div id="adminEditPlayerList">

<Roster/>



</div>
<button type="button" id="addPlayerBtn" onClick={this.clickAddPlayer}>
       Add Player
         </button>  
</div>


</div>

<div id="rosterEdit">

{this.state.addPlayer?
<AddTeamPlayer/>
:
null
}
<div id="adminEditPlayerForm">

</div>


</div>


<div id="coaches">
<div className="adminEditTeamCat">Coaches</div>
<div id="coachesHeader"></div>
<div className="adminEditTeamBody">


<table>
   <thead>
   <tr>
   <th className="tbleRow">First Name</th>
   <th className="tbleRow">Last Name</th>
   <th className="tbleRow">Title</th>
   </tr>
   </thead>
   <tbody>
  <tr>
<td>Jake</td>
<td>Hess</td>
<td>Head Coach</td>
<td>
<button className="adminEditGameButton" id="coachEditBtn"type="button" onClick={this.clickEditGame}>
             Edit
           </button>

</td>
<td>
<button className="adminEditGameButton" id="coachDeleteBtn"type="button" onClick={this.clickDelete}>
             Del
           </button> 

</td>
  </tr>
   </tbody>
   </table>








<button type="button" id="addPlayerBtn" onClick={this.clickAddPlayer}>
       Add Coach
         </button>  
</div>
</div>

<div id="coachesEdit">
<div id="adminEditCoachForm">













</div>
</div>

</div>
);

}

}




export default EditTeam;