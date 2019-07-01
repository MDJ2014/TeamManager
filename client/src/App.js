import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import LogIn from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Team from './components/Team';
import Teams from './components/Teams'
import Admin from './components/Admin';
import PrivacyStatement from './components/privacyStatement';
import LicenseAgreement from './components/LicenseAgreement';
import TermsOfUse from './components/TermsOfUse';




function App() {
  return (
    <Router>


    
    <div className="App">
    <Route exact path="/" component={Header}/>
    <Route exact path="/" component={Menu}/>
    <Route path="/contact" component={Header}/>
    <Route path="/contact" component={Menu}/>
    <Route path="/about" component={Header}/>
    <Route path="/about" component={Menu}/>
    <Route path="/login" component={Header}/>
    <Route path="/login" component={Menu}/>
    <Route path="/login" component={Footer}/>
    <Route path="/register" component={Header}/>
    <Route path="/register" component={Menu}/>
    <Route path="/register" component={Footer}/>
    <Route path="/profile" component={Menu}/>
    <Route path="/profile" component={Footer}/>
    <Route path="/team" component={Menu}/>
    <Route path="/teams" component={Menu}/>
    <Route path="/privacy-statement" component={Menu}/>
    <Route path="/privacy-statement" component={Header}/>
    <Route path="/privacy-statement" component={Footer}/>
    <Route path="/license-agreement" component={Header}/>
    <Route path="/license-agreement" component={Menu}/>
    <Route path="/license-agreement" component={Footer}/>
    <Route path="/terms" component={Header}/>
    <Route path="/terms" component={Menu}/>
    <Route path="/terms" component={Footer}/>

<div id="maincontainer">

    
    <Route exact path="/" component={Home}/>
    <Route path="/contact" component={Contact}/>
    <Route path="/contact" component={Footer}/>
    <Route path="/about" component={About}/>
    <Route path="/about" component={Footer}/>
    <Route path="/login" component={LogIn}/>
    <Route path="/register" component={Register}/>
    <Route exact path="/" component={Footer}/>
     <Route path="/team/:id" component={Team}/>
    <Route path="/teams" component={Teams}/>
    <Route path="/admin" component={Admin}/>
    <Route path="/privacy-statement" component={PrivacyStatement}/>
<Route path="/license-agreement" component={LicenseAgreement}/>
<Route path="/terms" component={TermsOfUse}/>
<Route path="/profile" component={Profile}/>








</div>

    </div>


    </Router>
  );
}

export default App;
