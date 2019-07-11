import React, {Component} from 'react';

import AddTeam from '../components/AddTeam';
import EditTeam from '../components/EditTeam';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';




class AdminEditTeams extends Component{
    constructor(props){
        super(props);
      
        this.state = {
            teamsData:"",
           delete: false,
           deleteSuccess: false,
           editGame: false,
           addGame: false,
           addPlayer: false,
           addCoach: false,
           addMessage: false,
           addTeam: false,
           editTeam: ""

        }

        this.handleAddTeam = this.handleAddTeam.bind(this);
        this.handleEditTeam = this.handleEditTeam.bind(this);
        this.componentReRender = this.componentReRender.bind(this);
        this.cancelEditTeam = this.cancelEditTeam.bind(this);
        this.handleDeleteTeam = this.handleDeleteTeam.bind(this);
        this.setDeleteSuccess = this.setDeleteSuccess.bind(this);
    }



   

    getResponse = async()=>{
        const response = await fetch('/teams',{method:'GET', headers:{'Content-Type': 'application/json'}
      
      });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body; 
      }
      
      componentDidMount(){
        this.componentReRender();
      }

     componentReRender(){
  
        this.getResponse()
        .then(res => {
          const receivedData = res;
          this.setState({teamsData: receivedData});
        });
     }



     setDeleteSuccess(item){
        setTimeout(() => {
            this.setState({
                [item]: ''
            });
        }, 3000)
      }





clickEditGame(){
    this.setState({editGame: true, addGame: false});
   

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

handleAddTeam(){
    this.state.addTeam? this.setState({addTeam: false}) : this.setState({addTeam:true});
}

handleEditTeam(team){
    this.setState({editTeam:team},()=>this.editStart.scrollIntoView());

}

cancelEditTeam(){
    this.setState({editTeam: false},()=>this.teamStart.scrollIntoView());
}



handleDeleteTeam= async(item)=>{

    const body = JSON.stringify({
        teamId: item._id
      
     });

     const headers = {'content-type': 'application/json', accept: 'application/json'};

     await fetch('/teams/team/delete',{method: 'DELETE', headers, body})
     .then(this.handleErrors)
     
     .then((res)=>this.setState({deleteSuccess:true}))
     .then(this.setDeleteSuccess('deleteSuccess'))  
     .then(this.componentReRender)
      .catch(function(res){
        
     })



}



render(){
return(



<div id="adminTeamContainer" >
  
<div id="adminTeamHeader"  ref={(el)=>{this.teamStart = el} }>
<h2>Teams</h2>
<div id="addTeamBtnContainer">
{this.state.addTeam?
    <button type="button"  className="sectionButton" onClick={this.handleAddTeam}>
       Close
         </button>  
  :
  <button type="button"  className="sectionButton" onClick={this.handleAddTeam}>
       Add Team
         </button>  
  }
</div>
<div className="space"></div>
{this.state.deleteSuccess?<h6>Team deleted</h6>:null}
{this.state.addTeam?
    <AddTeam reRender={this.componentReRender}/>
    :
    null
    }
    



</div>

<div className="adminEditHomeSection">
<div className="teamSectionTitle"><h3>All Teams</h3>

</div>

{this.state.teamsData? 
    <div id="teamContainer"className="teamSectionBody">
      
    {this.state.teamsData.map(function(team){
    return <div className="adminTeamContainer" key={team._id}>
    <div className="adminTeamLogo">
    <img className="center" alt="logo"  src={`/images/${team.logo}.png`}></img>
    </div>
    <div className="adminTeamName"><h6>{team.teamName}</h6></div>
    <div className="adminTeamEditBtnContainer">
       
    <button type="button"  className="adminEditButton" onClick={()=>this.handleEditTeam(team)}>
         Edit 
         </button>  





         <Popup trigger={<button  className="adminEditButton deleteBtn">Del</button>} 
modal id="tmModal" item={team._id}>
    {close => (
      <div className="modal">
        <a className="close" onClick={close}>
        &times;
        </a>
        <div className="header">Delete Member</div>
        <div className="content">
          {' '}
          Are you sure you want to delete {team.teamName}?
    
        </div>
        <div className="actions">
         
          <button
            className="sectionButton"
            onClick={() => {
              console.log('modal closed ')
              close()
            }}
          >
           Cancel
          </button>



          <button
            className="sectionButton popupDelBtn"
            
            onClick={() => {
             this.handleDeleteTeam(team);
              close();
            }}
          >
            Delete
          </button>



        </div>
      </div>
    )}
  </Popup>







    </div>
    </div>
    
},this)}

    </div>
:null}





</div>



{this.state.editTeam?
<div id="editTeamContainer" ref={(el)=>{this.editStart = el }}>
<EditTeam teamToEdit={this.state.editTeam} reRender={this.componentReRender} cancelEdit={this.cancelEditTeam} modType={this.props.modType}/>
</div>
:null
}







</div>






);

}

}

AdminEditTeams.propTypes = {

  modType: PropTypes.string,

 
 };


export default AdminEditTeams;