import React, {Component} from 'react';
import './AddTeamPlayer.css';






class AddTeamPlayer extends Component {
    constructor(props){
      super(props);
    
      this.state = {
        players: '',
        selectedPlayers:[],
      allPlayers:  [
        {
name:{firstName: "Jawon",lastName:"White"},
nicName: "Jawhite",
age: 9,
positionPref: "running back"
        },
        {
            name:{firstName: "JaBrian",lastName:"Weems"},
            nicName: "Jaweem",
            age: 8,
            positionPref: "quarter back"
                    },

                    {
                        name:{firstName: "LaRon",lastName:"Akamoombie"},
                        nicName: "Lamoomy",
                        age: 8,
                        positionPref: "center"
                                },
    
    ]
  
      };








      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSelectPlayer = this.handleSelectPlayer.bind(this);
      this.handleRemoveSelectedPlayer=this.handleRemoveSelectedPlayer.bind(this);
    }




    handleChange(event) {
        this.setState({selectedPlayer: event.target.value});
    }


handleSelectPlayer(player){
    var joined = this.state.selectedPlayers.concat(player);
this.setState({selectedPlayers: joined })
}

handleRemoveSelectedPlayer(player){
    
}

handleSubmit(event){

var playerFormData={
    playerFirstName: this.state.playerFirstName,
    playerLastName: this.state.playerLastName,
    playerNicName: this.state.playerNicName,
    playerAge: this.state.playerAge,
    playerPositionPreference: this.state.playerPositionPreference
}
//this.props.addPlayer(event, playerFormData);

}

    render(){
        


    
          return(
  
<div id="playerAdd">
<div id="addPlayersList">
<div className="playerFormTop">Add Players</div>

<div id="unAssignedPlayers">

{this.state.allPlayers.map(function(player){

return(

<div id="mrow" key={player.firstName}>
<div>{player.name.firstName}</div>
<div>{player.name.lastName}</div>
<div>{player.nicName}</div>
<div>{player.age}</div>
<div>{player.positionPref}</div>
<div>
<button className="adminEditGameButton" id="gameEditBtn"type="button" onClick={()=> this.handleSelectPlayer(player.name.firstName)} >
           Add
         </button>

</div>
</div>


 

);


},this)}





</div>

</div>



<div id="assignedPlayers">
{this.state.selectedPlayers.map(function(player){

return(
<div id="myrow">
<div>{player}</div>
{/* <div>{player.name.lastName}</div>
<div>{player.nicName}</div>
<div>{player.age}</div>
<div>{player.positionPref}</div> */}
<div>
<button className="adminEditGameButton" id="gameEditBtn"type="button" >
           Remove
         </button>

</div>
</div>



);
    
},this)}



</div>




</div>


          )

    }








}

export default AddTeamPlayer;