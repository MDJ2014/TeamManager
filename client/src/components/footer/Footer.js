import React, {Component} from 'react';
import './Footer.css';



class Footer extends Component {
//   constructor(props){
//     super(props);

//   }


 state = {
     authenticated: false
    }


/*
    getResponse = async() =>{
        const response = await fetch('/home');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body; 
      }

componentDidMount(){
  this.getResponse()
  .then(res => {
    const data = res;
    this.setState({renderedResponse: data});
  })
}
*/

  render(){
    

 return (

  <div id="footer">
   <ul>
   <li><a href="#">Privacy Statement</a></li>
     <li> <a href="#">Terms of Use</a></li>
     <li><a href="#">License Agreements</a></li>
     
     <li id="copy">Copyright {'\u00A9'}2019</li>
   </ul>
  </div>
  );

  }

  
}

export default Footer;
