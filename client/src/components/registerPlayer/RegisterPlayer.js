import React, {Component} from 'react';
import './RegisterPlayer.css';

class RegisterPlayer extends Component{

    constructor(props){
        super(props);
      
        this.state = {
          renderedResponse: '',
        numPlayers: 0
          
        };
        //this.onClick = this.onClick.bind(this);
      }
    
    
      render(){

        return(

            <div id="playerRegistrationBody">
            <h2>Player Registration</h2>
            <h5>Register each of your players one by one. </h5>
<div id="playerRegistration">
<div className="formTop">Register your player</div>
<form id="playerForm">

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

<section>
  <div id="payForm">
 <div className="formTop">Payment</div>

<div id="payBody">
<div id="payInfo">
<div>Number of players: <span>{this.state.numPlayers}</span></div>
<div>Fees:</div>
<div>FeeName:<span>fee amt</span></div>  
<div>Total:<span>150</span></div>
</div>
<div className="space"></div>
<form>
<input className="payerInput" type="text" name="payerFirstName"value={this.state.payerFirstName} onChange={this.handleChange} placeholder="Payer's First Name"/>
 <div className="space"></div>
 <input className="payerInput" type="text" name="payerFirstName"value={this.state.payerLastName} onChange={this.handleChange} placeholder="Payer's Last Name"/>
 <div className="space"></div>
 <input className="payerInput" type="text" name="payerStreet"value={this.state.playerStreet} onChange={this.handleChange} placeholder="Street"/>
 <div className="space"></div>
 <input className="payerInput" type="text" name="payerCity"value={this.state.payerCity} onChange={this.handleChange} placeholder="City"/>
 <div className="space"></div>
 <input className="payerInput" type="text" name="payerState"value={this.state.payerState} onChange={this.handleChange} placeholder="State"/>
 <div className="space"></div>
 <input className="payerInput" type="text" name="payerZip"value={this.state.payerZip} onChange={this.handleChange} placeholder="Zip code"/>
 <div className="space"></div>
 <input className="payerInput" type="text" name="payerPayType"value={this.state.playerPayType} onChange={this.handleChange} placeholder="Pay Type"/>
 <div className="space"></div>
 <input className="payerInput" type="text" name="payAmt"value={this.state.payAmt} onChange={this.handleChange} placeholder="Amt"/>
 <div className="space"></div>
 <button id="payButton" type="submit">
           Make Payment
         </button>
        
</form>
</div>

 </div>  

</section>



</div>
        )
      }




}
export default RegisterPlayer;