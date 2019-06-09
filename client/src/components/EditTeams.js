import React, {Component} from 'react';

// import EditGame from '../editGame/EditGame';
// import AddGame from '../addGame/AddGame';
// import Roster from '../roster/Roster';
// import AddTeamPlayer from '../addTeamPlayer/AddTeamPlayer';
// import AddCoach from '../AddCoach/AddCoach';
// import AddMessage from '../addMessage/AddMessage';







class EditTeam extends Component{
    constructor(props){
        super(props);
      
        this.state = {
           delete: false,
           editGame: false,
           addGame: false,
           addPlayer: false,
           addCoach: false,
           addMessage: false
        }
        this.clickDelete = this.clickDelete.bind(this);
        this.clickEditGame = this.clickEditGame.bind(this);
        this.clickAddGame = this.clickAddGame.bind(this);
        this.clickAddPlayer = this.clickAddPlayer.bind(this);
        this.clickAddCoach = this.clickAddCoach.bind(this);
        this.clickAddMessage = this.clickAddMessage.bind(this);
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

clickAddCoach(){
    this.state.addCoach? this.setState({addCoach: false}):this.setState({addCoach:true});
}

clickAddMessage(){
    this.state.addMessage? this.setState({addMessage: false}):this.setState({addMessage:true});
}



render(){
return(



<div id="adminTeamContainer">
<div id="adminTeamHeader">
<h2>Teams</h2>
</div>
<div className="adminEditHomeSection">
<div className="teamSectionTitle"><h3>All Teams</h3>

</div>
    <div className="teamSectionBody">
    
    <div className="adminTeamContainer">
    <div className="adminTeamLogo"></div>
    <div className="adminTeamName"><h6>Cowboys</h6></div>
    <div className="adminTeamEditBtnContainer">
    <button type="button" className="adminTeamEditButton" onClick={this.handleEditTeam}>
         Edit 
         </button>  
    </div>
    </div>
    
    <div className="adminTeamContainer">
    <div className="adminTeamLogo"></div>
    <div className="adminTeamName"><h6>Cowboys</h6></div>
    <div className="adminTeamEditBtnContainer">
    <button type="button" className="adminTeamEditButton">
         Edit 
         </button>  
    </div>
    </div>




    </div>
<div id="addTeamBtnContainer">
{this.state.addTeam?
    <button type="button" onClick={this.handleAddTeam}>
       Close
         </button>  
  :
  <button type="button" onClick={this.handleAddTeam}>
       Add Team
         </button>  
  }


</div>
</div>

{this.state.addTeam?null
//<AddTeam/>
:
null
}


{this.state.editTeam?
<EditTeam/>
:null
}







</div>






);

}

}




export default EditTeam;