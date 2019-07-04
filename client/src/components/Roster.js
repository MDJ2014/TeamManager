import React, {Component} from 'react';
import Popup from 'reactjs-popup';




class Roster extends Component {
    constructor(props){
      super(props);
    
      this.state = {
        currentTeam:"",
       removePlayer: false,
        roster:"",
       saveSuccess:false,
        playerToEdit:false
               
      };

  this.removePlayer = this.removePlayer.bind(this);
  this.componentReRender=this.componentReRender.bind(this);
  this.handleDeleteFromTeam=this.handleDeleteFromTeam.bind(this);
  this.setSuccessMessage=this.setSuccessMessage.bind(this);
  this.parentRerender=this.parentRerender.bind(this);
  this.handleSelectEditPlayer=this.handleSelectEditPlayer.bind(this);
    }



    componentDidMount(){
     this.setState({currentTeam: this.props.teamToAssign}, ()=> this.componentReRender())

      
    }

  
    getResponse = async(team)=>{
      const response = await fetch(`/teams/roster/${team}`,{method:'GET', headers:{'Content-Type': 'application/json'}
    
    
    });
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body; 
    }

componentReRender(){
  
  this.getResponse(this.state.currentTeam) 
  .then(res => {
          const receivedData = res;
                 this.setState({roster: receivedData});
        });
      
}

setSuccessMessage(item){
  setTimeout(() => {
   this.setState({
       [item]: ''
   });
}, 1400)
}

parentRerender(){
  setTimeout(() => {
  this.props.reRender();
}, 1500)
}

handleSelectEditPlayer(player){
  this.setState({playerToEdit:player})
  }

handleDeleteFromTeam = async(player)=>{
  const body = JSON.stringify({
    teamId: this.props.teamToAssign,
    playerId:player
  });

  const headers = {'content-type': 'application/json', accept: 'application/json'};
  
  await fetch('/teams/delete-player',{method: 'PUT', headers, body})
  .then((res)=>this.setState({saveSuccess:true, removePlayer: false}))
 .then(this.setSuccessMessage("saveSuccess"))
 .then(this.parentRerender())
  .catch(function(response){
    //this.setState({error:true, errmsg: error});
    //console.log(response.data)
  })
  

}






removePlayer(player){
    this.state.removePlayer? this.setState({removePlayer:false}) : this.setState({removePlayer:player});
}




render(){

return(
  <div id="rosterBody">
<div id="rosterContainer">
  
<table id="rosterTable" className="systemTable">
<thead>
<tr>
<th>Last Name</th>
<th>First Name</th>
<th>Nicname</th>
<th>Age</th>
<th>Pos Pref</th>
<th>Assigned Pos</th>
<th>Number</th>
<th></th>
<th></th>
</tr>
</thead>

{this.state.roster.length>0? 
<tbody>

{this.state.roster.map(function(player){
return <tr key={player._id}>
  <td>{player.name.lastName}</td>
  <td>{player.name.firstName}</td>
  <td>{player.nicName}</td>
  <td>{player.playerAge}</td>
  <td>{player.positionPref}</td>
  <td>{player.assignedPosition}</td>
  <td>{player.playerNumber}</td>

  <td>
    {this.props.edit===true? 
    <button className="adminEditButton" id="playerEditButton"type="button" onClick={()=>this.props.editPlayer(player)}>
           Edit
         </button>
         : null}
         </td>

 <td>

 {this.props.edit===true? 
         <Popup trigger={<button  className="adminEditButton deleteBtn">Del</button>} 
modal id="tmModal" item={player._id}>
    {close => (
      <div className="modal">
        <a className="close" onClick={close}>
        &times;
        </a>
        <div className="header">Remove player</div>
        <div className="content">
          {' '}
          Are you sure you want to remove {player.name.lastName}, {player.name.firstName}?
    
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
              this.handleDeleteFromTeam(player._id);
              close();
            }}
          >
            Delete
          </button>



        </div>
      </div>
    )}
  </Popup>

: null}
   </td>        
</tr>

},this)}



</tbody>
:
null
}
  </table>






{this.state.saveSuccess? <h6>Player removed from team.</h6>:null}

</div>



</div>
)



}




}
export default Roster;