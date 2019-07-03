import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Link } from 'react-router-dom';
  var Remarkable = require('remarkable');

  
 var md = new Remarkable({
    html:         true,        // Enable HTML tags in source
    xhtmlOut:     true,        // Use '/' to close single tags (<br />)
    breaks:       true,        // Convert '\n' in paragraphs into <br>
  })

class Announcement extends Component{
  constructor(props){
    super(props);
  
    this.state = {
      data: ''
     
    };
    // this.onClick = this.onClick.bind(this);
    // this.handleUpdate = this.handleUpdate.bind(this);
  }





 


  render(){
    let markdownBody = md.render(this.props.announcementBody);
  return (


   
     <div className="App" id="mainAnnouncements">
  <div className="announcement">
     <div className="announcement-top">
       <h2 className="announcement-title">{this.props.announcementTitle}</h2>
         </div>
     
     <p className="announcement-body" dangerouslySetInnerHTML={{ __html: markdownBody }}></p>
     <p className="announcement-footer">
     {this.props.announcementLink?
      <Link className="link" to ={this.props.announcementLink}>Link</Link>
     :
     null}
    
     </p>
      </div>
    </div>

  );
  }



}

export default Announcement;
