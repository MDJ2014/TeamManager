import React, {Component} from 'react';
import './EdiptPlayer.css';






class EditPlayer extends Component {
    constructor(props){
      super(props);
    
      this.state = {
        renderedResponse: '',
        playerFirstName:'',
        playerLastName:'',
        playerNicName:'',
        playerAge:'',
        playerPositionPreference:''
  
  
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
     // this.cancelEdit = this.cancelPlayerEdit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
  
      this.setState({[name]: value});
    }

    // cancelPlayerEdit=()=>{
    //   this.props.cancelThisEdit();
    // }

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








    render(){
        
let player = this.props.playerToEdit;

    
          return(

<div id="editPlayerContainer" key={player._id}>
<h4>Edit player: {player.name.firstName}</h4>
<form id="playerForm" action="" onSubmit={this.handleSubmit}>
<div>First name</div>
 <input className="playerInput" type="text" name="playerFirstName"value={this.state.playerFirstName} onChange={this.handleChange} placeholder={player.name.firstName}/>

 <div>Last name</div>
 <input className="playerInput" type="text" name="playerLastName"value={this.state.playerLastName} onChange={this.handleChange} placeholder={player.name.lastName}/>

 <div>Nicname</div>
 <input className="playerInput" type="text" name="playerNicName"value={this.state.playerNicName} onChange={this.handleChange} placeholder={player.nicName}/>

 <div>Age</div>
 <input className="playerInput" type="text" name="playerAge"value={this.state.playerAge} onChange={this.handleChange} placeholder={player.playerAge}/>
 
 <div>Position Preference</div>
 <input className="playerInput" type="text" name="playerPositionPreference"value={this.state.playerPositionPreference} onChange={this.handleChange} placeholder={player.positionPref}/>
 <div className="space"></div>
 <div id="editPlayerBtns">
<button id="playerRegisterButton" type="submit">
           Save
         </button>
         <div className="space"></div>  

           
         </div>            
</form>
</div>



  /*
<div id="playersContainer">

{this.props.playersToEdit.map((player,index)=>{
return(

<div id="editPlayerContainer" key={index}>
<h4>Edit player: {player.name.firstName}</h4>
<form id="playerForm" action="" onSubmit={this.handleSubmit}>
<div>First name</div>
 <input className="playerInput" type="text" name="playerFirstName"value={this.state.playerFirstName} onChange={this.handleChange} placeholder={player.name.firstName}/>

 <div>Last name</div>
 <input className="playerInput" type="text" name="playerLastName"value={this.state.playerLastName} onChange={this.handleChange} placeholder={player.name.lastName}/>

 <div>Nicname</div>
 <input className="playerInput" type="text" name="playerNicName"value={this.state.playerNicName} onChange={this.handleChange} placeholder={player.nicName}/>

 <div>Age</div>
 <input className="playerInput" type="text" name="playerAge"value={this.state.playerAge} onChange={this.handleChange} placeholder={player.playerAge}/>
 
 <div>Position Preference</div>
 <input className="playerInput" type="text" name="playerPositionPreference"value={this.state.playerPositionPreference} onChange={this.handleChange} placeholder={player.positionPref}/>
 <div className="space"></div>
 <div id="editPlayerBtns">
<button id="playerRegisterButton" type="submit">
           Save
         </button>
         <div className="space"></div>  
 <button id="cancelRegistrationButton" type="button">
           Cancel
         </button>
         <div className="space"></div>        
         </div>            
</form>
</div>


)})}


</div>
*/
          )

    }



}

export default EditPlayer;
