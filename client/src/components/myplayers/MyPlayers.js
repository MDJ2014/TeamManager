import React, {Component} from 'react';
import './MyPlayers.css';



class MyPlayers extends Component{

    constructor(props){
        super(props);
      
        this.state = {
          renderedResponse: '',
        numPlayers: 0
          
        };
       this.handleMyClick = this.handleMyClick.bind(this);
      }
    
   handleMyClick(){
 this.props.editmode();
//this.setState({numPlayers: 7});
    }


      render(){

        return(


<div id="playersContainer">
{this.props.myplayers.map(function(player,index){
  return(
<div id="playerContainer" key={index}>
<div id="profilePlayerFirstName"><div className="profileFormLabels">First name:</div>
<div className="playerFormResult">{player.name.firstName}</div></div>
<div id="profilePlayerLastName"><div className="profileFormLabels">Last name:</div><div className="playerFormResult">{player.name.lastName}</div></div>
<div id="profilePlayerNicName"><div className="profileFormLabels">Nicname:</div><div className="playerFormResult">{player.nicName}</div></div>
<div id="profilePlayerAge"><div className="profileFormLabels">Age:</div><div className="playerFormResult">{player.playerAge}</div></div>
<div id="profilePlayerPosition"><div className="profileFormLabels">Pos. pref:</div><div className="playerFormResult">{player.positionPref}</div></div>
<div id="profilePlayerTeam"><div className="profileFormLabels">Team:</div><div className="playerFormResult">{player.team}</div></div>
<div id="myTeamLogo"><div id="teamLogo"></div></div>
<div className="space"></div>
<button id="playerEditBtn"type="button" onClick={this.handleMyClick}>
   Edit
      </button>
      <div className="space"></div>
</div>
  );
},this)}
</div>

        )
      }




}
export default MyPlayers;