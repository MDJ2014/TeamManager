import React, {Component} from 'react';
import { Link } from 'react-router-dom';


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

    // onClick = {this.changeToAbout("About")}
 return (
  
 <div className={`callout ${'callout-' + this.props.size}`}>
 <div className="callout-top">
 <div className="whistle"><img src={this.props.setWhistle} /></div>
 <div className="callout-title"> <h2>{this.props.title}</h2></div>
 </div>
 <p className="callout-body">{this.props.body}</p>
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
