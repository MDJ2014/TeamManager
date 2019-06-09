import React from 'react';

import cup from '../assets/winnercup.png';


const ProfileHeader = (props) => {


return(
  
<div id="profileHeaderContainer">
<div id="memberName"><h2>Welcome {props.name}</h2></div>
<div id="memberIcon"><img src={cup}></img></div>
<div id="fade">
    
</div>
<div id="teams"></div>
</div>

);
    

}
 


export default ProfileHeader;