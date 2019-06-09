import React from 'react';

import logo from '../assets/citySeal.png';


const Header =() =>{
    return(

        <header>
        <div id="logo"> <img id="seal"src= {logo} alt="Douglasville, Georgia city seal"/></div>
        <div id="headerBlurb"></div>
       
      </header>


    );
}



export default Header;