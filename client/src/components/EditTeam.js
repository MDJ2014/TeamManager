import React, {Component} from 'react';

import EditGame from '../components/EditGame';
import AddGame from '../components/AddGame';
import Roster from '../components/Roster';
import AddTeamPlayer from '../components/AddPlayer';
import AddCoach from '../components/AddCoach';
import EditMessage from '../components/EditMessage';
import Schedule from '../components/Schedule';
import EditPlayer from '../components/EditPlayer';
import EditCoaches from '../components/EditCoaches';
import TeamMessages from './TeamMessages';






class EditTeam extends Component{
    constructor(props){
        super(props);
      
        this.state = {
          teamToEdit:"",
   
          teamName:"",
          ageGroup:"",
          teamLogo:"",
           delete: false,
           editGame: false,
           addGame: false,
           addPlayer: false,
           addCoach: false,
           addMessage: false,
          editMessage: false,
            deleteMessage:false,
           editTeamName: false,
           editCoach:false,
          
           deleteCoach:false,
           saveSuccess:false,
           showSchedule: true,
           showRoster: true,
           playerToEdit: false,
           playerEditSuccess:false,
           showCoaches:true,
           showTeamMessages:true
        }
        this.clickDelete = this.clickDelete.bind(this);
        //this.clickEditGame = this.clickEditGame.bind(this);
        this.handleEditGame=this.handleEditGame.bind(this);
        this.clickAddGame = this.clickAddGame.bind(this);
        this.clickAddPlayer = this.clickAddPlayer.bind(this);
        this.clickAddCoach = this.clickAddCoach.bind(this);
        this.clickDeleteCoach = this.clickDeleteCoach.bind(this);
        this.clickAddMessage = this.clickAddMessage.bind(this);
        this.clickEditTeamName = this.clickEditTeamName.bind(this);
        this.clickDeleteMessage = this.clickDeleteMessage.bind(this);
        this.handleTeamNameSubmit = this.handleTeamNameSubmit.bind(this);
        this.setSuccessMessage=this.setSuccessMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentReRender=this.componentReRender.bind(this);
        this.reRenderParent=this.reRenderParent.bind(this);
        this.refreshSchedule=this.refreshSchedule.bind(this);
        this.refreshRoster=this.refreshRoster.bind(this);
        this.handleSelectEditPlayer=this.handleSelectEditPlayer.bind(this);
        this.cancelEditPlayer=this.cancelEditPlayer.bind(this);
        this.coachesRerender=this.coachesRerender.bind(this);
        this.setMessageEdit = this.setMessageEdit.bind(this);
        this.teamMessagesRerender = this.teamMessagesRerender.bind(this);
        this.reSetPane = this.reSetPane.bind(this);
    }







    componentDidMount(){
 
   this.componentReRender();
  }

componentReRender(){
  this.setState({
    teamToEdit: this.props.teamToEdit._id,
    teamName:this.props.teamToEdit.teamName,
    ageGroup:this.props.teamToEdit.ageGroup,
    teamLogo:this.props.teamToEdit.logo,
 

  });

}

