import React, { Component } from 'react';







class EditPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {

      playerFirstName: '',
      playerLastName: '',
      playerNicName: '',
      playerAge: '',
      playerPositionPreference: '',
      playerAssignedPosition: '',
      playerNumber: '',
      saveSuccess: false


    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setSuccessMessage = this.setSuccessMessage.bind(this);
  }


  componentDidMount() {

    this.setState({
      playerFirstName: this.props.playerToEdit.name.firstName,
      playerLastName: this.props.playerToEdit.name.lastName,
      playerNicName: this.props.playerToEdit.nicName,
      playerAge: this.props.playerToEdit.playerAge,
      playerPositionPreference: this.props.playerToEdit.positionPref,
      playerAssignedPosition: this.props.playerToEdit.assignedPosition,
      playerNumber: this.props.playerToEdit.playerNumber
    })


  }





  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }



  handleSubmit = async (event) => {
    event.preventDefault();

    let body = "";
    if (this.props.adminEdit) {
      body = JSON.stringify({
        playerId: this.props.playerToEdit._id,
        newPlayerData: {
          name: {
            firstName: this.state.playerFirstName,
            lastName: this.state.playerLastName
          },
          nicName: this.state.playerNicName,
          playerAge: this.state.playerAge,
          positionPref: this.state.playerPositionPreference,
          assignedPosition: this.state.playerAssignedPosition,
          playerNumber: this.state.playerNumber
        }

      });


    } else {
      body = JSON.stringify({
        playerId: this.props.playerToEdit._id,
        newPlayerData: {
          name: {
            firstName: this.state.playerFirstName,
            lastName: this.state.playerLastName
          },
          nicName: this.state.playerNicName,
          playerAge: this.state.playerAge,
          positionPref: this.state.playerPositionPreference,
        }

      });

    }

    const headers = { 'content-type': 'application/json', accept: 'application/json' };

    await fetch('/players/player', { method: 'PUT', headers, body })

      .then((res) => this.props.setPlayerSaveSuccess())
      .then(this.props.setPlayerEditSuccess("playerEditSuccess"))
      .then(() => this.props.reRender())
      .then(this.props.cancelEditPlayer())
      .catch(function (response) {
        //this.setState({error:true, errmsg: error});
        //console.log(response.data)
      })




  }



  setSuccessMessage(item) {
    setTimeout(() => {
      this.setState({
        [item]: ''
      });
    }, 1400)
  }




  render() {

    let player = this.props.playerToEdit;


    return (

      <div id="editPlayerContainer" key={player._id}>
        <h4>Edit player: {player.name.firstName}</h4>


        <form id="playerForm" action="" onSubmit={this.handleSubmit}>
          <div><h6>First name</h6></div>
          <input className="playerInput" type="text" name="playerFirstName" value={this.state.playerFirstName} onChange={this.handleChange} placeholder={player.name.firstName} />

          <div><h6>Last name</h6></div>
          <input className="playerInput" type="text" name="playerLastName" value={this.state.playerLastName} onChange={this.handleChange} placeholder={player.name.lastName} />

          <div><h6>Nicname</h6></div>
          <input className="playerInput" type="text" name="playerNicName" value={this.state.playerNicName} onChange={this.handleChange} placeholder={player.nicName} />

          <div><h6>Age</h6></div>
          <input className="playerInput" type="text" name="playerAge" value={this.state.playerAge} onChange={this.handleChange} placeholder={player.playerAge} />

          <div><h6>Position Preference</h6></div>
          <input className="playerInput" type="text" name="playerPositionPreference" value={this.state.playerPositionPreference} onChange={this.handleChange} placeholder={player.positionPref} />



          {this.props.adminEdit ?
            <div >
              <h6>Assigned Position</h6>
              <input className="playerInput" type="text" name="playerAssignedPosition" value={this.state.playerAssignedPosition} onChange={this.handleChange} placeholder={player.assignedPosition} />
              <h6>Player Number</h6>
              <input className="playerInput" type="text" name="playerNumber" value={this.state.playerNumber} onChange={this.handleChange} placeholder={player.playerNumber} />


            </div>

            : null}



          <div id="editPlayerButtons">
            <button id="playerEditSaveButton" className="sectionButton" type="submit">
              Save
         </button>
            <div className="space"></div>
            <button id="playerEditCancelButton" className="sectionButton" type="button" onClick={this.props.cancelEditPlayer}>
              Cancel
         </button>
            <div className="space"></div>

          </div>
        </form>


      </div>


    )

  }



}

export default EditPlayer;
