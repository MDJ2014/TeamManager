import React, { Component } from 'react';
var Remarkable = require('remarkable');

var md = new Remarkable({
  html: true,        // Enable HTML tags in source
  xhtmlOut: true,        // Use '/' to close single tags (<br />)
  breaks: true,        // Convert '\n' in paragraphs into <br>
})


class PrivacyStatement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      privacyStatement: "",

    }

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

        let preFormatedData = res.privacy;
        let receivedData = md.render(preFormatedData);
        this.setState({ privacyStatement: receivedData });

      });
  }



  render() {
    return (
      <React.Fragment>
        <div id="privacyOuterContainer">
          <h2>Privacy Statement</h2>


          {this.state.privacyStatement ?
            <div id="privacyContainer" className="innerContainer" dangerouslySetInnerHTML={{ __html: this.state.privacyStatement }}>



            </div>

            : null}

        </div>
      </React.Fragment>
    );

  }
}

export default PrivacyStatement;