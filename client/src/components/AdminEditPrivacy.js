import React, { Component } from 'react';




class AdminEditPrivacy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "",
      privacy: "",
      saveSuccess: "",
      access: "",
      errorMessage: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  /*
  getResponse = async () => {
    const response = await fetch('/home', {
      method: 'GET', headers: { 'Content-Type': 'application/json' }

    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }
*/


  getResponse = async () => {
    fetch('/home/admin', {
      method: 'GET', headers: { 'Content-Type': 'application/json' }

    })
      .then(res => {
        if (res.status !== 200) {
          this.setState({ access: 'denied' })
        } else {
          return res.json();

        }
      })
      .then(data => {
        const receivedData = data;
        this.setState({ page: receivedData._id, privacy: receivedData.privacy });
      })
      .catch(error => this.setState({ error })
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
      privacy: this.state.privacy
    });

    const headers = { 'content-type': 'application/json', accept: 'application/json' };

    await fetch('/home/privacy/edit', { method: 'PUT', headers, body })
      .then((res) => {

        if (res.status !== 200) {

          throw new Error("Problem saving.");

        } else {

          this.setState({ saveSuccess: true })
        }

      })
      .then(this.setSuccessMessage())
      .catch(function (response) {
        this.setState({ errorMessage: response.message })
      })

  }


  setSuccessMessage() {
    var msg = "";
    if (!this.state.saveSuccess) {
      msg = "access";
    } else if (!this.state.access) {
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


      <div>{this.state.access === "denied" ? <h5>Requires Admin</h5> :
        <div>



          <h2>Edit Privacy Statement</h2>
          <form onSubmit={this.handleSubmit}>
            <textarea id="privacyInput" type="textarea" name="privacy" value={this.state.privacy} onChange={this.handleChange} placeholder="Enter terms of use" rows="15" cols="150">
            </textarea>
            <div className="adminHomeBtnContainer">
              <button className="sectionButton" type="submit">
                Save
         </button>

              {this.state.saveSuccess ?
                <h6>Privacy Statement Saved</h6>
                :
                null}
              {this.state.access ? <h6>Access Denied</h6> : null}
            </div>

          </form>

        </div>
      }</div>

    );
  }






}

export default AdminEditPrivacy;