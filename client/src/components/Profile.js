
import React, { Component } from 'react';

import { Redirect } from 'react-router'
import Players from '../components/Players';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import PlayerForm from '../components/PlayerForm';
import Address from '../components/Address';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLoading: true,
      profileData: "",
      playerSet: "",
      playerToEdit: ""


    }

    this.setPlayerEdit = this.setPlayerEdit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.handleSavedUpdate = this.handleSavedUpdate.bind(this);
    this.getLogos = this.getLogos.bind(this);
    this.componentRerender = this.componentRerender.bind(this);
  }


  getInitialState() {
    return {
      playerToEdit: null
    };
  }

  getResponse = async () => {
    const response = await fetch('/users/profile', {
      method: 'GET', headers: { 'Content-Type': 'application/json' }

    });
    const body = await response;
    if (response.status !== 200)
    //throw Error(body.message);
    {



    } else {
      return body;
    }
  }


  componentDidMount() {

    // fetch('/users/profile')
    this.getResponse()
      .then(data => data.json())
      .then((data) => {
        this.setState({ profileData: data })
      });

  }

  componentRerender() {
    this.getResponse()
      .then(data => data.json())
      .then((data) => {
        this.setState({ profileData: data, playerSet: "" })
      });
  }





  setPlayerEdit(item) {
    switch (item) {
      case 'add': if (this.state.playerSet === 'add') { this.setState({ playerSet: "" }) } else { this.setState({ playerSet: "add" }) };
        break;
      case 'edit': if (this.state.playerSet === 'edit') { this.setState({ playerSet: "" }) } else { this.setState({ playerSet: "edit" }) };
        break;
      default: this.setState({ playerSet: "" });
        break;
    }

  }

  cancelEdit() {
    this.setState({ playerToEdit: "" });
  }


  handleSavedUpdate(data) {
    this.setState({ profileData: data });
  }




  renderItemOrEditItem(player) {
    if (this.state.playerToEdit === player._id) {

      return (
        <PlayerForm playerToEdit={player} cancelEdit={this.cancelEdit} key={player._id} />
      );


    } else {

      return (
        <Players editmode={this.toggleEdit} playerToShow={player} updateList={this.handleSavedUpdate} key={player._id} />
      )


    }

  }

  toggleEdit(itemId) {

    this.setState({ playerToEdit: itemId });

  }

  getLogos() {
    let playerData = "";
    if (this.state.profileData.playerData) {
      playerData = this.state.profileData.playerData;
    }

    let logos = [];

    for (let i = 0; i < playerData.length; i++) {
      if (playerData[i].team) {
        logos.push(
          { "logo": playerData[i].team.logo, "teamId": playerData[i].team._id }

        );
      }
    }



    let distinctList = Array.from(new Set(logos.map(item => item.logo)))
      .map(itemLogo => { return { logo: itemLogo, teamId: logos.find(x => x.logo === itemLogo).teamId } })



    return distinctList;


  }




  render() {

    let pageData = this.state.profileData.userData;
    let playerData = this.state.profileData.playerData;
    let teamLogos = this.getLogos();

    return (<div>
      {pageData ?


        <div id="profileContainer">
          <ProfileHeader name={pageData.userName} team={teamLogos} />
          <div id="profileBody">
            <section id="peronalInformation" className="profileSection">
              <div className="profileSectionLabel"><h2>Personal Information</h2></div>
              <div className="personalDetails">
                <div id="profileUserFirstName" className="profileFieldContainer">
                  <div className="profileFormLabels">First name:</div>
                  <div className="profileFormResult">{pageData.name.firstName}</div>
                </div>
                <div id="profileUserLastName" className="profileFieldContainer">
                  <div className="profileFormLabels">Last name:</div>
                  <div className="profileFormResult">{pageData.name.lastName}</div>
                </div>

                <div id="profileUserEmail" className="profileFieldContainer">
                  <div className="profileFormLabels">Email:</div>
                  <div className="profileFormResult">{pageData.userEmail}</div>
                </div>
              </div>

              {pageData.userAddress.street && pageData.userAddress.city && pageData.userAddress.state && pageData.userAddress.zip && pageData.userPhone
                ?

                <div id="addressInfo" className="personalDetails">
                  <div id="profileUserStreet" className="profileFieldContainer">
                    <div className="profileFormLabels">Street:</div>
                    <div className="profileFormResult">{pageData.userAddress.street}</div>
                  </div>
                  <div id="profileUserCity" className="profileFieldContainer">
                    <div className="profileFormLabels">City:</div>
                    <div className="profileFormResult">{pageData.userAddress.city}</div>
                  </div>
                  <div id="profileUserState" className="profileFieldContainer">
                    <div className="profileFormLabels">State:</div>
                    <div className="profileFormResult">{pageData.userAddress.state}</div>
                  </div>
                  <div id="profileUserZip" className="profileFieldContainer">
                    <div className="profileFormLabels">Zip code:</div>
                    <div className="profileFormResult">{pageData.userAddress.zip}</div>
                  </div>


                  <div id="contactInfo">
                    <div id="profileUserPhone" className="profileFieldContainer">
                      <div className="profileFormLabels">Phone:</div>
                      <div className="profileFormResult">{pageData.userPhone}</div>
                    </div>
                  </div>

                </div>

                :


                <Address reRender={this.componentRerender} />
              }
            </section>
          </div>

          {pageData.userAddress.street ?
            <section id="playerSection" className="profileSection">
              <div id="playerSectionTitle" className="profileSectionLabel"><h2>My Players</h2>
                <div id="btnContainer">
                  <button id="playerAddBtn" type="button" className="sectionButton" onClick={() => this.setPlayerEdit("add")}>
                    {this.state.playerSet === "add" ? 'Close' : 'Add Player'}
                  </button>
                </div>
              </div>
              <div id="newPlayerFormContainer">
                {this.state.playerSet === "add" ?
                  <PlayerForm playerToEdit={false} addPlayer={this.handleAddPlayerSubmit} formTitle={this.state.playerSet} updateList={this.componentRerender} />
                  :
                  null
                }
              </div>

            </section>

            :

            null
          }
          <section id="myPlayers">
            <div id="playersContainer">
              {pageData ?
                playerData.map((item) => {
                  return this.renderItemOrEditItem(item);
                }, this)
                : <h6>Loading....</h6>}
            </div>
          </section>

        </div>
        : null}
    </div>
    );
  }



}



export default Profile;
