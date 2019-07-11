import React from 'react';

import cup from '../assets/winnercup.png';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';







const ProfileHeader = (props) => {


  return (

    <div id="profileHeaderContainer">
      <div id="memberName"><h2>Welcome {props.name}</h2></div>
      <div id="memberIcon"><img src={cup}></img></div>

      {props.team ?
        <div id="teamLinks">
          {props.team.map((item, index) => {
            if (item) {
              return <div className="teamLinkLogos  teamLink" key={index}>
                <Link to={{
                  pathname: `/team/${item.teamId}`,
                  back: "/profile"

                }} style={{ textDecoration: 'none', color: 'darkslategray' }}>
                  <img className="center" src={`/images/${item.logo}.png`}></img>
                </Link>


              </div>
            }

          }, this)}




        </div>
        : null}

    </div>

  );


}

ProfileHeader.propTypes = {

  name: PropTypes.string,
  team: PropTypes.array
 
 };

export default ProfileHeader;