import React from 'react';
import './Header.css';
import logo from '../../assets/citySeal.png';
//const Menu = ({name}) =>{
const Header =() =>{
    return(

        <header>
        <div id="logo"> <img id="seal"src= {logo} alt="Douglasville, Georgia city seal"/></div>
        <div id="pageTitle"><h1>City Youth Football Program</h1></div>
       
      </header>


    );
}


// Menu.protoTypes = {name: React.PropTypes.string.isRequired};



export default Header;