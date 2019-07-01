import React, {Component} from 'react';





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
          const receivedData = res;
          this.setState({license: receivedData.license});
        });
      }
      













render(){   
return(
    <React.Fragment>
        <div id="licenseOuterContainer">
       <h2>License Agreement</h2>
       {this.state.license?
       <div  id="licenseContainer">

{this.state.license}

       </div>

    :null}
       
     </div>
    </React.Fragment>
);

}
}

export default LicenseAgreement;