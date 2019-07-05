import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../assets/citySeal.png';





class AllTeams extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allTeams: '',
      redirect: false

    };

  }


  
  componentDidMount() {

  
    fetch('/teams', {
      method: 'GET', headers: { 'Content-Type': 'application/json' }
    
    })
    .then(response =>{
      if(response.ok){
        return response.json();
      }else{
    
       throw new Error('You must be logged in to view this page');
      }
    })
    .then(data => this.setState({allTeams: data}))
    .catch(error => this.setState({error, redirect: true})
      )
      }
    


  render() {

    {if(this.state.redirect){return <Redirect to='/'/>}}

    return (
      <div id="allTeamsContainer">
        <div id="allTeamsHeader">
          <div id="teamHeaderTop">
            <img src={logo} alt="city logo" height="100" width="100" />
            <h2>Our Teams</h2>
          </div>

        </div>



        <div className="bar2">
          <div className="outer2">
            <div className="mid2">Six Year Olds</div>
            <div id="left" className="skewed2 bars" ></div>
            <div className="skewed2 radial2 bars"></div>
            <div className="skewed2 right2 bars"></div>
          </div>
        </div>




        {this.state.allTeams ?
          <div id="sixYearOlds" className="singleTeamContainer">

            {this.state.allTeams.filter(function (team) {
              return team.ageGroup === 6;
            }).map(function (ageGroupTeam) {
              return <div className="teamBody" key={ageGroupTeam._id}>
                <Link to={{
                  pathname: `/team/${ageGroupTeam._id}`,
                  back: "/teams"

                }} style={{ textDecoration: 'none' }}>
                  <div className="teamImgContainer">
                    <div className="teamImg">
                      <img className="center" src={`/images/${ageGroupTeam.logo}.png`}></img>
                    </div>
                    <div className="teamImgName">{ageGroupTeam.teamName}</div>
                  </div>
                </Link>
              </div>
            })
            }

          </div>

          : null}



        <div className="bar2">
          <div className="outer2">
            <div className="mid2">Seven Year Olds</div>
            <div id="left" className="skewed2 bars" ></div>
            <div className="skewed2 radial2 bars"></div>
            <div className="skewed2 right2 bars"></div>
          </div>
        </div>




        {this.state.allTeams ?
          <div id="sevenYearOlds" className="singleTeamContainer">

            {this.state.allTeams.filter(function (team) {
              return team.ageGroup === 7;
            }).map(function (ageGroupTeam) {
              return <div className="teamBody" key={ageGroupTeam._id}>
                <Link to={{
                  pathname: `/team/${ageGroupTeam._id}`,
                  back: "/teams"

                }} style={{ textDecoration: 'none' }}>
                  <div className="teamImgContainer">
                    <div className="teamImg">
                      <img className="center" src={`/images/${ageGroupTeam.logo}.png`}></img>
                    </div>
                    <div className="teamImgName">{ageGroupTeam.teamName}</div>
                  </div>
                </Link>
              </div>
            })
            }

          </div>

          : null}




        <div className="bar2">
          <div className="outer2">
            <div className="mid2">Eight Year Olds</div>
            <div id="left" className="skewed2 bars" ></div>
            <div className="skewed2 radial2 bars"></div>
            <div className="skewed2 right2 bars"></div>
          </div>
        </div>


        {this.state.allTeams ?
          <div id="eightYearOlds" className="singleTeamContainer">

            {this.state.allTeams.filter(function (team) {
              return team.ageGroup === 8;
            }).map(function (ageGroupTeam) {
              return <div className="teamBody" key={ageGroupTeam._id}>
                <Link to={{
                  pathname: `/team/${ageGroupTeam._id}`,
                  back: "/teams"

                }} style={{ textDecoration: 'none' }}>
                  <div className="teamImgContainer">
                    <div className="teamImg">
                      <img className="center" src={`/images/${ageGroupTeam.logo}.png`}></img>
                    </div>
                    <div className="teamImgName">{ageGroupTeam.teamName}</div>
                  </div>
                </Link>
              </div>
            })
            }

          </div>

          : null}


        <div className="bar2">
          <div className="outer2">
            <div className="mid2">Nine Year Olds</div>
            <div id="left" className="skewed2 bars" ></div>
            <div className="skewed2 radial2 bars"></div>
            <div className="skewed2 right2 bars"></div>
          </div>
        </div>




        {this.state.allTeams ?
          <div id="nineYearOlds" className="singleTeamContainer">

            {this.state.allTeams.filter(function (team) {
              return team.ageGroup === 9;
            }).map(function (ageGroupTeam) {
              return <div className="teamBody" key={ageGroupTeam._id}>
                <Link to={{
                  pathname: `/team/${ageGroupTeam._id}`,
                  back: "/teams"

                }} style={{ textDecoration: 'none' }}>
                  <div className="teamImgContainer">
                    <div className="teamImg">
                      <img className="center" src={`/images/${ageGroupTeam.logo}.png`}></img>
                    </div>
                    <div className="teamImgName">{ageGroupTeam.teamName}</div>
                  </div>
                </Link>
              </div>
            })
            }

          </div>

          : null}



        <div className="bar2">
          <div className="outer2">
            <div className="mid2">Ten Year Olds</div>
            <div id="left" className="skewed2 bars" ></div>
            <div className="skewed2 radial2 bars"></div>
            <div className="skewed2 right2 bars"></div>
          </div>
        </div>





        {this.state.allTeams ?
          <div id="tenYearOlds" className="singleTeamContainer">

            {this.state.allTeams.filter(function (team) {
              return team.ageGroup === 10;
            }).map(function (ageGroupTeam) {
              return <div className="teamBody" key={ageGroupTeam._id}>
                <Link to={{
                  pathname: `/team/${ageGroupTeam._id}`,
                  back: "/teams"

                }} style={{ textDecoration: 'none' }}>
                  <div className="teamImgContainer">
                    <div className="teamImg">
                      <img className="center" src={`/images/${ageGroupTeam.logo}.png`}></img>
                    </div>
                    <div className="teamImgName">{ageGroupTeam.teamName}</div>
                  </div>
                </Link>
              </div>
            })
            }

          </div>

          : null}




        <div className="bar2">
          <div className="outer2">
            <div className="mid2">Eleven Year Olds</div>
            <div id="left" className="skewed2 bars" ></div>
            <div className="skewed2 radial2 bars"></div>
            <div className="skewed2 right2 bars"></div>
          </div>
        </div>





        {this.state.allTeams ?
          <div id="elevenYearOlds" className="singleTeamContainer">

            {this.state.allTeams.filter(function (team) {
              return team.ageGroup === 11;
            }).map(function (ageGroupTeam) {
              return <div className="teamBody" key={ageGroupTeam._id}>
                <Link to={{
                  pathname: `/team/${ageGroupTeam._id}`,
                  back: "/teams"

                }} style={{ textDecoration: 'none' }}>
                  <div className="teamImgContainer">
                    <div className="teamImg">
                      <img className="center" src={`/images/${ageGroupTeam.logo}.png`}></img>
                    </div>
                    <div className="teamImgName">{ageGroupTeam.teamName}</div>
                  </div>
                </Link>
              </div>
            })
            }

          </div>

          : null}



        <div className="bar2">
          <div className="outer2">
            <div className="mid2">Twelve Year Olds</div>
            <div id="left" className="skewed2 bars" ></div>
            <div className="skewed2 radial2 bars"></div>
            <div className="skewed2 right2 bars"></div>
          </div>
        </div>




        {this.state.allTeams ?
          <div id="twelveYearOlds" className="singleTeamContainer">

            {this.state.allTeams.filter(function (team) {
              return team.ageGroup === 12;
            }).map(function (ageGroupTeam) {
              return <div className="teamBody" key={ageGroupTeam._id}>
                <Link to={{
                  pathname: `/team/${ageGroupTeam._id}`,
                  back: "/teams"

                }} style={{ textDecoration: 'none' }}>
                  <div className="teamImgContainer">
                    <div className="teamImg">
                      <img className="center" src={`/images/${ageGroupTeam.logo}.png`}></img>
                    </div>
                    <div className="teamImgName">{ageGroupTeam.teamName}</div>
                  </div>
                </Link>
              </div>
            })
            }

          </div>

          : null}



      </div>



    );

  }

}

export default AllTeams;