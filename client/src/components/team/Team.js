import React, {Component} from 'react';
import './Team.css';






class Team extends Component {
    constructor(props){
      super(props);
    
      this.state = {
        renderedResponse: '',
          
      };
    //   this.handleChange = this.handleChange.bind(this);
    //   this.handleSubmit = this.handleSubmit.bind(this);
    }


    getResponse = async()=>{
        const response = await fetch('/users/profile',{method:'GET', headers:{'Content-Type': 'application/json'}
      
      });
        const body = await response;
        if (response.status !== 200) 
        //throw Error(body.message);
        {
    
        } else{
           return body; 
        }
  
    
    
      }



      componentDidMount(){
 
        // fetch('/users/profile')
        // .then(data => data.json())
        // .then((data) => { 
        //   this.setState({ profileData: data }, ()=>console.log("data fetched...", data)) 
        // }); 
      
       }





// handleSubmit(event){


// }

    render(){
        


    
          return(
  
<div>

<div id="teamContainer">
<div id="teamHeader">
<div id="teamName">Rams
<div id="teamStats">5/1</div>
</div>
<div id="teamPageLogo">logo</div>
<div id="coaches">
<ul>
    <li><div>Bob</div><div>Head coach</div></li>
</ul>
</div>
</div>


<div id="teamMainMessage">msg</div>

<div id="teamBody">
<div id="teamSchedule">
<div id="scheduleTitle">2019 Schedule</div>

<div id="scheduleDate">Date</div>
<div id="scheduleOpponent">Opponent</div>
<div id="scheduleLocation">Location</div>
<div id="scheduleHomeAway">Home/Away</div>
<div id="scheduleTeamScore">Our Score</div>
<div id="scheduleOpponentScore">Opponent Score</div>


<div id="scheduleBody">
<div id="game">
<div id="gameDate">6/17/2019</div> 
<div id="gameOpponent">Bucs</div>  
 <div id="gameLocation">City Park</div>
 <div id="gameHome">Home</div>
 <div id="gameTeamScore">17</div>
 <div id="gameOpponentScore">14</div>
 </div>

</div>

</div>

<div id="teamRoster">
<div id="rosterTitle">Roster</div>


<div id="rosterPlayerName">Name</div>
<div id="rosterPlayerPos">Position</div>
<div id="rosterPlayerNum">Number</div>

<div id="rosterBody">

<div><div>Zootie Smith</div><div>quarterback</div><div>14</div></div>



</div>
</div>

</div>

<div id="teamSecondMessage">msg</div>


</div>
</div>
          );

    }

}

export default Team;