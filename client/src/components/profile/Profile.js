import React, {Component} from 'react';
import './Profile.css';
import { Redirect } from 'react-router'
import AddPlayer from '../addplayer/AddPlayer';
import EditUser from '../edituser/Edituser';
import EditPlayer from '../editPlayer/EditPlayer';
import MyPlayers from '../myplayers/MyPlayers';




class Profile extends Component {
  constructor(props){
    super(props);
  
    this.state = {
      profileData: '',
     playerAdd: false,
     playerToEdit: null,
    // playerEdit: false,
     paid:false
      // playerFirstName:'',
      //   playerLastName:'',
      //   playerNicName:'',
      //   playerAge:'',
      //   playerPositionPreference:''
         
    };
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUserDataSubmit = this.handleUserDataSubmit.bind(this);
    this.handleAddPlayerSubmit = this.handleAddPlayerSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleEditPlayer = this.handleEditPlayer.bind(this);
   
  }


 
  
 
  getResponse = async()=>{
    const response = await fetch('/users/profile',{method:'GET', headers:{'Content-Type': 'application/json'}
  
  });
    const body = await response;
    if (response.status !== 200) 
    //throw Error(body.message);
    {

 //this.setState({"redirect":true})

    } else{
       return body; 
    }
    
//const headers = {'content-type': 'application/json', accept: 'application/json'};

// await fetch('/users/profile',{method: 'GET', headers})
// .then((data)=>this.setState({profileData:data}, ()=>console.log("data fetched...", data)))
// .catch(function(error){
//   this.setState({"redirect":true});
// })


  }
  getInitialState() {
    return {
      playerToEdit: null
    };
  }

componentDidMount(){
 
  fetch('/users/profile')
  .then(data => data.json())
  .then((data) => { 
    this.setState({ profileData: data }, ()=>console.log("data fetched...", data)) 
  }); 

 }

/*redirect: false, 
componentDidMount(){
fetch('/users/profile')
 .then(res=> res.json())
  .then(userProfile=>{
    this.setState({profileData:userProfile}, ()=>console.log("data fetched...", userProfile))
  })
}
  */
 


/*
componentDidUpdate() {
  if(this.props.onClick.message === 'ok'){
      console.log('ok');
      if (!this.state.isLogged) {
          this.setState({
              isLogged: true
          });
      }
      this.props.history.push('/');
      //path is ok!!!
      console.log('path from history: ', this.props.history);
  }
}
*/
toggleEdit(itemId){

  // this.state.playerEdit ? this.setState({playerEdit:false}) : 
  // this.setState({playerEdit:true});
  
  this.setState( { playerToEdit: itemId } );

}

handleEditPlayer(player){

this.setState({playerToEdit: null});

}

cancelEdit(){
  this.setState({playerToEdit: null});
}

renderItemOrEditItem(player){
  if(this.state.playerToEdit === player._id){
  
return(
<EditPlayer playerToEdit={player} cancelThisEdit={this.cancelEdit} editPlayer={this.handelEditPlayer}/> 
);

    
  }else{

return(
<MyPlayers editmode={this.toggleEdit} playerToShow={player}/>
)


  }
  
  }
  

handleChange(event) {
  const target = event.target;
  const value = target.value;
  const name = target.name;

this.setState({[name]: value});
}




handleUserDataSubmit = async(event, formData)=>{
  event.preventDefault();

const body = JSON.stringify({
    userPhone:formData.phone,
    userAddress:{
      street: formData.street,
      city: formData.city,
      state:formData.state,
      zip: formData.zip
    }
});
  const headers = {'content-type': 'application/json', accept: 'application/json'};

  await fetch('/users/user/update',{method: 'PUT', headers, body})
  .then((data)=>this.setState({profileData:data}))
  .catch(function(error){
    this.setState({error:true, errmsg: error});
  })



}



onClick(page){
  this.state.playerAdd ? this.setState({playerAdd: false}) : this.setState({playerAdd: true});
 // this.setState({view:page});
}





handleAddPlayerSubmit = async(event,formData)=>{
  //event.preventDefault();
 

  const body = JSON.stringify({
      firstName: formData.playerFirstName, 
      lastName: formData.playerLastName,
      nicName: formData.playerNicName,
      age: formData.playerAge,
      positionPref: formData.playerPositionPreference
  });
  const headers = {'content-type': 'application/json', accept: 'application/json'};

  await fetch('/players/register-player',{method: 'POST', headers, body})
  .then(async()=> await fetch('/users/profile',{method:'GET',headers}))
  .then((data)=>this.setState({profileData:data}))
  .catch(function(error){
    this.setState({error:true, errmsg: error});
  })



}






