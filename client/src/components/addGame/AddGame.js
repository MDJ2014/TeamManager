import React, {Component} from 'react';


class AddGame extends Component{
    constructor(props){
        super(props);
      
        this.state = {
           
        }
        
    }





render(){
return(

<div id="adminEditGame">
<div className="playerFormTop" id="gameEditTop">Add New Game</div>
<form id="editGameForm" action="" onSubmit={this.handleSubmit}>

<input className="playerInput" type="text" name="date"value={this.state.gameDate} onChange={this.handleChange} placeholder="Game date"/>
<div className="space"></div>
 <input className="playerInput" type="text" name="homeTeam"value={this.state.homeTeam} onChange={this.handleChange} placeholder="Home team name"/>
 <div className="space"></div>
 <input className="playerInput" type="text" name="awayTeam"value={this.state.awayTeam} onChange={this.handleChange} placeholder="Away team"/>
 <div className="space"></div>
 <input className="playerInput" type="text" name="location"value={this.state.location} onChange={this.handleChange} placeholder="Location"/>
 <div className="space"></div>
 <input className="playerInput" type="text" name="homeTeamScore"value={this.state.homeTeamScore} onChange={this.handleChange} placeholder="Home team score"/>
 <div className="space"></div>
 <input className="playerInput" type="text" name="awayTeamScore"value={this.state.awayTeamScore} onChange={this.handleChange} placeholder="Away team score"/>

 <div className="space"></div>
 <button id="saveTeamButton" type="submit">
           Save
         </button>
    
</form>
</div>
);

}

}




export default AddGame;