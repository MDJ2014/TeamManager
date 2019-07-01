import React, {Component} from 'react';
var Remarkable = require('remarkable');




var md = new Remarkable({
  html:         true,        // Enable HTML tags in source
  xhtmlOut:     true,        // Use '/' to close single tags (<br />)
  breaks:       true,        // Convert '\n' in paragraphs into <br>
})




class TermsOfUse extends Component{
    constructor(props){
        super(props);
      
     this.state = {
       terms: "",
      
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

          let preFormatedData = res.terms;
          let receivedData = md.render(preFormatedData);
        
          this.setState({terms: receivedData});
        });
      }
      













render(){   
return(
    <React.Fragment>
        <div id="termsContainer">
       <h2>Terms Of Use</h2>
       {this.state.terms?
       <div className="innerContainer" dangerouslySetInnerHTML={{ __html: this.state.terms}}>


       </div>

    :null}
       
     </div>
    </React.Fragment>
);

}
}

export default TermsOfUse;