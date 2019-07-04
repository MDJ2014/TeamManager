import React, { Component } from 'react';
import Select from 'react-select';

class AddGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teamsData: "",
      gameDate: "",
      homeTeam: "",
      awayTeam: "",
      opponent: "",
      location: "",
      homeTeamScore: 0,
      awayTeamScore: 0,
      saveSuccess: false,
      homeOrAway: "",
      options: "",

      selectedOption: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.setSuccessMessage = this.setSuccessMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }






  getResponse = async (age) => {

    const response = await fetch(`/teams/ageGroup/${age}`, {
      method: 'GET', headers: { 'Content-Type': 'application/json' }

    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  componentDidMount() {

    this.componentReRender();
  }

  componentReRender() {

    var age = this.props.ageGroup;
    this.getResponse(age)
      .then(res => {
        const teams = res;

        this.setState({ teamsData: teams });
      });
  }




  handleChange(event) {

    const target = event.target;
    const value = target.value;
    const name = target.name;


    this.setState({ [name]: value });


  }



  handleSelectChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption.value);
  };



  setSuccessMessage(item) {
    setTimeout(() => {
      this.setState({
        [item]: ''
      });
    }, 2000)
  }










  handleSubmit = async (event) => {
    event.preventDefault();


    let body = "";

    if (this.state.homeOrAway === "Home") {

      body = JSON.stringify({
        date: this.state.gameDate,
        homeTeam: this.props.teamId,
        awayTeam: this.state.selectedOption.value,
        location: this.state.location,
      });

    } else if (this.state.homeOrAway === "Away") {
      body = JSON.stringify({
        date: this.state.gameDate,
        homeTeam: this.state.selectedOption.value,
        awayTeam: this.props.teamId,
        location: this.state.location,
      });
    }


    const headers = { 'content-type': 'application/json', accept: 'application/json' };

    await fetch('/games', { method: 'POST', headers, body })
      .then((res) => this.setState({ saveSuccess: true }))
      .then(this.setSuccessMessage("saveSuccess"))

      .then(this.props.reRender())
      .catch(function (response) {
        //this.setState({error:true, errmsg: error});
        //console.log(response.data)
      })


  }


  render() {

    let options = [];
    for (let i = 0; i < this.state.teamsData.length; i++) {
      if (this.props.teamId !== this.state.teamsData[i]._id) {

        options.push({ "value": this.state.teamsData[i]._id, "label": this.state.teamsData[i].teamName })

      }


    }


    return (

      <div id="adminEditGame">
        <div className="space"></div>
        <div className="playerFormTop" id="gameEditTop">
          Add New Game
</div>
        <div className="space"></div>
        <form id="editGameForm" action="" onSubmit={this.handleSubmit}>
          <h6>Game Date</h6>
          <input className="team-form-input" type="text" name="gameDate" value={this.state.gameDate} onChange={this.handleChange} placeholder="Game date" />
          <div className="space"></div>



          <h5>Select this team to play as the home or away team</h5>
          <div className="space"></div>

          <div>
            <div>
              <label>
                <input type="radio" value="Home" name="homeOrAway" onChange={this.handleChange} checked={this.state.homeOrAway === "Home"} />
                Home
          </label>
            </div>
            <div>
              <label className="gameSelectBtn">
                <input type="radio" value="Away" name="homeOrAway" onChange={this.handleChange} checked={this.state.homeOrAway === "Away"} />
                Away
          </label>
            </div>
          </div>

          <div className="space"></div>

          <div id="teamSelectContainter">
            <h6>Select Opponent</h6>
            <Select options={options} onChange={this.handleSelectChange} value={this.state.selectedOption} />
          </div>

          <div className="space"></div>





          <h6>Location</h6>
          <input className="team-form-input" type="text" name="location" value={this.state.location} onChange={this.handleChange} placeholder="Location" />
          <div className="space"></div>



          <button id="saveTeamButton" className="sectionButton" type="submit">
            Save
         </button>

        </form>
        {this.state.saveSuccess ? <h6>Game saved</h6> : null}
      </div>
    );

  }

}




export default AddGame;