import React, { Component } from 'react';
import PropTypes from 'prop-types';





class AddCoach extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allCoaches: "",
      removeCoach: false,
      selectedCoaches: [],
      saveSuccess: false,
      access: true

    };
  
    this.removeCoach = this.removeCoach.bind(this);
    this.handleSelectCoach = this.handleSelectCoach.bind(this);
    this.handleRemoveSelectedCoach = this.handleRemoveSelectedCoach.bind(this);
    this.setSuccessMessage = this.setSuccessMessage.bind(this);
  }



  componentDidMount() {
    this.componentReRender();
  }


  getResponse = async (ageGroup) => {
    const response = await fetch(`/users/coaches`, {
      method: 'GET', headers: { 'Content-Type': 'application/json' }


    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }



  componentReRender() {

    this.getResponse(this.props.ageGroup)
      .then(res => {
        const receivedData = res;

        this.setState({ allCoaches: receivedData });
      });


  }

  

  handleSelectCoach(coach) {
    var coachList = this.state.selectedCoaches;
    var coachId = coach._id;
    var coachFound = false;

    for (let i = 0; i < coachList.length; i++) {
      if (coachList[i]._id === coachId) {
        coachFound = true;
        break;
      }
    }

    if (!coachFound) {
      var joined = this.state.selectedCoaches.concat(coach);
      this.setState({ selectedCoaches: joined })
    }

  }


  handleRemoveSelectedCoach(coach) {
    var coachList = this.state.selectedCoaches;
    var coachId = coach._id;

    for (let i = 0; i < coachList.length; i++) {
      if (coachList[i]._id === coachId) {
        coachList.splice(i, 1);
      }
    }
    this.setState({ selectedCoaches: coachList });
  }




  handleSubmit = async (event) => {

    var coachIds = this.state.selectedCoaches.map(function (coach) {
      return (
        coach._id
      )
    });


    const body = JSON.stringify({
      teamId: this.props.teamId,
      coaches: coachIds

    });
    const headers = { 'content-type': 'application/json', accept: 'application/json' };

    await fetch('/teams/coaches', { method: 'PUT', headers, body })

    .then(res =>{
      if(res.status !== 201){
        this.setState({access: 'denied'})
      }else{
        this.setState({ saveSuccess: true, selectedCoaches: [] })
    // return res.json();
      }
    })
     // .then((res) => this.setState({ saveSuccess: true, selectedCoaches: [] }))
      .then(this.setSuccessMessage())
      .then(this.props.reRender())
      .catch((error) => { 
        this.setState({err: true})
        error.then((e) => {
          this.setSuccessMessage("error");
        });
    })







  }

  

  removeCoach() {
    this.state.removeCoach ? this.setState({ removeCoach: false }) : this.setState({ removeCoach: true });
  }



  setSuccessMessage(item) {
    var msg = "";
    if(this.state.saveSuccess){
      msg = "saveSuccess";
    }else{
      msg = "access";
    }
    setTimeout(() => {
      this.setState({
        [msg]: ''
      });
    }, 2000)
  }

 

  render() {

    return (


      <div id="coachFormContainer">

        <div id="addCoachList">
          <table className={"systemTable coachTable"}>
            <thead>
              <tr>
                <th className="tbleRow">First Name</th>
                <th className="tbleRow">Last Name</th>
                <th className="tbleRow">Preference</th>
                <th></th>
              </tr>
            </thead>



            {this.state.allCoaches ?
              <tbody>

                {this.state.allCoaches.map(function (coach) {
                  if (!coach.position.team) {

                    return (
                      <tr>
                        <td>{coach.name.firstName}</td>
                        <td>{coach.name.lastName}</td>
                        {coach.position.preference ?
                          <td>{coach.position.preference}</td>
                          : null}


                        <td>
                          <button className="adminEditGameButton" id="coachEditBtn" type="button" onClick={() => this.handleSelectCoach(coach)}>
                            Add
           </button>

                        </td>
                      </tr>

                    )
                  }

                }, this)}



              </tbody>
              : null}
          </table>
        </div>



        <div id="selectedCoaches">
          <table className={"coachTable systemTable"}>
            <thead >
              <tr>
                <th className="tbleRow">First Name</th>
                <th className="tbleRow">Last Name</th>
                <th className="tbleRow">Title</th>
                <th className="tbleRow">Preference</th>
                <th className="tbleRow"></th>
              </tr>
            </thead>
            <tbody>


              {this.state.selectedCoaches.map(function (coach) {
                return (
                  <tr>
                    <td>{coach.name.firstName}</td>
                    <td>{coach.name.lastName}</td>
                    <td>{coach.position.title}</td>
                    <td>{coach.position.preference}</td>
                    <td>
                      <button className="adminEditGameButton" id="coachDeleteBtn" type="button" onClick={() => this.handleRemoveSelectedCoach(coach)}>
                        Del
           </button>
                    </td>
                  </tr>


                )
              }, this)}


            </tbody>
          </table>

          {this.state.selectedCoaches.length > 0 ?
            <button id="saveMessageButton" className="sectionButton" type="Button" onClick={this.handleSubmit}>
              Save
         </button>
            : null}
        </div>


{this.state.saveSuccess? <h6>Saved</h6>:null}
{this.state.access === "denied"? <h6>Requires Admin</h6>:null}
      </div>
    )



  }




}

export default AddCoach;