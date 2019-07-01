import React, {Component} from 'react';
import { Link } from 'react-router-dom';
var Remarkable = require('remarkable');




var md = new Remarkable({
  html:         true,        // Enable HTML tags in source
  xhtmlOut:     true,        // Use '/' to close single tags (<br />)
  breaks:       true,        // Convert '\n' in paragraphs into <br>
})

class Callout extends Component {
  constructor(props){
    super(props);
  
 this.state = {
     authenticated: false
    }
this.changeToAbout = this.changeToAbout.bind(this);
  }


changeToAbout(page){
this.props.onClick(page);
}
  render(){
    let markdownBody = md.render(this.props.body);
    // onClick = {this.changeToAbout("About")}
 return (
  
 <div className={`callout ${'callout-' + this.props.size}`}>
 <div className="callout-top">
 <div className="whistle"><img src={this.props.setWhistle} /></div>
 <div className="callout-title"> <h2>{this.props.title}</h2></div>
 </div>
 <p className="callout-body" dangerouslySetInnerHTML={{ __html: markdownBody }}></p>
 {this.props.link?
 <p className="callout-footer">
      <Link className="link" to={this.props.link}>Link</Link>
     </p>
   :
   null
    
 
}
 </div>
  );

  }

  
}

export default Callout;
