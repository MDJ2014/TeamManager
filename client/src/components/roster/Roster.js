import React, {Component} from 'react';
import './Roster.css';




class Roster extends Component {
    constructor(props){
      super(props);
    
      this.state = {
  removePlayer: false
               
      };
    //   this.handelMenu = this.handelMenu.bind(this);
  this.removePlayer = this.removePlayer.bind(this);
    }





removePlayer(){
    this.state.removePlayer? this.setState({removePlayer:false}) : this.setState({removePlayer:true});
}




render(){

return(
<div id="rosterContainer">

<div id="rosterHeader">
<div id="headerFirstName" className="listLong">First Name</div>
<div id="headerLastName" className="listLong">Last Name</div>
<div id="headerNic" className="listLong">Nicname</div>
<div id="rosterPlayerAge"className="listShort">Age</div>
<div id="headerPositionPref" className="listLong">Pos Pref</div>
<div id="headerAssignedPos" className="listLong">Position</div>
<div id="headerNumber" className="listShort">Number</div>
<div id="rosterSpace" className="listLong"></div>
</div>

<div id="rosterList">
<div id="rosterRow">
<div id="playerFirstName" className="listLong">Billy</div>
<div id="playerLastName" className="listLong">Befins</div>
<div id="nic" className="listLong">BillyBef</div>
<div id="rosterPlayerAge" className="listShort">8</div>
<div id="playerPositionPref" className="listLong">line backer</div>
<div id="playerAssignedPos" className="listLong">nose guard</div>
<div id="playerNumber" className="listShort">99</div>
<div id="playerEditBtn" className="listShort">
<button className="adminEditGameButton" id="playerEditButton"type="button" onClick={this.clickEditGame}>
           Edit
         </button>
</div>
<div id="playerDeleteBtn" className="listShort">
<button className="adminEditGameButton" id="playerDeleteButton"type="button" onClick={this.removePlayer}>
           Del
         </button> 
</div>







</div>

{this.state.removePlayer? 
    <div className="deleteWarning" id="playerDeleteWarning"><h6>Are you sure you want to remove this player from the team? </h6>
    <div id="playerDelCancelBtn">
    <button className="adminEditGameButton" id="playerDelCancelBtn"type="button" onClick={this.removePlayer}>
               Cancel
             </button>
     </div>      
     <div id="commitPlayerDelBtn">
      <button className="adminEditGameButton" id="commitDeletePlayerBtn"type="button" >
               Delete
             </button> 
     </div>  
    </div>
    : null}
</div>



</div>
)



}




}
export default Roster;