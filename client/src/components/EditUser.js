import React, {Component} from 'react';
import Popup from 'reactjs-popup';



class EditUser extends Component {
  constructor(props){
    super(props);
  
    this.state = {
    data: '',
    firstName:"",
    lastName:"",
    userName:"",
    userType:"",
    street:"",
    city:"",
    state:"",
    zip:"",
    phone:"",
    email:"",
    editMember: false,
    memberToEdit:"",
    memberDelete:"",
    deleteMember: false,
    saveSuccess:false,
    showPopup:false,
     errorMessage:"",
     access:false
    };


   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
   this.clickDeleteMember=this.clickDeleteMember.bind(this);
   this.clickEditMember=this.clickEditMember.bind(this);
   this.cancelEditMember=this.cancelEditMember.bind(this);
  this.componentRerender=this.componentRerender.bind(this);
  this.setSuccessMessage=this.setSuccessMessage.bind(this);
  this.setDeleteSuccess=this.setDeleteSuccess.bind(this);
  }
/*
  getResponse = async() =>{
    const response = await fetch('/users');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body; 

  }
*/
  getResponse = async() =>{
    fetch('/users', {
      method: 'GET', headers: { 'Content-Type': 'application/json' }
    
    })



    .then(res =>{
      if(res.ok){
        return res.json();
      }else{
        this.setState({access: 'denied'})
       //throw new Error('You must be logged in to view this page');
      }
    })




    .then(data => this.setState({data: data}))
    .catch(error => this.setState({error})
      )
  }
  




  componentDidMount(){
    this.getResponse()
    // .then(res => {
    //   const renderedResponse = res;
    //   this.setState({data: renderedResponse});
    // })
  }

  componentRerender(){
    this.getResponse()
    .then(res => {
      const renderedResponse = res;
      this.setState({data: renderedResponse},()=>console.log(this.state.data));
   
    });
}


  setSuccessMessage(item){
    setTimeout(() => {
     this.setState({
         [item]: ''
     });
 }, 3000)
}

setDeleteSuccess(item){
  setTimeout(() => {
      this.setState({
          [item]: ''
      });
  }, 3000)
}


  handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;

    this.setState({[name]: value});
  }





handleSubmit(event){
  event.preventDefault();
  const body= {
    id:this.state.editMember,
    userNewData:{
     userType: this.state.userType,
    name:{firstName: this.state.firstName, 
                lastName:this.state.lastName},
    userName: this.state.userName,
    userAddress:{
        street: this.state.street,
         city: this.state.city,
        state: this.state.state,
        zip: Number(this.state.zip)
  },
  userPhone: this.state.phone,
   userEmail: this.state.email,
  }
  
  };




  const options = { 
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
       body: JSON.stringify(body)
  
  }    
  
  
  fetch('/users/update', options)
  .then(response => {
       console.log(response)        
   if (response.ok) {
           return response.json();
         } else {
            throw new Error('Something went wrong ...');
         }
       })
         .then(data => this.setState({ saveSuccess:true, editMember:false }))
           .then(this.setSuccessMessage('saveSuccess'))  
          .then(this.componentRerender)
         .catch(error => this.setState({ error }));

}


cancelEditMember(){
this.setState({editMember: false,
  firstName:"",
  lastName:"",
  userName:"",
  userType:"",
  street:"",
  city:"",
  state:"",
  zip:"",
  phone:"",
  email:"",


}) 
}
clickEditMember(member){



this.setState({editMember: member._id,
  firstName:member.name.firstName,
  lastName:member.name.lastName,
  userName:member.userName,
  userType:member.userType,
  street:member.userAddress.street,
  city:member.userAddress.city,
  state:member.userAddress.state,
  zip:member.userAddress.zip,
  phone:member.userPhone,
  email:member.userEmail,
});
}


clickDeleteMember(){
  this.state.deleteMember? this.setState({deleteMember: false}) : this.setState({deleteMember: true});
 
}

