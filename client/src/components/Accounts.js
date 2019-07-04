import React, { Component } from 'react';







class Accounts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderedResponse: '',
      playerFirstName: '',
      playerLastName: '',
      playerNicName: '',
      playerAge: '',
      playerPositionPreference: ''


    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.cancelEdit = this.cancelPlayerEdit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }


  handleSubmit = async (event) => {

    const body = JSON.stringify({
      playerId: this.props.playerToEdit,
      playerFirstName: this.state.playerFirstName,
      playerLastName: this.state.playerLastName,
      playerNicName: this.state.playerNicName,
      playerAge: this.state.playerAge,
      playerPositionPreference: this.state.playerPositionPreference
    });

    const headers = { 'content-type': 'application/json', accept: 'application/json' };

    await fetch('/players/player', { method: 'PUT', headers, body })
      .then((res) => this.props.editPlayer())
      .catch(function (response) {
        //this.setState({error:true, errmsg: error});
        //console.log(response.data)
      })




    this.props.editPlayer();

  }








  render() {
    return (
      <div>Accounts</div>


    )



  }



}

export default Accounts;
