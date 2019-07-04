import React, { Component } from 'react';

import { Link } from 'react-router-dom';


class Footer extends Component {

  state = {
    authenticated: false
  }

  render() {


    return (

      <div id="footer" className="menuList">
        <ul>
          <li><Link to="/privacy-statement">Privacy Statement</Link></li>
          <li> <a href="/terms">Terms of Use</a></li>
          <li><a href="/license-agreement">License Agreements</a></li>

          <li id="copy">Copyright {'\u00A9'}2019</li>
        </ul>
      </div>
    );

  }


}

export default Footer;