  render(){

   //const { redirect } = this.state;

  //   if (redirect) {
  //     return  <Redirect to=
  //     {{pathname:`/error`, 
  //        state: {message: "Access Denied"}
  //        }} 
  // />
  // }

   
 
const {renderedResponse} = this.state;
const pageData = this.state.profileData;

 return (

<React.Fragment>
<div id="profileBody">

<div id="profileHeader">
<div id="userWelcome"> Welcome </div>
<div id="userName">{pageData.username}</div>
<div id="row2"></div>
<div id="row3">my teams</div>
<div id="cityLeagueHeader"></div>

{/* <div id="myTeamLogo"><div id="teamLogo"></div></div>
<div id="myTeamText">My Team:</div>
<div id="myTeamName">The Team Name</div> */}
</div>


<div id="leftContent"></div>

<div id="rightContent">

<section id="userInfoForm">
<div className="profileSectionLabel">Personal Information</div>


<div id="nameInfo">
<div id="profileUserFirstName"><div className="profileFormLabels">First name:</div><div className="profileFormResult">{pageData.firstname}</div></div>
<div id="profileUserLastName"><div className="profileFormLabels">Last name:</div><div className="profileFormResult">{pageData.lastname}</div></div>
<div id="profileUserEmail"><div className="profileFormLabels">Email:</div><div className="profileFormResult">{pageData.email}</div></div>
</div>

{pageData.street && pageData.city && pageData.state && pageData.zip && pageData.phone
  ?

<div id="addressInfo">
<div id="profileUserStreet"><div className="profileFormLabels">Street:</div><div className="profileFormResult">{pageData.street}</div>
</div>
<div id="profileUserCity"><div className="profileFormLabels">City:</div><div className="profileFormResult">{pageData.city}</div>
</div>
<div id="profileUserState"><div className="profileFormLabels">State:</div><div className="profileFormResult">{pageData.state}</div>
</div>
<div id="profileUserZip"><div className="profileFormLabels">Zip code:</div><div className="profileFormResult">{pageData.zip}</div>
</div>


<div id="contactInfo">
<div id="profileUserPhone"><div className="profileFormLabels">Phone:</div>
<div className="profileFormResult">{pageData.phone}</div>
</div>
</div>

</div>




:

<EditUser updateUser={this.handleUserDataSubmit}/>


}

</section>



{pageData.street?


<section id="playerSection">
<div id="playerSectionHeader">
<div id="playerSectionTitle"className="profileSectionLabel">My Players</div>  
<div id="btnContainer">
<button id="playerAddBtn"type="button" onClick={this.onClick}>
      {this.state.playerAdd? 'Close' : 'Add Player'}
      </button>

     

</div>
 </div>   
{this.state.playerAdd?
  <div><AddPlayer addPlayer={this.handleAddPlayerSubmit}/></div>
  :
  null
  }


<div id="playersContainer">
{this.state.profileData.players.map((item)=>{
  return this.renderItemOrEditItem(item);
},this)}
</div>


</section>

:
null
}


</div>

</div>
</React.Fragment>
 
  );

  }
 
}

export default Profile;
