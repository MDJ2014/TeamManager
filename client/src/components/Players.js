import React, {Component} from 'react';

import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';


import PlayerForm from '../components/PlayerForm';

import Logo from '../assets/vikings.png';

class Players extends Component {
    constructor(props){
        super(props);
        // alert(JSON.stringify(this.props, null, 4));
        
        this.state = {
            profileData:"",
            playerSet: "",
            
        
        }
this.handlePlayerEdit = this.handlePlayerEdit.bind(this);


    }




    componentDidMount(){
 
        // fetch('/users/profile')
        // .then(data => data.json())
        // .then((data) => { 
        //   this.setState({ profileData: data }, ()=>console.log("data fetched...", data)) 
        // }); 
       
       }


       handlePlayerEdit(){
         
        this.props.editmode(this.props.playerToShow._id);
       }


render(){
    let player = this.props.playerToShow;
    
    return(
    
<div id="playerContainer" key={player._id}>

<div id="profilePlayerFirstName" className="profileFieldContainer">
<div className="playerFormLabels">First name:</div>
<div className="playerFormResult">{player.name.firstName}</div>
</div>

<div id="profilePlayerLastName" className="profileFieldContainer">
    <div className="playerFormLabels">Last name:</div>
    <div className="playerFormResult">{player.name.lastName}</div>
    </div>

<div id="profilePlayerNicName"  className="profileFieldContainer">
    <div className="playerFormLabels">Nicname:</div>
    <div className="playerFormResult">{player.nicName}</div>
    </div>

<div id="profilePlayerAge"  className="profileFieldContainer">
    <div className="playerFormLabels">Age:</div>
    <div className="playerFormResult">{player.playerAge}</div>
    </div>

<div id="profilePlayerPosition" className="profileFieldContainer">
    <div className="playerFormLabels">Pos. pref:</div>
    <div className="playerFormResult">{player.positionPref}</div>
    </div>

<div id="profilePlayerTeam" className="profileFieldContainer">
    <div className="playerFormLabels">Team:</div>
    <div className="playerFormResult">{player.team}</div>
    </div>

    <div id="profilePlayerNumber" className="profileFieldContainer">
    <div className="playerFormLabels">Number:</div>
    <div className="playerFormResult">{player.playerNumber}</div>
    </div>

    <div id="profilePlayerNumber" className="profileFieldContainer">
    <div className="playerFormLabels">Position:</div>
    <div className="playerFormResult">{player.assignedPosition}</div>
    </div>

<div className="myTeamLogo"><div className="teamLogo"><img src={Logo}></img></div></div>
<div className="space"></div>
<div id="playerEditBtnContainer">
<button id="myPlayerEditBtn"type="button" className="sectionButton"onClick={this.handlePlayerEdit}>
   Edit
      </button>
      </div>
      <div className="space"></div>
</div>
    
   );
}



}
 


export default Players;
