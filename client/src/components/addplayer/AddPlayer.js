import React, {Component} from 'react';
import './AddPlayer.css';






class AddPlayer extends Component {
    constructor(props){
      super(props);
    
      this.state = {
        renderedResponse: '',
        numPlayers: 0,
        redirect:false,
        playerFirstName:'',
        playerLastName:'',
        playerNicName:'',
        playerAge:'',
        playerPositionPreference:''
  
  
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
  
      this.setState({[name]: value});
    }


handleSubmit(event){

var playerFormData={
    playerFirstName: this.state.playerFirstName,
    playerLastName: this.state.playerLastName,
    playerNicName: this.state.playerNicName,
    playerAge: this.state.playerAge,
    playerPositionPreference: this.state.playerPositionPreference
}
this.props.addPlayer(event, playerFormData);

}

    render(){
        


    
          return(
  
<div id="playerRegistration">
<div className="playerFormTop">Add Players</div>
<form id="playerForm" action="" onSubmit={this.handleSubmit}>

 <input className="playerInput" type="text" name="playerFirstName"value={this.state.playerFirstName} onChange={this.handleChange} placeholder="Player's First Name"/>
 <div className="space"></div>
 <input className="playerInput" type="text" name="playerLastName"value={this.state.playerLastName} onChange={this.handleChange} placeholder="Player's Last Name"/>
 <div className="space"></div>
 <input className="playerInput" type="text" name="playerNicName"value={this.state.playerNicName} onChange={this.handleChange} placeholder="Player's Nic Name"/>
 <div className="space"></div>
 <input className="playerInput" type="text" name="playerAge"value={this.state.playerAge} onChange={this.handleChange} placeholder="Player's Age"/>
 <div className="space"></div>
 <input className="playerInput" type="text" name="playerPositionPreference"value={this.state.playerPositionPreference} onChange={this.handleChange} placeholder="Player's Position Preference"/>
 <div className="space"></div>
<button id="playerRegisterButton" type="submit">
           Save
         </button>
        <h6 id="numPlayersText">Number of players: <span>{this.state.numPlayers}</span></h6>
</form>
</div>


          )

    }








}

export default AddPlayer;