handleMemberDelete= async(item)=>{


  const body = JSON.stringify({
    userId: item._id,
        
   });

   const headers = {'content-type': 'application/json', accept: 'application/json'};

   await fetch('/users/user/delete',{method: 'DELETE', headers, body})
 
   .then((res)=>this.setState({memberDelete:res}))
   .then(this.setDeleteSuccess('memberDelete'))  
   .then(this.componentRerender)
    .catch(function(res){
      
   })

}

  render(){
 
      return(
        <div>
        {this.state.access === 'denied'? <h5>Requires Admin</h5> : 
      <div id="adminEditUserContainer">

      <h4>Members</h4>
      <div id="userList">
      <table id="userTable" className="systemTable">
   <thead>
   <tr>
   <th>Last Name</th>
   <th>First Name</th>
   <th>Type</th>
   <th>Street</th>
   <th>City</th>
   <th>State</th>
   <th>Zip</th>
     <th>Phone</th>
   <th>Email</th>
    <th></th>
   <th></th>
   </tr>
   </thead>



{this.state.data? 
  <tbody>

{this.state.data.map(function(user){
return <tr  key={user._id}>
<td>{user.name.lastName}</td>
<td>{user.name.firstName}</td>
<td>{user.userType}</td>
<td>{user.userAddress.street}</td>
<td>{user.userAddress.city}</td>
<td>{user.userAddress.state}</td>
<td>{user.userAddress.zip}</td>
<td>{user.userPhone}</td>
<td>{user.userEmail}</td>
<td>
<button className="adminEditButton" id="userEditBtn"type="button" onClick={()=>this.clickEditMember(user)}>
            Edit
    </button> 
 </td>
<td>
  
<Popup trigger={<button  className="adminEditButton deleteBtn">Del</button>} 
modal id="tmModal" item={user._id}>
    {close => (
      <div className="modal">
        <a className="close" onClick={close}>
        &times;
        </a>
        <div className="header">Delete Member</div>
        <div className="content">
          {' '}
          Are you sure you want to delete {user.name.lastName}, {user.name.firstName}?
    
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
              this.handleMemberDelete(user);
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

},this)}




  </tbody>
  :
null
 }






   </table>

{this.state.saveSuccess? <h6>Member Information Saved.</h6>:null}
      </div>

{this.state.memberDelete? <h6>Member deleted</h6>:null}


{this.state.editMember?



<div id="adminEditUserForm">
<div id="editMemberName">{this.state.firstName}<span>{this.state.lastName}</span></div>
<div id="userEditForm">

<form onSubmit={this.handleSubmit}>
  <h6>First Name</h6>
<input className="editUserInput" type="text" name="firstName"value={this.state.firstName} onChange={this.handleChange} placeholder="FirstName"/>
<div className="space"></div>
<h6>Last Name</h6>
<input className="editUserInput" type="text" name="lastName"value={this.state.lastName} onChange={this.handleChange} placeholder="Last Name"/>
<div className="space"></div>
<h6>User Name</h6>
<input className="editUserInput" type="text" name="userName"value={this.state.userName} onChange={this.handleChange} placeholder="User Name"/>
<div className="space"></div>
<h6>User Type</h6>
<input id="userTypeInput"className="profileInput" type="text" disabled name="userType"value={this.state.userType} onChange={this.handleChange} placeholder="User Type"



/>
<div className="space"></div>


<label> Member
<input type="radio"
                   name="selectUserType"
                   value={"Member"}
                   checked={this.state.userType==="Member"}
                   onClick={(e)=>{
                    this.setState({userType:"Member"})
                   }}
                
            />
</label>
<label> Admin
<input type="radio"
                   name="selectUserType"
                   value={"Admin"}
                   checked={this.state.userType==="Admin"}
                   onClick={(e)=>{
                    this.setState({userType:"Admin"})
                   }}
                
            />
</label>
<label> Coach
<input type="radio"
                   name="selectUserType"
                   value={"Coach"}
                   checked={this.state.userType==="Coach"}
                   onClick={(e)=>{
                    this.setState({userType:"Coach"})
                   }}
                
            />
</label>


   

<div className="space"></div>

<h6>Street</h6>
<input className="editUserInput" type="text" name="street"value={this.state.street} onChange={this.handleChange} placeholder="Street"/>
<div className="space"></div>
<h6>City</h6>
<input className="editUserInput" type="text" name="city"value={this.state.city} onChange={this.handleChange} placeholder="City"/>
<div className="space"></div>
<h6>State</h6>
<input className="editUserInput" type="text" name="state"value={this.state.state} onChange={this.handleChange} placeholder="State"/>

<div className="space"></div>
<h6>Zip</h6>
<input className="editUserInput" type="text" name="zip"value={this.state.zip} onChange={this.handleChange} placeholder="Zip code"/>
<div className="space"></div>
<h6>Phone</h6>
<input className="editUserInput" type="text" name="phone"value={this.state.phone} onChange={this.handleChange} placeholder="Phone"/>
<div className="space"></div>
<h6>Email</h6>
<input className="editUserInput" type="text" name="email"value={this.state.email} onChange={this.handleChange} placeholder="Email"/>


<div className="space"></div>

<div className="memberBtnContainer">
<button id="updateUserBtn" className="sectionButton"type="submit">
           Save
         </button>
         <div className="space"></div>
 <button id="cancelSaveUserBtn"type="button" className="sectionButton" onClick={this.cancelEditMember}>
           Cancel
         </button>
         <div className="space"></div>
</div>
</form>
</div>
</div>



:
null
}

 

      </div>
      }
      </div>
      );
  }



  
}

  


export default EditUser;
