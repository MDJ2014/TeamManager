import React, {Component} from 'react';
import Schedule from './Schedule';
import Roster from './Roster';
import { Link } from 'react-router-dom';




class Team extends Component {
    constructor(props){
      super(props);
    
      this.state = {
          teamData: '',
          
      };
   
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
       var teamId =  this.props.match.params.id;

        fetch(`/teams/team/${teamId}`)
        .then(data => data.json())
        .then((data) => { 
          this.setState({teamData: data}) 
        }); 
      
       }





    render(){
        


    
          return(
            <div>
            {this.state.teamData? 
<div id="teamContainer">

<div id="teamHeader">
 <div id="teamPageName">{this.state.teamData.teamInfo.teamName}</div>
 <div>  <Link to={this.props.location.back} style={{ textDecoration: 'none' }}><h6 id="backLink">Back</h6></Link></div>
  <div id="teamPageHeaderLogo">
  <img className="center" src={`/images/${this.state.teamData.teamInfo.logo}.png`}></img>
  </div>
  <div id="teamPageCoaches">

{this.state.teamData.teamInfo.coaches.map(function(coach){
return <div className="coachContainer">
 <div className="coachTitle">{coach.position.title}</div>
 <div className="coachName">{coach.name.firstName}</div>
 <div className="coachName">{coach.name.lastName}</div>
 </div>

})}
  

 
  </div>
 </div>

 <div id="teamPageMessages">
{this.state.teamData.messages.map(function(message){
  return <div className="msgBody">
 <div className="msgTitle">{message.title}</div>
 <div className="msgAuthor">{message.author}</div>
 <div className="msgText">{message.body}</div>
  </div>
})}
 



 </div>



 <div id="teamPageBody">
<div id="teamSchedule">


<div id="scheduleTitle">Schedule</div>

<div>

<Schedule teamId={this.state.teamData.teamId} edit={false}/>

</div>
</div>


<div id="teamRoster">
<div id="rosterTitle">Roster</div>
<div>
  <Roster edit={false} teamToAssign={this.state.teamData.teamId}/>
</div>









</div>
</div>

<div id="standing"></div>









  </div>
  : <h6>......loading</h6>}
</div>
          );

    }

}

export default Team;