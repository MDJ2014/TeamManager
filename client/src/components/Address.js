import React, { Component } from 'react';



class Address extends Component {
  constructor(props) {
    super(props);

    this.state = {

      street: "",
      city: "",
      state: "",
      zip: "",
      phone: ""

    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getResponse = async () => {
    const response = await fetch('/users/register');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
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
      userPhone: this.state.phone,
      userAddress: {
        street: this.state.street,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip
      }
    });

    const headers = { 'content-type': 'application/json', accept: 'application/json' };

    await fetch('/users/address', { method: 'PUT', headers, body })
    .then((res)=>this.setState({
      street: "",
      city: "",
      state: "",
      zip: "",
      phone: ""
    }))
      .then(this.props.reRender())
      .catch(function (response) {
        //this.setState({error:true, errmsg: error});
        //console.log(response.data)
      })

  }





  render() {

    return (



      <div id="addressForm" className="personalDetails">
        <form onSubmit={this.handleSubmit}>

          <h6>Street:</h6>
          <div className="profileFormResult">
            <input className="form-input" type="text" name="street" value={this.state.street} onChange={this.handleChange} placeholder="Street" />
          </div>


          <h6>City:</h6>
          <div className="profileFormResult">
            <input className="form-input" type="text" name="city" value={this.state.city} onChange={this.handleChange} placeholder="City" />
          </div>



          <h6>State:</h6>
          <div className="profileFormResult">
            <input className="form-input" type="text" name="state" value={this.state.state} onChange={this.handleChange} placeholder="State" />
          </div>


          <h6>Zip code:</h6>
          <div className="profileFormResult">
            <input className="form-input" type="text" name="zip" value={this.state.zip} onChange={this.handleChange} placeholder="Zip code" />
          </div>




          <h6>Phone:</h6>
          <div className="profileFormResult">
            <input className="form-input" type="text" name="phone" value={this.state.phone} onChange={this.handleChange} placeholder="Phone" />
          </div>



          <div className="space"></div>
          <div>*Please complete and save to continue to player registration.</div>
          <div className="space"></div>
          <button type="submit" className="sectionButton" id="addressSaveBtn">
            Save
         </button>
        </form>
      </div>


    );
  }

}









export default Address;
