import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import whistleImg from '../assets/mainWhistle.png';
import smlWhistleImg from '../assets/whistle.png';
import Announcement from './Announcement';
import Callout from './Callout';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      mainAnnouncement: true,
      authenticated: false
    }
    this.changeToAbout = this.changeToAbout.bind(this);
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
        this.setState({ data: receivedData });
      });
  }




  changeToAbout(page) {
    this.props.onClick(page);
  }

  render() {
    let pageData = this.state.data;

    return (

      <div id="homePage" >
        <div id="pageTitle"><h1>City Youth Football Program</h1></div>

        {pageData.welcome ?
          <div id="welcome-top">{pageData.welcome} </div>
          :
          null
        }

        {pageData.header ?
          <div id="mainHeader">{pageData.header}</div>
          :
          null
        }


        {pageData.mainAnnouncement ?
          <Announcement
            announcementTitle={pageData.mainAnnouncement.title}
            announcementBody={pageData.mainAnnouncement.body}
            announcementLink={pageData.mainAnnouncement.link}
          />

          :
          null
        }


        {pageData.mainCallOut ?
          <Callout size={"large"}
            setWhistle={whistleImg}
            title={pageData.mainCallOut.title}
            body={pageData.mainCallOut.body}
            link={pageData.mainCallOut.link}
          />
          :
          null
        }


        {pageData.announcements ?
          <div id="minorAnnouncements">
            {pageData.announcements.map(function (announcement, index) {
              return <Announcement key={index}
                announcementTitle={announcement.title}
                announcementBody={announcement.body}
                announcementLink={announcement.link}
              />
            })}
          </div>
          :
          null
        }


        {pageData.callsToAction ?

          <div id="callouts-container">
            {pageData.callsToAction.map(function (cta, index) {
              return <Callout key={index} size={"small"}
                setWhistle={smlWhistleImg}
                title={cta.title}
                body={cta.body}
                link={cta.link}
              />

            })}

          </div>
          :
          null
        }



        {pageData.notice ?
          <div id="notice">
            {pageData.notice}
          </div>
          :
          null

        }




      </div>

    );

  }


}

export default Home;
