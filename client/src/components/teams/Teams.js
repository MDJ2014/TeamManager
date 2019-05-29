import React, {Component} from 'react';
import './Teams.css';
import AddTeam from '../addteam/AddTeam';
import EditTeam from '../editTeam/EditTeam';





class Teams extends Component {
    constructor(props){
      super(props);
    
      this.state = {
        addTeam: false,
        editTeam: false
               
      };
    //   this.handelMenu = this.handelMenu.bind(this);
    this.handleAddTeam = this.handleAddTeam.bind(this);
    this.handleEditTeam = this.handleEditTeam.bind(this);
    }


    handleAddTeam(){
        this.state.addTeam ? this.setState({addTeam:false}) : this.setState({addTeam: true});
        }

        handleEditTeam(){
            this.state.editTeam ? this.setState({editTeam:false}) : this.setState({editTeam: true});
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

{this.state.addTeam?
<AddTeam/>
:
null
}


{this.state.editTeam?
<EditTeam/>
:null
}







</div>
)



}








}
export default Teams;