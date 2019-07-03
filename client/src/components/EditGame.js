import React, {Component} from 'react';
import Select from 'react-select';

class EditGame extends Component{
    constructor(props){
        super(props);
       
        this.state = {
            teamsData:"",
            gameDate:"",
           homeTeam:"",
           awayTeam:"",
           opponent:"",
           location:"",
           homeTeamScore:0,
           awayTeamScore:0,
           saveSuccess:false,
           initialHomeOrAway:"",
           homeOrAway:"",
           options:"",

           selectedOption:null
        }
        this.handleChange=this.handleChange.bind(this);
        this.setSuccessMessage=this.setSuccessMessage.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleSelectChange=this.handleSelectChange.bind(this);
    }


    



    getResponse = async(age)=>{
      
        const response = await fetch(`/teams/ageGroup/${age}`,{method:'GET', headers:{'Content-Type': 'application/json'}
      
      });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body; 
      }
      
      componentDidMount(){
        
        this.componentReRender();
      }

     componentReRender(){
        const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };
        var gdate = (new Date(this.props.game.date)).toLocaleString('en-US',DATE_OPTIONS);

        var gameOpponent="";
        if(this.props.teamId===this.props.game.homeTeam._id){
                gameOpponent=
                {"label": this.props.game.awayTeam.teamName, "value":this.props.game.awayTeam._id}
                
                
        }else{
            gameOpponent=
            {"label":  this.props.game.homeTeam.teamName, "value": this.props.game.homeTeam._id}
           
        }
      
        var homeOrAwayGame="";
        if(this.props.teamId===this.props.game.homeTeam._id){
            homeOrAwayGame="Home"
        }else{
            homeOrAwayGame="Away"
        }        



        var age=this.props.ageGroup;
        this.getResponse(age)
        .then(res => {
          const teams = res;

           this.setState({teamsData: teams,
            gameDate:gdate,
            homeTeam: this.props.game.homeTeam.teamName,
            awayTeam:this.props.game.awayTeam.teamName,
            location: this.props.game.location,
            homeTeamScore:this.props.game.homeTeamScore,
            awayTeamScore:this.props.game.awayTeamScore,
            selectedOption:gameOpponent,
            homeOrAway:homeOrAwayGame
        });
        });
     }
/*
     componentDidMount(){
        const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };
        var gdate = (new Date(this.props.game.date)).toLocaleString('en-US',DATE_OPTIONS);
      
        this.setState({
       
    gameDate:gdate,
    homeTeam: this.props.game.homeTeam.teamName,
    awayTeam:this.props.game.awayTeam.teamName,
    location: this.props.game.location,
    homeTeamScore:this.props.game.homeTeamScore,
    awayTeamScore:this.props.game.awayTeamScore
    
        });
    
        
      }
    */ 

    handleChange(event) {
     
        const target = event.target;
        const value = target.value;
        const name = target.name;
  
  
      this.setState({[name]: value});
 
 
      }



      handleSelectChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption.value);
      };



    setSuccessMessage(item){
        setTimeout(() => {
         this.setState({
             [item]: ''
         });
     }, 2000)
    }
   
    



  


  

handleSubmit= async(event)=>{
        event.preventDefault();
    

let body="";

if(this.state.homeOrAway === "Home"){

body = JSON.stringify({

    date: this.state.gameDate,    
    homeTeam:this.props.teamId,
    awayTeam:this.state.selectedOption.value,
    location: this.state.location,
    homeTeamScore: this.state.homeTeamScore,
    awayTeamScore:this.state.awayTeamScore
});

}else if(this.state.homeOrAway==="Away"){
    body = JSON.stringify({
        date: this.state.gameDate,    
        homeTeam:this.state.selectedOption.value,
        awayTeam:this.props.teamId,
        location: this.state.location,
        homeTeamScore: this.state.homeTeamScore,
        awayTeamScore:this.state.awayTeamScore
    });
}


  const headers = {'content-type': 'application/json', accept: 'application/json'};
  var route = `/games/game/${this.props.game._id}`
  await fetch(route,{method: 'PUT', headers, body})
  .then((res)=>this.setState({saveSuccess:true}))
 .then(this.setSuccessMessage("saveSuccess"))
// .then(this.clickEditTeamName)
 .then(this.props.reRender())
  .catch(function(response){
    //this.setState({error:true, errmsg: error});
    //console.log(response.data)
  })


}


render(){

    let options=[];
    for (let i = 0; i < this.state.teamsData.length; i++) {
        if(this.props.teamId !== this.state.teamsData[i]._id){

 options.push({"value": this.state.teamsData[i]._id, "label":this.state.teamsData[i].teamName})

        }
        
       
}

return(

<div id="adminEditGame">
<div className="space"></div>
<div className="playerFormTop" id="gameEditTop">
Edit Game
</div>
<div className="space"></div>
<form id="editGameForm" action="" onSubmit={this.handleSubmit}>
<h6>Game Date</h6>
<input className="team-form-input" type="text" name="gameDate"value={this.state.gameDate} onChange={this.handleChange} placeholder="Game date"/>
<div className="space"></div>


<h5>Select this team to play as the home or away team</h5>
<div>
    <div>
<label>
            <input type="radio" value="Home" name="homeOrAway" onChange={this.handleChange} checked={this.state.homeOrAway==="Home"}/>
           Home
          </label>
     </div>     
     <div>
          <label className="gameSelectBtn">
            <input type="radio" value="Away"  name="homeOrAway" onChange={this.handleChange} checked={this.state.homeOrAway==="Away"}/>
           Away
          </label>
          </div>
          </div>

          <div className="space"></div>
<div id="teamSelectContainter">
    <h6>Select Opponent</h6>
    <Select options={options} onChange={this.handleSelectChange} value={this.state.selectedOption}
//    placeholder={this.state.opponent}
    />
</div>



<div className="space"></div>



 <h6>Location</h6>
 <input  className="team-form-input" type="text" name="location"value={this.state.location} onChange={this.handleChange} placeholder="Location"/>
 <div className="space"></div>
 <h6>{this.state.homeTeam} <span>Score</span></h6>
 <input  className="team-form-input" type="number" name="homeTeamScore"value={this.state.homeTeamScore} onChange={this.handleChange} placeholder="Home team score"/>
 <div className="space"></div>
 <h6>{this.state.awayTeam} Score</h6>
 <input  className="team-form-input" type="number" name="awayTeamScore"value={this.state.awayTeamScore} onChange={this.handleChange} placeholder="Away team score"/>

 <div className="space"></div>

 
 <button id="saveTeamButton" className="sectionButton" type="submit">
           Save
         </button>
         <button id="saveTeamButton" className="sectionButton" type="button" onClick={this.props.close}>
           Cancel
         </button>
</form>
{this.state.saveSuccess? <h6>Game saved</h6>:null}
</div>
);

}

}




export default EditGame;