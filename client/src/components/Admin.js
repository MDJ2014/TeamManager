import React, { Component } from 'react';

import AdminEditHome from '../components/AdminEditHome';
import AdminEditTeams from './AdminEditTeams';
import EditUser from '../components/EditUser';
import AdminEditPlayers from '../components/AdminEditPlayers';
import Accounts from '../components/Accounts';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AdminEditAbout from './AdminEditAbout';
import AdminEditContact from './AdminEditContact';
import Messages from './Messages';
import AdminEditPrivacy from '../components/AdminEditPrivacy';
import AdminEditTerms from '../components/AdminEditTerms';
import AdminEditLicense from '../components/AdminEditLicense';



class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userType: null,
      redirect: false,
      editView: "",
      memberView: false,
      teamView: false,
      playerView: false,
      messageView: false,
      homePageView: false,
      editMember: false,
      editTeam: false,
      editPlayer: false

    };
    this.handleMenu = this.handleMenu.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }



  componentDidMount() {


    fetch('/users/user/admin', {
      method: 'GET', headers: { 'Content-Type': 'application/json' }

    })
      .then(response => {
        if (response.ok) {

          return response.json();
        } else {

          throw new Error('You must be logged in to view this page');
        }
      })
      .then(this.setState({ redirect: false }))


      .catch(error => this.setState({ error, redirect: true })
      )
  }





  handleMenu(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ editView: name });
  }


  handleUpdate() {
    this.props.updatePage();
  }


  render() {

    {

      if (this.state.redirect) { return <Redirect to='/' /> }

    }

    return (


      <div>

        <div>

          <div id="adminHeader">Admin Panel</div>



          <div id="adminContainer">

            <div id="stats">


            </div>




            <div id="adminMenu">
              <button className="adminBtn" type="button" name="home" onClick={this.handleMenu}>
                Home Page <span>></span>
              </button>
              <button className="adminBtn" type="button" name="about" onClick={this.handleMenu}>
                About<span>></span>
              </button>
              <button className="adminBtn" type="button" name="contact" onClick={this.handleMenu}>
                Contact<span>></span>
              </button>
              <button className="adminBtn" type="button" name="teams" onClick={this.handleMenu}>
                Teams<span>></span>
              </button>
              <button className="adminBtn" type="button" name="messages" onClick={this.handleMenu}>
                Messages <span>></span>
              </button>
              <button className="adminBtn" type="button" name="members" onClick={this.handleMenu}>
                Members <span>></span>
              </button>
              <button className="adminBtn" type="button" name="players" onClick={this.handleMenu}>
                Players <span>></span>
              </button>
              <button className="adminBtn" type="button" name="privacy" onClick={this.handleMenu}>
                Privacy Statement <span>></span>
              </button>
              <button className="adminBtn" type="button" name="terms" onClick={this.handleMenu}>
                Terms of use <span>></span>
              </button>
              <button className="adminBtn" type="button" name="license" onClick={this.handleMenu}>
                License Agreement <span>></span>
              </button>
              <Link to="/">
                <button className="adminBtn" type="button" name="close">
                  Close Admin</button>
              </Link>
            </div>
            <div id="adminBody">

              {this.state.editView === 'home' ?
                <AdminEditHome />
                :
                this.state.editView === 'about' ?
                  <AdminEditAbout />
                  :
                  this.state.editView === 'contact' ?
                    <AdminEditContact />
                    :

                    this.state.editView === 'teams' ?
                      <AdminEditTeams />
                      :

                      this.state.editView === 'messages' ?
                        <Messages />
                        :

                        this.state.editView === 'members' ?
                          <EditUser />

                          :

                          this.state.editView === 'players' ?
                            <AdminEditPlayers />
                            :


                            this.state.editView === 'accounts' ?
                              <Accounts />
                              :

                              this.state.editView === 'privacy' ?
                                <AdminEditPrivacy />
                                :

                                this.state.editView === 'terms' ?
                                  <AdminEditTerms />
                                  :

                                  this.state.editView === 'license' ?
                                    <AdminEditLicense />
                                    :

                                    null
              }







            </div>

          </div>

        </div>

      </div>
    );
  }
}
export default Admin;