
import React, {Component} from 'react';

import { Redirect } from 'react-router'
// import AddPlayer from '../addplayer/AddPlayer';
// import EditUser from '../edituser/Edituser';
// import EditPlayer from '../editPlayer/EditPlayer';
 import Players from '../components/Players';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import PlayerForm from '../components/PlayerForm';
import Address from '../components/Address';


class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            pageLoading: true,
            profileData:"",
            playerSet:"",
            playerToEdit:""
            
            
        }

this.setPlayerEdit= this.setPlayerEdit.bind(this);
this.toggleEdit = this.toggleEdit.bind(this);
this.cancelEdit = this.cancelEdit.bind(this);
this.handleSavedUpdate = this.handleSavedUpdate.bind(this);
    }


    getInitialState() {
        return {
          playerToEdit: null
        };
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
      }


    componentDidMount(){
 
        fetch('/users/profile')
        .then(data => data.json())
        .then((data) => { 
          this.setState({ profileData: data }, ()=> console.log(this.state.profileData)) 
        }); 
      
       }



       setPlayerEdit(item){
        switch(item){
            case 'add': if(this.state.playerSet === 'add'){this.setState({playerSet:""})}else{this.setState({playerSet:"add"})};
            break;
            case 'edit':if(this.state.playerSet === 'edit'){this.setState({playerSet:""})}else{this.setState({playerSet:"edit"})};
            break;
            default: this.setState({playerSet:""});
            break;
        }
 
      }

      cancelEdit(){
        this.setState({playerToEdit: ""});
      }


    handleSavedUpdate(data){
this.setState({profileData:data});
    }     
       



      renderItemOrEditItem(player){
        if(this.state.playerToEdit === player._id){
        
      return(
      <PlayerForm playerToEdit={player} cancelEdit={this.cancelEdit}/> 
      );
      
          
        }else{
      
      return(
      <Players editmode={this.toggleEdit} playerToShow={player} updateList={this.handleSavedUpdate}/>
      )
      
      
        }
        
        }

        toggleEdit(itemId){

            // this.state.playerEdit ? this.setState({playerEdit:false}) : 
            // this.setState({playerEdit:true});
         
            this.setState( { playerToEdit: itemId } );
          
          }

render(){
    let pageData = this.state.profileData;
    return(<div id="profileContainer">
  <ProfileHeader name={pageData.username}/>
  <div id="profileBody">
  <section id="peronalInformation" className="profileSection"> 
  <div className="profileSectionLabel"><h2>Personal Information</h2></div>
  <div className="personalDetails">
  <div id="profileUserFirstName" className="profileFieldContainer">
           <div className="profileFormLabels">First name:</div>
           <div className="profileFormResult">{pageData.firstname}</div>
           </div>

       <div id="profileUserLastName" className="profileFieldContainer">
           <div className="profileFormLabels">Last name:</div>
           <div className="profileFormResult">{pageData.lastname}</div>
           </div>

       <div id="profileUserEmail" className="profileFieldContainer">
           <div className="profileFormLabels">Email:</div>
           <div className="profileFormResult">{pageData.email}</div>
           </div>
           
      </div>

{pageData.street && pageData.city && pageData.state && pageData.zip && pageData.phone
    ?
  
  <div id="addressInfo" className="personalDetails">
  <div id="profileUserStreet" className="profileFieldContainer">
      <div className="profileFormLabels">Street:</div>
      <div className="profileFormResult">{pageData.street}</div>
  </div>
  <div id="profileUserCity" className="profileFieldContainer">
      <div className="profileFormLabels">City:</div>
      <div className="profileFormResult">{pageData.city}</div>
  </div>
  <div id="profileUserState" className="profileFieldContainer">
      <div className="profileFormLabels">State:</div>
      <div className="profileFormResult">{pageData.state}</div>
  </div>
  <div id="profileUserZip" className="profileFieldContainer">
      <div className="profileFormLabels">Zip code:</div>
      <div className="profileFormResult">{pageData.zip}</div>
  </div>
  
  
  <div id="contactInfo">
  <div id="profileUserPhone" className="profileFieldContainer">
      <div className="profileFormLabels">Phone:</div>
  <div className="profileFormResult">{pageData.phone}</div>
  </div>
  </div>
  
  </div>
  
  :
 
 
 <Address/>
 }
</section>
{this.state.profileData.street? 
<section id="playerSection" className="profileSection">
<div id="playerSectionTitle"className="profileSectionLabel"><h2>My Players</h2>

<div id="btnContainer">
<button id="playerAddBtn"type="button" className="sectionButton" onClick={()=>this.setPlayerEdit("add")}>
     {this.state.playerSet==="add"? 'Close' : 'Add Player'}
     </button>
</div>
</div>
<div id="newPlayerFormContainer">
{this.state.playerSet==="add"?

<PlayerForm playerToEdit={false} addPlayer={this.handleAddPlayerSubmit} formTitle={this.state.playerSet}/>


:
null
}

</div>

</section>
    :

null
}

<section id="myPlayers">
   <div id="playersContainer">

{pageData? 


pageData.players.map((item)=>{
    return this.renderItemOrEditItem(item);
  },this)

: <h6>Loading....</h6>}




 
   
 
  
   
   
   </div>
   </section>



</div>
   </div>);
}



}
 


export default Profile;
