import React, {Component} from 'react';
import EditPlayer from '../components/EditPlayer';
import Popup from 'reactjs-popup';





class AdminEditPlayer extends Component {
    constructor(props){
      super(props);
    
      this.state = {
        playerData: '',
        playerFirstName:'',
        playerLastName:'',
        playerNicName:'',
        playerAge:'',
        playerPositionPreference:'',
        playerAssignedPosition:'',
        playerNumber:'',
        playerTeam:'',
        playerEdit: false,
        playerToEdit:'',
        playerDelete:false
  
  
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
     this.cancelEditPlayer = this.cancelEditPlayer.bind(this);
     this.handlePlayerDelete=this.handlePlayerDelete.bind(this);
     this.setDeleteSuccess=this.setDeleteSuccess.bind(this);
     this.componentRerender=this.componentRerender.bind(this);
    }




    getResponse = async() =>{
      const response = await fetch('/players');
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body; 
    }
    
    componentDidMount(){
      this.getResponse()
      .then(res => {
        const renderedResponse = res;
        this.setState({playerData: renderedResponse},()=>console.log(this.state.playerData));
      })
    }
  
    componentRerender(){
      this.getResponse()
      .then(res => {
        const renderedResponse = res;
        this.setState({playerData: renderedResponse},()=>console.log(this.state.playerData));
     
      });
  }
  
  
    setSuccessMessage(item){
      setTimeout(() => {
       this.setState({
           [item]: ''
       });
   }, 3000)
  }
  
  setDeleteSuccess(item){
    setTimeout(() => {
        this.setState({
            [item]: ''
        });
    }, 3000)
  }
  
  
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
  
      this.setState({[name]: value});
    }
  


    handlePlayerDelete= async(item)=>{
      //event.preventDefault();
    
      const body = JSON.stringify({
        playerId: item._id,
            
       });
    
       const headers = {'content-type': 'application/json', accept: 'application/json'};
    
       await fetch('/players/player',{method: 'DELETE', headers, body})
       //.then(this.handleErrors)
       .then((res)=>this.setState({playerDelete:res}))
       .then(this.setDeleteSuccess('playerDelete'))  
       .then(this.componentRerender)
        .catch(function(res){
          
       })

    }




    handleSubmit= async(event)=>{

    const body = JSON.stringify({
    playerId : this.props.playerToEdit,    
    playerFirstName: this.state.playerFirstName,
    playerLastName: this.state.playerLastName,
    playerNicName: this.state.playerNicName,
    playerAge: this.state.playerAge,
    playerPositionPreference: this.state.playerPositionPreference
});

const headers = {'content-type': 'application/json', accept: 'application/json'};

await fetch('/players/player',{method: 'PUT', headers, body})
.then((res)=>this.props.editPlayer())
.catch(function(response){
  //this.setState({error:true, errmsg: error});
  //console.log(response.data)
})




this.props.editPlayer();

}




clickEditPlayer(player){
  this.setState({

playerEdit:true,
playerToEdit:player,
  playerFirstName:player.name.firstName,
  playerLastName:player.name.lastName,
  playerNicName: player.nicName,
  playerAge: player.playerAge,
  playerPositionPreference: player.positionPref,
  playerAssignedPosition: player.assignedPosition,
  playerNumber: player.playerNumber,
  playerTeam: player.team



  });

}

cancelEditPlayer(){
  this.setState({playerEdit:false,
    playerToEdit:"",
    playerFirstName:"",
    playerLastName:"",
    playerNicName: "",
    playerAge: "",
    playerPositionPreference: "",
    playerAssignedPosition: "",
    playerNumber: "",
    playerTeam: ""
  })
}



    render(){
        
let player = this.props.playerToEdit;

    
          return(

<div id="editPlayerContainer">
<h4>Edit Players</h4>

<table id="userTable" className="systemTable">
   <thead>
   <tr>
   <th>Parent Last Name</th>
   <th>Parent First Name</th>
   <th>Player</th>
   <th>Age</th>
   <th>Team</th>
   <th></th>
   <th></th>
   </tr>
   </thead>


{this.state.playerData? 
   <tbody>



{this.state.playerData.map(function(player){
  return <tr  key={player._id}>

<td>{player.parent.name.lastName}</td>
<td>{player.parent.name.firstName}</td>
<td>{player.name.firstName}</td>
<td>{player.playerAge}</td>
{player.team? 
<td>{player.team.teamName}</td>
: <td>Not assigned</td>}

<td>
<button className="adminEditButton" id="userEditBtn"type="button" onClick={()=>this.clickEditPlayer(player)}>
             Edit
     </button> 
  </td>
<td>



<Popup trigger={<button  className="adminEditButton deleteBtn">Del</button>} 
modal  item={player._id}>
    {close => (
      <div className="modal">
        <a className="close" onClick={close}>
        &times;
        </a>
        <div className="header">Delete Member</div>
        <div className="content">
          {' '}
          Are you sure you want to delete {player.name.lastName}, {player.name.firstName}?
    
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
              this.handlePlayerDelete(player);
              close();
            }}
          >
            Delete
          </button>



        </div>
      </div>
    )}
  </Popup>









</td>
  </tr>

},this)}




   </tbody>
   :null}
   </table>
{this.state.playerDelete?<h6>Player deleted</h6> :null}


<div id="playerEditContainer">
{this.state.playerEdit? 
  
  <EditPlayer playerToEdit={this.state.playerToEdit} adminEdit={true}
  cancelEditPlayer={this.cancelEditPlayer}
  />
  :<h5>Edit pane</h5>}




</div>



</div>
        );

    }



}

export default AdminEditPlayer;
