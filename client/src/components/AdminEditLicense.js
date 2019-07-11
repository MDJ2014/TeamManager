import React, { Component } from 'react';

var Remarkable = require('remarkable');


var md = new Remarkable();



class AdminEditLicense extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "",
      license: "",
      saveSuccess: "",
      errorMessage: "",
      typographer: true,
      linkify: true,
      access: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setSuccessMessage = this.setSuccessMessage.bind(this);

  }


  getResponse = async () => {
    fetch('/home/admin', {
      method: 'GET', headers: { 'Content-Type': 'application/json' }
    
    })
    .then(res =>{
      if(res.status !== 200){
       this.setState({access: 'denied'})
      }else{
        return res.json();
    
      }
    })
    .then(data => {
      const receivedData = data;
      this.setState({ page: receivedData._id, license: receivedData.license });
    })  
    .catch(error => this.setState({error})
    )


  }

  componentDidMount() {
    this.getResponse();

  }



  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }






  handleSubmit = async (event) => {
    event.preventDefault();
 
    const body = JSON.stringify({
      id: this.state.page,
     license: this.state.license
    });

    const headers = { 'content-type': 'application/json', accept: 'application/json' };

   
    await fetch('/home/license/edit', { method: 'PUT', headers, body })
    .then((res)=>{
      this.setState({saveSuccess: true})
    })
     .then(this.setSuccessMessage())
    .catch(function (response) {
      this.setState({ errorMessage: response.message })
    })
  }


  setSuccessMessage() {
   
    var msg ="";
    if(!this.state.saveSuccess){
      msg = "access";
    }else if(!this.state.access){
      msg = "saveSuccess";
    }
  
    setTimeout(() => {
      this.setState({
        [msg]: ''
      });
    }, 2000)
  }



  render() {
    return (
    
    <div>{this.state.access === "denied"? <h5>Requires Admin</h5> :
    
    <div>



      <h2>Edit License Agreement</h2>
      <form onSubmit={this.handleSubmit}>
        <textarea id="privacyInput" type="textarea" name="license" value={this.state.license} onChange={this.handleChange} placeholder="Enter license agreement" rows="15" cols="150">
        </textarea>
        <div className="adminHomeBtnContainer">
          <button className="sectionButton" type="submit">
            Save
         </button>

          {this.state.saveSuccess ?
            <h6>License Agreement Saved</h6>
            :
            null}
          
        </div>

      </form>

    </div>
     } </div>
    
    );
  }


}

export default AdminEditLicense;