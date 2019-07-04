import React, { Component } from 'react';




class AdminEditTerms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "",
      terms: "",
      saveSuccess: "",
      errorMessage: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getResponse = async () => {
    const response = await fetch('/home', {
      method: 'GET', headers: { 'Content-Type': 'application/json' }

    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  componentDidMount() {
    this.getResponse()
      .then(res => {
        const receivedData = res;
        this.setState({ page: receivedData._id, terms: receivedData.terms });
      });
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
      terms: this.state.terms
    });

    const headers = { 'content-type': 'application/json', accept: 'application/json' };

    await fetch('/home/terms/edit', { method: 'PUT', headers, body })
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
    return (<div>



      <h2>Edit Terms Of Use</h2>
      <form onSubmit={this.handleSubmit}>
        <textarea id="privacyInput" type="textarea" name="terms" value={this.state.terms} onChange={this.handleChange} placeholder="Enter terms of use" rows="15" cols="150">
        </textarea>
        <div className="adminHomeBtnContainer">
          <button className="sectionButton" type="submit">
            Save
         </button>

          {this.state.saveSuccess ?
            <h6>Terms of use saved</h6>
            :
            null}
        </div>

      </form>





    </div>);
  }






}

export default AdminEditTerms;