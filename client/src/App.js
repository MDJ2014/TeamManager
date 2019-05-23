import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Menu from './components/menu/Menu';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import About from './components/about/About';
import Register from './components/Register/Register';
import LogIn from './components/login/Login';
import Contact from './components/contact/Contact';
import Profile from './components/profile/Profile';
import RegisterPlayer from './components/registerPlayer/RegisterPlayer';
import { Link } from 'react-router-dom';
import Error from './components/error/error'



class App extends Component {
  constructor(props){
    super(props);
  
    this.state = {
      data: ''
     
    };
    this.onClick = this.onClick.bind(this);
  }


 

/*
getResponse = async() =>{
  const response = await fetch('/home');

  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body; 
}
*/

getResponse = async()=>{
  const response = await fetch('/home',{method:'GET', headers:{'Content-Type': 'application/json'}

});
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body; 
}

componentDidMount(){
  this.getResponse()
  .then(res => {
    const receivedData = res;
    this.setState({data: receivedData});
  });
}


/*
componentDidUpdate() {
  if(this.props.onClick.message === 'ok'){
      console.log('ok');
      if (!this.state.isLogged) {
          this.setState({
              isLogged: true
          });
      }
      this.props.history.push('/');
      //path is ok!!!
      console.log('path from history: ', this.props.history);
  }
}
*/





onClick(page){
  //this.state.home ? this.setState({home: false}) : this.setState({home: true});
  this.setState({view:page});
}

  render(){
const pageData = this.state.data;


 return (
<Router>
  <div id="homeBody ">
  <Route exact path="/" component={Header}/>
 <Route  path="/login" component={Header}/>
 <Route  path="/register" component={Header}/>
 <Route  path="/contact" component={Header}/>
 <Route  path="/about" component={Header}/>


    <menubar id="topMenu"><Menu /></menubar>
    
 
    
<div id="main">
<Route exact path="/" render={props => (
  <React.Fragment>
    <div className="divider"></div>

{pageData.welcome?
  <div id="welcome-top">{pageData.welcome} </div>
:
null
}


  <div id="maincontainer">
{pageData.header?
<div id="mainHeader">{pageData.header}</div>
:
null
}

{pageData.mainAnnouncement?
<div id="mainAnnouncements">
<div className="announcement">
<div className="announcement-top">
<h2 className="announcement-title">{pageData.mainAnnouncement.title}</h2>
</div>

<p className="announcement-body">{pageData.mainAnnouncement.body}</p>
{pageData.mainAnnouncement.link?
<p className="announcement-footer"><Link to ={pageData.mainAnnouncement.link}>Link</Link></p>
:
null}

</div>
</div>
:
null
}


{pageData.mainCallOut?
<div id="mainCallout" className="callout">
<div className="callout-top" id="calloutTop"><div className="whistle" id="mainWhistle"></div>
<h2 className="callout-title">{pageData.mainCallOut.title}</h2>
</div>

<p className="callout-body">{pageData.mainCallOut.body}</p>
{pageData.mainCallOut.link?
<p className="callout-footer"><Link to ={pageData.mainCallOut.link}>Link</Link></p>
:
null}

</div>
:
null
}

{pageData.announcements?
<div id="otherAnnouncements">
{pageData.announcements.map(function(announcement, index){
return <div className="announcement" key={index}>
<div className="announcement-top">
 <h2 className="announcement-title">{announcement.title}</h2>
</div>
<p className="announcement-body">{announcement.body}</p>
{pageData.announcements.link?
 <p announcement-footer><Link to={announcement.link}>Link</Link></p>
:
null}

</div>  
})}
</div>
:
null
}
</div>

{pageData.callsToAction?
<div id="callout-container">
{pageData.callsToAction.map(function(cta, index){
return <div id="callsToAction" className="callout left">
<div className="callout-top">
<div className="whistle"></div>
<h2 className="callout-title">{cta.title}</h2>
</div>

<p className="callout-body">{cta.body}</p>
{pageData.callsToAction.link?
<p className="callout-footer"><Link to={cta.link}>Link</Link></p>
:
null
}

</div>
})}

</div>
:
null

}

{pageData.notice?
<div id="notice">
{pageData.notice}
</div>
:
null

}








<div className="divider"></div>


  </React.Fragment>
)}/>


<Route path="/about" component={About}/>
<Route path="/register" component={Register}/>
<Route path="/login" component={LogIn}/>
<Route path="/contact" component={Contact}/>

<Route path="/users/profile" component={Profile}/>

<Route path="/users/register-player" component={RegisterPlayer}/>

</div>


<footer><Footer /></footer>
  
  </div>
  </Router>
  );

  }

  
}

export default App;
