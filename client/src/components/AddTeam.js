import React, {Component} from 'react';


class AddTeam extends Component{
    constructor(props){
        super(props);
      
        this.state = {
           teamLogo:"",
           teamName:"",
           ageGroup:"",
           saveSuccess:false
        }
        this.handleChange=this.handleChange.bind(this);
    }


    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

      this.setState({[name]: value});
    }



    handleSubmit= async(event)=>{
        event.preventDefault();
        const body = JSON.stringify({
         teamName: this.state.teamName,
         logo:this.state.teamLogo,
         ageGroup: this.state.ageGroup
  });
  
  const headers = {'content-type': 'application/json', accept: 'application/json'};
  
  await fetch('/teams',{method: 'POST', headers, body})
  .then((res)=>this.setState({saveSuccess:true}))
 .then(this.setSuccessMessage("saveSuccess"))
 .then(this.props.reRender())
  .catch(function(response){
    //this.setState({error:true, errmsg: error});
    //console.log(response.data)
  })
  
  
  
  
  //this.props.editPlayer();
  
  }
  
  setSuccessMessage(item){
       setTimeout(() => {
        this.setState({
            [item]: ''
        });
    }, 2000)
}



render(){
return(

<div id="adminAddTeam">
<div className="playerFormTop" id="teamFormTop"><h4>Add Teams</h4></div>

<form id="teamForm" action="" onSubmit={this.handleSubmit}>
<h6>Team Name</h6>



 <select value={this.state.teamName} name="teamName"className="team-form-input" onChange={this.handleChange}>
 <option value="">Choose</option>
 <option value="Bucaneers">Bucaneers</option>
  <option value="Broncos">Broncos</option>
  <option value="Buffalos">Buffalos</option>
  <option value="Chargers">Chargers</option>
  <option value="Colts">Colts</option>
  <option value="Cardinals">Cardinals</option>
  <option value="Cowboys">Cowboys</option>
  <option value="Dolphins">Dolphins</option>
  <option value="Eagles">Eagles</option>
  <option value="Falcons">Falcons</option>
  <option value="Jaguars">Jaguars</option>
  <option value="Jets">Jets</option>
  <option value="Lions">Lions</option>
  <option value="Panthers">Panthers</option>
  <option value="Patriots">Patriots</option>
  <option value="Raiders">Raiders</option>
  <option value="Rams">Rams</option>
  <option value="Ravens">Ravens</option>
  <option value="Seahawks">Seahawks</option>
  <option value="Vikings">Vikings</option>

</select>
 <div className="space"></div>

 <h6>Age Group</h6>
 <input  className="team-form-input" type="text" name="ageGroup"value={this.state.ageGroup} onChange={this.handleChange} placeholder="Team age group"/>
 <div className="space"></div>
 <h6>Logo</h6>
 



<select value={this.state.teamLogo} name="teamLogo"className="team-form-input" onChange={this.handleChange}>
    <option value="">Choose</option>
  <option value="bucs">Bucaneers</option>
  <option value="broncos">Broncos</option>
  <option value="bufs">Buffalos</option>
  <option value="chargers">Chargers</option>
  <option value="colts">Colts</option>
  <option value="cards">Cardinals</option>
  <option value="cowboys">Cowboys</option>
  <option value="dolphins">Dolphins</option>
  <option value="eagles">Eagles</option>
  <option value="falcons">Falcons</option>
  <option value="jags">Jaguars</option>
  <option value="jets">Jets</option>
  <option value="lions">Lions</option>
  <option value="panthers">Panthers</option>
  <option value="pats">Patriots</option>
  <option value="raiders">Raiders</option>
  <option value="rams">Rams</option>
  <option value="ravens">Ravens</option>
  <option value="seahawks">Seahawks</option>
  <option value="vikings">Vikings</option>
</select>


 <div className="space"></div>
 <button id="saveTeamButton"   className="sectionButton" type="submit">
           Save
         </button>
    {this.state.saveSuccess?<h6>Team saved</h6> :null}
</form>
</div>
);

}

}




export default AddTeam;