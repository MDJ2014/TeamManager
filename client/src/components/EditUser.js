import React, {Component} from 'react';



class EditUser extends Component {
  constructor(props){
    super(props);
  
    this.state = {
    data: '',
    editMember: false,
    deleteMember: false
    };

   // this.onClick = this.onClick.bind(this);
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
   this.clickDeleteMember=this.clickDeleteMember.bind(this);
   this.clickEditMember=this.clickEditMember.bind(this);
  }

  getResponse = async() =>{
    const response = await fetch('/users/register');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body; 
  }
  
  componentDidMount(){
    // this.getResponse()
    // .then(res => {
    //   const data = res;
    //   this.setState({renderedResponse: data.title});
    // })
  }


  handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;

    this.setState({[name]: value});
  }

  handleSubmit= async(event)=>{
    event.preventDefault();

    const body= {
     userPhone: this.state.phone,
    userAddress:{
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip
    }
    
    };
//this.props.updateUser(event, body);
    // const headers = {'content-type': 'application/json', accept: 'application/json'};

    // await fetch('/users/register',{method: 'POST', headers, body})
    // .then((res)=>this.setState({redirect:true}))
    // .catch(function(response){
      //this.setState({error:true, errmsg: error});
      //console.log(response.data)
   // })

  }

 
clickEditMember(){
this.state.editMember? this.setState({editMember: false}) : this.setState({editMember: true});
}
clickDeleteMember(){
    this.state.deleteMember? this.setState({deleteMember: false}) : this.setState({deleteMember: true});
}


  render(){
  
      return(
      <div id="adminEditUserContainer">
      <h4>Members</h4>
      <div id="userList">
      <table id="userTable" className="systemTable">
   <thead>
   <tr>
   <th>First Name</th>
   <th>Last Name</th>
   <th>User Type</th>
   <th>Address</th>
   <th>Phone</th>
   <th>Email</th>
   <th>Players</th>
   <th></th>
   <th></th>
   </tr>
   </thead>

   <tbody>



  <tr>
<td>Wanda</td>
<td>White</td>
<td>Member</td>
<td>8760 Broken hook rd., Douglasville, GA</td>
<td>687-698-8787</td>
<td>wanda@yahoo.com</td>
<td>Junior, Beltmoor</td>
<td>
<button className="adminEditGameButton" id="userEditBtn"type="button" onClick={this.clickEditMember}>
             Edit
     </button> 
  </td>
<td>
   <button className="adminEditGameButton" id="userDeleteBtn"type="button" onClick={this.clickDeleteMember}>
             Del
           </button> 

</td>
  </tr>

 <tr>
<td>Wanda</td>
<td>White</td>
<td>Member</td>
<td>8760 Broken hook rd., Douglasville, GA</td>
<td>687-698-8787</td>
<td>wanda@yahoo.com</td>
<td>Junior, Beltmoor</td>
<td>
<button className="adminEditGameButton" id="userEditBtn"type="button" onClick={this.clickEdit}>
             Edit
     </button> 
  </td>
<td>
   <button className="adminEditGameButton" id="userDeleteBtn"type="button" onClick={this.clickDelete}>
             Del
           </button> 

</td>
  </tr>


   </tbody>
   </table>


      </div>


{this.state.deleteMember? 
   
    <div className="deleteWarning">
    Are you sure you want to delete this member?
    <div id="userDeleteCancelButton">
    <button className="adminEditGameButton" id="userCancelBtn"type="button" onClick={this.clickDeleteMember}>
         Cancel
 </button> 
</div>
<div id="userDeleteConfirmButton">
 <button className="adminEditGameButton" id="userConfirmDeleteBtn"type="button" onClick={this.clickDeleteMember}>
         Delete
       </button> 
       </div>
</div>
    :
    null
}


{this.state.editMember?



<div id="adminEditUserForm">
<div id="editMemberName">Member Name</div>
<div id="userEditForm">

<form onSubmit={this.handleSubmit}>
<input className="profileInput" type="text" name="firstName"value={this.state.street} onChange={this.handleChange} placeholder="FirstName"/>
<div className="space"></div>

<input className="profileInput" type="text" name="lastName"value={this.state.street} onChange={this.handleChange} placeholder="Last Name"/>
<div className="space"></div>

<input className="profileInput" type="text" name="userName"value={this.state.street} onChange={this.handleChange} placeholder="User Name"/>
<div className="space"></div>

<input className="profileInput" type="text" name="type"value={this.state.street} onChange={this.handleChange} placeholder="Street"/>
<div className="space"></div>

<select id="roleSelect" value={this.state.value} onChange={this.handleChange}>
            <option value="member">Role</option>
            <option value="member">Member</option>
            <option value="admin">Admin</option>
            <option value="coach">Coach</option>
            </select>






<div className="space"></div>


<input className="profileInput" type="text" name="street"value={this.state.street} onChange={this.handleChange} placeholder="Street"/>
<div className="space"></div>

<input className="profileInput" type="text" name="city"value={this.state.city} onChange={this.handleChange} placeholder="City"/>
<div className="space"></div>
<input className="profileInput" type="text" name="state"value={this.state.state} onChange={this.handleChange} placeholder="State"/>

<div className="space"></div>

<input className="profileInput" type="text" name="zip"value={this.state.zip} onChange={this.handleChange} placeholder="Zip code"/>
<div className="space"></div>

<input className="profileInput" type="text" name="phone"value={this.state.phone} onChange={this.handleChange} placeholder="Phone"/>
<div className="space"></div>
<input className="profileInput" type="text" name="email"value={this.state.street} onChange={this.handleChange} placeholder="Email"/>


<div className="space"></div>

<div className="memberBtnContainer">
<button id="updateUserBtn"type="submit">
           Save
         </button>
         <div className="space"></div>
 <button id="cancelSaveUserBtn"type="button" onClick={this.clickEditMember}>
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

      );
  }

}






  


export default EditUser;
