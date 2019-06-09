import React, {Component} from 'react';





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
          const receivedData = res;
          this.setState({terms: receivedData.terms});
        });
      }
      













render(){   
return(
    <React.Fragment>
        <div id="termsContainer">
       <h2>Terms Of Use</h2>
       {this.state.terms?
       <div>

{this.state.terms}

       </div>

    :null}
       
     </div>
    </React.Fragment>
);

}
}

export default TermsOfUse;