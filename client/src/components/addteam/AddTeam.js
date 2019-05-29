import React, {Component} from 'react';
import './AddTeam.css';

class AddTeam extends Component{
    constructor(props){
        super(props);
      
        this.state = {
           
        }
        
    }





render(){
return(

<div id="adminAddTeam">
<div className="playerFormTop" id="teamFormTop">Add Teams</div>
<form id="teamForm" action="" onSubmit={this.handleSubmit}>

 <input className="playerInput" type="text" name="teamName"value={this.state.teamName} onChange={this.handleChange} placeholder="Team name"/>
 <div className="space"></div>
 <input className="playerInput" type="text" name="ageGroup"value={this.state.ageGroup} onChange={this.handleChange} placeholder="Team age group"/>
 <div className="space"></div>
 <input className="playerInput" type="text" name="teamLogo"value={this.state.teamLogo} onChange={this.handleChange} placeholder="Team Logo"/>
 <div className="space"></div>
 <button id="saveTeamButton" type="submit">
           Save
         </button>
    
</form>
</div>
);

}

}




export default AddTeam;