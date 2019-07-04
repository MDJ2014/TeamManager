import React, {Component} from 'react';
import Popup from 'reactjs-popup';



class EditCoaches extends Component {
    constructor(props){
      super(props);
    
      this.state = {
       firstName:"",
       lastName:"",
       title:"",
  removeCoach: false,
  coaches:"",
  saveSuccess:false,
  deleteSuccess:false,
  coachToEdit:false,
  editCoachTitle:false,
  coachTitle:""
               
      };
  
  this.componentReRender=this.componentReRender.bind(this);
  this.handleDeleteFromTeam=this.handleDeleteFromTeam.bind(this);
  this.setSuccessMessage=this.setSuccessMessage.bind(this);
  this.parentRerender=this.parentRerender.bind(this);
  this.handleSelectEditPlayer=this.handleSelectEditPlayer.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
    }



    componentDidMount(){
    
this.componentReRender();
      
    }

  
    getResponse = async()=>{
      const response = await fetch(`/users/coaches`,{method:'GET', headers:{'Content-Type': 'application/json'}
    
    
    });
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body; 
    }

componentReRender(){
  
  this.getResponse() 
  .then(res => {
          const receivedData = res;
                 this.setState({coaches: receivedData});
        });
      
}

setSuccessMessage(item){
  setTimeout(() => {
   this.setState({
       [item]: ''
   });
}, 1400)
}

parentRerender(){
  setTimeout(() => {
  this.props.reRender();
}, 1500)
}


handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

  this.setState({[name]: value});
}



handleSelectEditPlayer(player){
  this.setState({playerToEdit:player})
  }

  
handleDeleteFromTeam = async(coach)=>{
  const body = JSON.stringify({
    teamId: this.props.teamToAssign,
    userId:coach
  });

  const headers = {'content-type': 'application/json', accept: 'application/json'};
  
  await fetch('/teams/delete-coach',{method: 'PUT', headers, body})
  .then((res)=>this.setState({deleteSuccess:true, removeCoach: false}))
 .then(this.setSuccessMessage("deleteSuccess"))
 .then(this.componentReRender())
  .catch(function(response){
    //this.setState({error:true, errmsg: error});
    //console.log(response.data)
  })
  

}


handleSubmit = async(event)=>{

    event.preventDefault();
    const body = JSON.stringify({
   
      id:this.state.coachToEdit,
      newData:{
          title:this.state.coachTitle
      }
    });
  
    const headers = {'content-type': 'application/json', accept: 'application/json'};
    
    await fetch('/users/position',{method: 'PUT', headers, body})
    .then((res)=>this.setState({editSuccess:true, coachToEdit:false, editCoachTitle: false, removeCoach: false}))
   .then(this.setSuccessMessage("editSuccess"))
   .then(this.componentReRender())
    .catch(function(response){
  
    })

  }



render(){


return(
  <div id="coachRosterBody">
<div id="coachRosterContainer">

<table id="coachRosterTable" className={"systemTable coachTable"}>
<thead>
<tr>
<th>Last Name</th>
<th>First Name</th>
<th>Title</th>
<th></th>
<th></th>
</tr>
</thead>



{this.state.coaches.length>0? 
<tbody>

{this.state.coaches.map(function(coach){

    if(coach.position.team){
if(coach.position.team._id === this.props.teamId){


return (<tr key={coach._id}>
  <td>{coach.name.lastName}</td>
  <td>{coach.name.firstName}</td>
  {this.state.coachToEdit === coach._id? 
  
  <td colSpan="2">
<form  onSubmit={this.handleSubmit}>
<input className="playerInput" type="text" name="coachTitle" value={this.state.coachTitle} onChange={this.handleChange} placeholder="Title"></input>
<button className="adminEditButton" id="coachEditButton"type="submit">
           Save
         </button>
</form>


  </td>
  : 

 <td>{coach.position.title}</td>
}
 
  
      {this.state.editCoachTitle?
        
      null

        :
       <td> 
        <button className="adminEditButton" id="playerEditButton"type="button" onClick={()=>this.setState({editCoachTitle:true, coachToEdit:coach._id})} >
           Edit
         </button>
       </td> 
        }
  
  
  
   <td>

 
         <Popup trigger={<button  className="adminEditButton deleteBtn">Del</button>} 
modal id="tmModal" item={coach._id}>
    {close => (
      <div className="modal">
        <a className="close" onClick={close}>
        &times;
        </a>
        <div className="header">Remove player</div>
        <div className="content">
          {' '}
          Are you sure you want to remove {coach.name.lastName}, {coach.name.firstName}?
    
        </div>
        <div className="actions">
         
          <button
            className="sectionButton"
            onClick={() => {
              console.log('modal closed ')
              close()
            }}
          >
           Cancel
          </button>



          <button
            className="sectionButton popupDelBtn"
            
            onClick={() => {
              this.handleDeleteFromTeam(coach._id);
              close();
            }}
          >
            Delete
          </button>



        </div>
      </div>
    )}
  </Popup>


   </td>        
</tr>
)
        }
    }
},this)}



</tbody>
:
null
}
  </table>





{this.state.editSuccess? <h6>Coach information saved</h6>:null}
{this.state.deleteSuccess? <h6>Coach removed from team</h6>:null}

</div>



</div>
)



}




}
export default EditCoaches;