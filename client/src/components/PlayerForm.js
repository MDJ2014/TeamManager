import React, {Component} from 'react';







class PlayerForm extends Component {
    constructor(props){
      super(props);
    
      this.state = {
        renderedResponse: '',
        playerFirstName:'',
        playerLastName:'',
        playerNicName:'',
        playerAge:'',
        playerPositionPreference:'',

        newPlayerFirstName:'',
        newPlayerLastName:'',
        newPlayerNicName:'',
        newPlayerAge:'',
        newPlayerPositionPreference:'',

        error:"",
        errmsg:"",
        editSuccess:""
  
  
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handelEditCancel = this.handelEditCancel.bind(this);
    }




    componentDidMount(){
        let receivedData="";
        if(this.props.playerToEdit){

        receivedData = this.props.playerToEdit;
          this.setState({
            playerFirstName:receivedData.name.firstName,
            playerLastName:receivedData.name.lastName,
            playerNicName: receivedData.nicName, 
            playerAge:receivedData.playerAge,
            playerPositionPreference: receivedData.positionPref
            
        });

        }
       
        
      
      }











    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
  
      this.setState({[name]: value});
    }

    // cancelPlayerEdit=()=>{
    //   this.props.cancelThisEdit();
    // }

    handleSubmit= async(event)=>{

      const body = JSON.stringify({
    playerId : this.props.playerToEdit._id,    
    name:{
     firstName: this.state.playerFirstName,
      lastName: this.state.playerLastName,
    },
    
    nicName: this.state.playerNicName,
    playerAge: this.state.playerAge,
    positionPref: this.state.playerPositionPreference
});



const headers = {'content-type': 'application/json', accept: 'application/json'};

await fetch('/players/player',{method: 'PUT', headers, body})

//.then((res)=>this.props.cancelEdit())
.catch(function(response){
  //this.setState({error:true, errmsg: error});
  //console.log(response.data)
})




//this.props.editPlayer();

}



handelEditCancel(){
    this.props.cancelEdit();
}


handleAddPlayerSubmit = async(event,formData)=>{
   event.preventDefault();
   
  
    const body = JSON.stringify({
       
        firstName: this.state.newPlayerFirstName, 
        lastName: this.state.newPlayerLastName,
        nicName: this.state.newPlayerNicName,
        age: this.state.newPlayerAge,
        positionPref: this.state.newPlayerPositionPreference
    });
    const headers = {'content-type': 'application/json', accept: 'application/json'};
  
    await fetch('/players/register-player',{method: 'POST', headers, body})
    .then(async()=> await fetch('/users/profile',{method:'GET',headers}))
    .then((data)=>this.props.updateList())
   // .then((data)=>this.setState({profileData:data}))
    .catch(function(error){
     // this.setState({error:true, errmsg: error});
    })
  
  
  
  }
  

    render(){
      
        
let player = this.props.playerToEdit;

    
          return(
 <React.Fragment>         
{this.props.playerToEdit? 

<div id="playerContainer" key={player._id}>


<div id="playerEditFormBody" className="form-body">
<form id="playerEditForm" action="" onSubmit={this.handleSubmit}>
<h6>First name</h6>
 <input className="player-edit-form-input" type="text" name="playerFirstName"value={this.state.playerFirstName} onChange={this.handleChange} placeholder={player.name.firstName}/>

 <h6>Last name</h6>
 <input className="player-edit-form-input"type="text" name="playerLastName"value={this.state.playerLastName} onChange={this.handleChange} placeholder={player.name.lastName}/>

 <h6>Nicname</h6>
 <input className="player-edit-form-input" type="text" name="playerNicName"value={this.state.playerNicName} onChange={this.handleChange} placeholder={player.nicName}/>

 <h6>Age</h6>
 <input className="player-edit-form-input" type="text" name="playerAge"value={this.state.playerAge} onChange={this.handleChange} placeholder={player.playerAge}/>
 
 <h6>Position Pref</h6>
 <input className="player-edit-form-input" type="text" name="playerPositionPreference"value={this.state.playerPositionPreference} onChange={this.handleChange} placeholder={player.positionPref}/>
 <div className="space"></div>


<button id="playerEditSaveButton" className="sectionButton" type="submit">
           Save
         </button>
         <div className="space"></div>
         <button id="cancelPlayerEditSaveButton" className="sectionButton" type="button" onClick={this.handelEditCancel}>
           Cancel
         </button>   
  
     
</form>
{this.state.welcomeSuccess?
        <h6> Saved!</h6>
    :null}
</div>




</div>


:


<div id="addPlayerFormContainer">
<div id="player-form-header">{this.props.formTitle} player</div>
<div id="player-form-body" className="form-body">
<form id="playerForm" className="addPlayerForm"action="" onSubmit={this.handleAddPlayerSubmit}>

<h6>First name</h6>
 <input  className="addPlayerInput"  type="text" name="newPlayerFirstName"value={this.state.newPlayerFirstName} onChange={this.handleChange} placeholder="Player's First Name"/>
 <div className="space"></div>
 <h6>Last name</h6>
 <input className="addPlayerInput"   type="text" name="newPlayerLastName"value={this.state.newPlayerLastName} onChange={this.handleChange} placeholder="Player's Last Name"/>
 <div className="space"></div>
 <h6>Nic name</h6>
 <input className="addPlayerInput"   type="text" name="newPlayerNicName"value={this.state.newPlayerNicName} onChange={this.handleChange} placeholder="Player's Nic Name"/>
 <div className="space"></div>
 <h6>Age</h6>
 <input className="addPlayerInput"   type= "text" name="newPlayerAge"value={this.state.newPlayerAge} onChange={this.handleChange} placeholder="Player's Age"/>
 <div className="space"></div>
 <h6>Position Preference</h6>
 <input  className="addPlayerInput"   type="text" name="newPlayerPositionPreference"value={this.state.newPlayerPositionPreference} onChange={this.handleChange} placeholder="Position Preference"/>
 <div className="space"></div>

<button id="playerSaveButton" className="sectionButton" type="submit">
           Save
         </button>






</form>
</div>
<div id="player-form-footer"></div>
</div>



}
</React.Fragment>    


          );


    }

}


export default PlayerForm;