import React, {Component} from 'react';
var Remarkable = require('remarkable');




var md = new Remarkable({
  html:         true,        // Enable HTML tags in source
  xhtmlOut:     true,        // Use '/' to close single tags (<br />)
  breaks:       true,        // Convert '\n' in paragraphs into <br>
})


class LicenseAgreement extends Component{
    constructor(props){
        super(props);
      
     this.state = {
        license: "",
       
      
        }

      }
    

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

          let preFormatedData = res.license;
         
        let receivedData = md.render(preFormatedData);
         this.setState({license: receivedData});
        });
      }
      












render(){   

return(
    <React.Fragment>
        <div id="licenseOuterContainer">
     <h2>License Agreement</h2>
       {this.state.license?
       <div  className="innerContainer"  dangerouslySetInnerHTML={{ __html: this.state.license }}>



       </div>

    :null}
       
     </div>
    </React.Fragment>
);

}
}

export default LicenseAgreement;