  setSuccessMessage(item){
    setTimeout(() => {
     this.setState({
         [item]: ''
     });
 }, 1400)
}

reRenderParent(){
  setTimeout(() => {
  this.props.reRender();
}, 2200)
}

refreshSchedule(){
  this.setState({showSchedule:false})
  setTimeout(() => {
    this.setState({showSchedule:true})
  }, 1400)
}

refreshRoster(){
  this.setState({showRoster:false})
  setTimeout(() => {
    this.setState({showRoster:true})
  }, 1400)
}

reSetPane(item){
if(item="add"){
  this.setState({addMessage: false})
}else{
  this.setState({editMessage:false})
}
}
coachesRerender(){
  this.setState({showCoaches:false})
  setTimeout(() => {
    this.setState({showCoaches:true})
  }, 1200)
}

teamMessagesRerender(){
  this.setState({showTeamMessages:false})
  setTimeout(() => {
    this.setState({showTeamMessages:true})
  }, 1200)
}

handleChange(event) {
  const target = event.target;
  const value = target.value;
  const name = target.name;

this.setState({[name]: value});
}

clickDelete(){
    this.state.delete? this.setState({delete: false}):this.setState({delete:true});
}


handleEditGame(game){
 this.setState({editGame: game, addGame: false});
 
}



// clickEditGame(item){
//     this.setState({editGame: item, addGame: false});
   

// }
clickAddGame(){
    this.setState({addGame:true, editGame:false});
   

}

handleCloseEditAdd(){
    this.setState({editGame: false, addGame:false});
}


clickAddPlayer(){
    this.state.addPlayer? this.setState({addPlayer: false}):this.setState({addPlayer:true,  playerToEdit:false});
}

clickAddCoach(){
    this.state.addCoach? this.setState({addCoach: false}):this.setState({addCoach:true});
}

clickDeleteCoach(){
  this.state.deleteCoach? this.setState({deleteCoach:false}):this.setState({deleteCoach:true});
}

clickAddMessage(){
    this.setState({addMessage:true, editMessage:false});
   // this.state.addMessage? this.setState({addMessage: false}):this.setState({addMessage:true});
}

clickEditTeamName(){
this.state.editTeamName? this.setState({editTeamName:false}) : this.setState({editTeamName: true});
}

clickEditCoach(){
this.state.editCoach? this.setState({editCoach:false}): this.setState({editCoach:true});
}
clickDeleteMessage(msg){
  this.state.deleteMessage? this.setState({deleteMessage:false}) : this.setState({deleteMessage:true});
}

cancelEditPlayer(){
  this.setState({playerEdit:false,
    playerToEdit:false,

  })
}

handleTeamNameSubmit= async(event)=>{
        event.preventDefault();
    
        var patt = new RegExp('(?<=-).*');
        var suffix = this.state.teamName.match(patt); 
          var newName =  this.state.teamName.replace(suffix,this.state.ageGroup);

        const body = JSON.stringify({
         teamId: this.props.teamToEdit._id,
         newTeamInfo:{
         teamName: newName,
         logo:this.state.teamLogo,
         ageGroup: this.state.ageGroup,
        
        }
         
  });
  
  const headers = {'content-type': 'application/json', accept: 'application/json'};
  
  await fetch('/teams/team/update',{method: 'PUT', headers, body})
  .then((res)=>this.setState({saveSuccess:true}))
 .then(this.setSuccessMessage("saveSuccess"))
 .then(this.clickEditTeamName)
 .then(this.reRenderParent())
  .catch(function(response){
    //this.setState({error:true, errmsg: error});
    //console.log(response.data)
  })


}

handleSelectEditPlayer(player){
this.setState({playerToEdit:player, addPlayer:false})
}
  
setMessageEdit(id){
  this.setState({editMessage:id, addMessage:false});
}



render(){
return(

<div id="adminEditTeam">

<div id="top">
<button type="button" id="teamEditCancelBtn" className="sectionButton" onClick={()=>this.props.cancelEdit()}>
         Close
         </button>
         <div id="pageLinks">
         <a className="headerLinks" href="#roster">roster</a>
         <a className="headerLinks" href="#coaches">coaches</a>
         <a className="headerLinks" href="#messages">messages</a>
         </div>
</div>

<div className="adminEditTeamTop" id="editTeamTop">

{this.state.editTeamName? 
  <div id="editTeamNameForm">
  <form id="teamForm" action="" onSubmit={this.handleTeamNameSubmit}>
  <h6>Team Name</h6>
   <input className="team-edit-form-input" type="text" name="teamName"value={this.state.teamName} onChange={this.handleChange} placeholder="Team name"/>
   <div className="space"></div>
   <h6>Age Group</h6>
   <input  className="team-edit-form-input" type="text" name="ageGroup"value={this.state.ageGroup} onChange={this.handleChange} placeholder="Team age group"/>
   <div className="space"></div>
   <h6>Logo</h6>
   <input  className="team-edit-form-input" type="text" name="teamLogo"value={this.state.teamLogo} onChange={this.handleChange} placeholder="Team Logo"/>
   <div className="space"></div>


   <button id="saveTeamButton"   className="sectionButton" type="submit">
             Save
           </button>
      
 <button className="sectionButton" id="teamNameEditBtn"type="button" onClick={this.clickEditTeamName}>
  Cancel
</button>

  </form>

  
  </div>






  :
<div id="adminEditTeamTeamName">

<div id="editTitleTeamName">{this.state.teamName}
{this.state.saveSuccess? <h6>Information saved.</h6>:null}
<button className="adminEditButton" id="teamNameEditBtn"type="button" onClick={this.clickEditTeamName}>
       Edit
     </button>
 
</div>
     <div id="adminTeamEditSectionLogoContainer" className="adminTeamLogo">
     <img className="center" src={`/images/${this.state.teamLogo}.png`}></img>
       </div>

</div>

  }


    </div>





<div id="schedule">
<div className="adminEditTeamCat">Schedule</div>
<div className="adminEditTeamBody">

{this.state.showSchedule? 
<Schedule  teamId={this.props.teamToEdit._id} editGame={this.handleEditGame} />

: null}

  

  

 

<div className="space"></div>

 <button className="sectionButton" id="editTeamAddGameButton"type="submit" onClick={this.clickAddGame}>
           Add Game
         </button>    


</div>
</div>

<div id="scheduleEdit">
<h5>Edit pane</h5>

 {this.state.editGame? 
<EditGame game={this.state.editGame} teamId={this.state.teamToEdit} ageGroup={this.state.ageGroup}  reRender={()=>this.refreshSchedule()} />
:
this.state.addGame?
<AddGame teamId={this.state.teamToEdit} ageGroup={this.state.ageGroup} reRender={()=>this.refreshSchedule()}/>
    :
    null
} 




</div>

<div id="roster">
<div className="adminEditTeamCat">Roster<span className="topLink"><a href="#top">top</a></span></div>

<div className="adminEditTeamBody">

<div id="adminEditPlayerList">

{this.state.showRoster?
 <Roster teamToAssign={this.props.teamToEdit._id} reRender={()=>this.refreshRoster()}
 editPlayer={this.handleSelectEditPlayer}
 /> 
 :null}


</div>


<button type="button" id="addPlayerBtn" className="sectionButton" onClick={this.clickAddPlayer}>
      
{this.state.addPlayer? "Close" : "Add Player" }
         </button>  
</div>


</div>

<div id="rosterEdit">
  {this.state.addPlayer?
    <div>
<h5>Add player pane</h5>

<AddTeamPlayer ageGroup={this.state.ageGroup} teamToAssign={this.state.teamToEdit} reRender={()=>this.refreshRoster()}
editPlayer={this.handleSelectEditPlayer}
/>
</div>
:
<div>
  {this.state.playerToEdit? 
    <div>
    <h4>Edit player panel</h4>
    <EditPlayer  playerToEdit={this.state.playerToEdit} adminEdit={true}
  cancelEditPlayer={this.cancelEditPlayer} reRender={()=>this.refreshRoster()}
  setPlayerSaveSuccess={()=>this.setState({playerEditSuccess:true})}
  setPlayerEditSuccess={this.setSuccessMessage}
  />
</div>
    :
    <div>
{this.state.playerEditSuccess? <h5>Player data saved</h5>: null}

    </div>
  
    }
</div>

}



</div>


<div id="coaches">
 <div className="adminEditTeamCat">Coaches<span className="topLink"><a href="#top">top</a></span></div>

<div id="coachesHeader"></div>
<div className="adminEditTeamBody">

{this.state.showCoaches? 
<EditCoaches teamId={this.state.teamToEdit}/>
:null}


{this.state.deleteCoach? 
  
 
  <div className="deleteWarning" id="playerDeleteWarning"><h6>Are you sure you want to remove this coach from the team? </h6>
  <div id="playerDelCancelBtn">
  <button className="adminEditGameButton" id="playerDelCancelBtn"type="button" onClick={this.clickDeleteCoach}>
             Cancel
           </button>
   </div>      
   <div id="commitPlayerDelBtn">
    <button className="adminEditGameButton" id="commitDeletePlayerBtn"type="button" >
             Delete
           </button> 
   </div>  
  </div>

  
  
  :


null

}






<button type="button" id="addCoachBtn" className="sectionButton" onClick={this.clickAddCoach}>
       {this.state.addCoach? "Close": "Add Coach"}
         </button>  
</div>
</div>

<div id="coachesEdit">
<h5>Available Coaches</h5>
{this.state.addCoach?

<AddCoach teamId={this.state.teamToEdit} reRender={this.coachesRerender}/>
:
null
}
</div>






<div id="messages">
<div className="adminEditTeamCat">Messages<span className="topLink"><a href="#top">top</a></span></div>
<div id="messageList">

{this.state.showTeamMessages? 
<TeamMessages editMessage={this.setMessageEdit}/>
:null}

</div>


{this.state.deleteMessage? 
  
 
  <div className="deleteWarning" id="playerDeleteWarning"><h6>Are you sure you want to delete this message? </h6>
  <div id="playerDelCancelBtn">
  <button className="adminEditGameButton" id="playerDelCancelBtn"type="button" onClick={this.clickDeleteMessage}>
             Cancel
           </button>
   </div>      
   <div id="commitPlayerDelBtn">
    <button className="adminEditGameButton" id="commitDeletePlayerBtn"type="button" >
             Delete
           </button> 
   </div>  
  </div>

  
  
  :


null

}









<button type="button" id="addMessageBtn" className="sectionButton" onClick={this.clickAddMessage}>
       Add Message
         </button>  

</div>



<div id="messageEdit">
<h5>Edit pane</h5>


{this.state.addMessage?
<EditMessage status={"add"} reRender={this.teamMessagesRerender} reSet={()=>this.reSetPane("add")} type={"team"}/>
:
<div>
{this.state.editMessage?
  <EditMessage msgToEdit={this.state.editMessage} status={"edit"} reRender={this.teamMessagesRerender} reSet={()=>this.reSetPane("edit")} type={"team"}/>
  :null}
</div>
}

</div>




</div>
);

}

}



export default EditTeam;