import React, { Component } from 'react';




class AdminEditContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      email: "",
      saveSuccess: "",
      errorMessage: "",
      access:""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setSuccessMessage = this.setSuccessMessage.bind(this);
  }



  getResponse = async() =>{
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
        if (receivedData.contact) {
          this.setState({ page: receivedData._id, street: receivedData.contact.street, city: receivedData.contact.city, state: receivedData.contact.state, zip: receivedData.contact.zip, phone: receivedData.contact.phone, email: receivedData.contact.email });
        } else {
          this.setState({ page: receivedData._id });
        }


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
      contact: {
        street: this.state.street,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
        phone: this.state.phone,
        email: this.state.email
      }
    });

    const headers = { 'content-type': 'application/json', accept: 'application/json' };

    await fetch('/home/contact/edit', { method: 'PUT', headers, body })
      .then((res) => this.setState({ saveSuccess: res }))
      .then(this.setSuccessMessage('saveSuccess'))
      .catch(function (response) {
        this.setState({ errorMessage: response.message })
      })

  }


  setSuccessMessage(item) {
    setTimeout(() => {
      this.setState({
        [item]: ''
      });
    }, 3000)
  }



  render() {
    return (
    
      <div>
      {this.state.access === "denied"? <h5>Requires Admin</h5>:
    <div>



      <h2>Edit Contact Information</h2>

      <div className="spacer"></div>

      <div>
        <form onSubmit={this.handleSubmit}>


          <input type="text" className="adminInput" name="street" value={this.state.street} onChange={this.handleChange} placeholder="Enter Street"></input>
          <div className="spacer"></div>
          <input type="text" className="adminInput" name="city" value={this.state.city} onChange={this.handleChange} placeholder="Enter City"></input>
          <div className="spacer"></div>
          <input type="text" className="adminInput" name="state" value={this.state.state} onChange={this.handleChange} placeholder="Enter State"></input>
          <div className="spacer"></div>
          <input type="text" className="adminInput" name="zip" value={this.state.zip} onChange={this.handleChange} placeholder="Enter Zip code"></input>
          <div className="spacer"></div>
          <input type="text" className="adminInput" name="phone" value={this.state.phone} onChange={this.handleChange} placeholder="Enter Phone"></input>
          <div className="spacer"></div>
          <input type="text" className="adminInput" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter Email"></input>
          <div className="spacer"></div>

          <div className="adminHomeBtnContainer">
            <button className="sectionButton" type="submit">
              Save
         </button>

            {this.state.saveSuccess ?
              <h6>Contact information saved</h6>
              :
              null}
          </div>

        </form>

      </div>



    </div>
      }
    </div>
    
    );
  }






}

export default AdminEditContact;