import React, {Component} from 'react';







class AddTeamPlayer extends Component {
    constructor(props){
      super(props);
    
      this.state = {
        players: '',
        selectedPlayers:[],
      allPlayers: "",
      saveSuccess:false
  
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSelectPlayer = this.handleSelectPlayer.bind(this);
      this.handleRemoveSelectedPlayer=this.handleRemoveSelectedPlayer.bind(this);
      this.componentReRender=this.componentReRender.bind(this);
      this.setSuccessMessage=this.setSuccessMessage.bind(this);
    }



    componentDidMount(){
      this.componentReRender();
    }


    getResponse = async(ageGroup)=>{
      const response = await fetch(`/players/${ageGroup}`,{method:'GET', headers:{'Content-Type': 'application/json'}
    
    
    });
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body; 
    }


  
    componentReRender(){
  
     this.getResponse(this.props.ageGroup)
     .then(res => {
       const receivedData = res;

              this.setState({allPlayers: receivedData});
     });
   

  }

  setSuccessMessage(item){
   setTimeout(() => {
    this.setState({
        [item]: ''
    });
}, 1400)
}

    handleChange(event) {
        this.setState({selectedPlayer: event.target.value});
    }


handleSelectPlayer(player){
   var playerList=this.state.selectedPlayers;
   var playerId=player._id;
   var playerFound=false;

   for(let i=0; i<playerList.length; i++){
      if(playerList[i]._id === playerId){
         playerFound =true;
         break;
      }
   }

if(!playerFound){
     var joined = this.state.selectedPlayers.concat(player);
     this.setState({selectedPlayers: joined })
}
  
}

handleRemoveSelectedPlayer(player){
   var playerList=this.state.selectedPlayers;
    var playerId=player._id;

    for(let i=0; i<playerList.length; i++){
       if(playerList[i]._id === playerId){
       playerList.splice(i,1);
       }
    }
    this.setState({selectedPlayers:playerList});
}



handleSubmit=async(event)=>{

var playerIds= this.state.selectedPlayers.map(function(player){return(
   player._id
   )});


   const body = JSON.stringify({
      teamId: this.props.teamToAssign,
      players: playerIds
     
   });
   const headers = {'content-type': 'application/json', accept: 'application/json'};
  
   await fetch('/teams/assign-players',{method: 'PUT', headers, body})
   .then((res)=>this.setState({saveSuccess:true, selectedPlayers:[]}))
  .then(this.setSuccessMessage("saveSuccess"))
  .then(this.props.reRender())
   .catch(function(response){
     //this.setState({error:true, errmsg: error});
     //console.log(response.data)
   })
 
}

    render(){
        


    
          return(
  
<div id="playerAdd">
<div id="addPlayersList">
<div className="playerFormTop">Add Players</div>

<div id="unAssignedPlayers">



<table id="playerTable" className="systemTable">
<thead>
   <tr>
   <th>First Name</th>
   <th>Last Name</th>
   <th>Nic Name</th>
   <th>Age</th>
   <th>Position Pref</th>
     <th></th>
   </tr>
   </thead>




{this.state.allPlayers? 
   <tbody>

{this.state.allPlayers.map(function(player){
   
   if(player.team===null || player.team===""){

   
   
   return(


   <tr key={player._id}>
   <td>{player.name.firstName}</td>
<td>{player.name.lastName}</td>
<td>{player.nicName}</td>
<td>{player.playerAge}</td>
<td>{player.positionPref}</td>
<td><button className="adminEditButton" id="gameEditBtn"type="button" onClick={()=> this.handleSelectPlayer(player)} >
           Add
         </button>
         </td>

         </tr>


)
   }
},this)}


   </tbody>
   :null}   
   </table>









</div>

</div>







<div id="assignedPlayers">
{this.state.selectedPlayers.length>0? 
<table id="assignedPlayerTable" className="systemTable">
<thead>
<tr>
   <th>First Name</th>
   <th>Last Name</th>
   <th>Nic Name</th>
   <th>Age</th>
    <th>Position Pref</th>
   <th></th>
   </tr>
   </thead>
   <tbody>

   {this.state.selectedPlayers.map(function(player){return(

   <tr key={player._id}>
   <td>{player.name.firstName}</td>
<td>{player.name.lastName}</td>
<td>{player.nicName}</td>
<td>{player.age}</td>
<td>{player.positionPref}</td>
<td><button className="adminEditButton deleteBtn" id="playerRemoveBtn"type="button" onClick={()=>this.handleRemoveSelectedPlayer(player)}>
           Remove
         </button></td>
</tr>


   )},this)}



</tbody>
   </table>
:
<h5>Selected players appear here</h5>
}







</div>
{this.state.selectedPlayers.length>0? 
<button id="saveMessageButton" className="sectionButton" type="button" onClick={this.handleSubmit}>
           Save
         </button>
:null}

{this.state. saveSuccess? <h6>Players saved</h6>:null}
</div>


          )

    }








}

export default AddTeamPlayer;