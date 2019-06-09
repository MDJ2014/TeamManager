import React, {Component} from 'react';





class PrivacyStatement extends Component{
    constructor(props){
        super(props);
      
     this.state = {
       privacyStatement: "",
      
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
          this.setState({privacyStatement: receivedData.privacy});
        });
      }
      













render(){   
return(
    <React.Fragment>
        <div id="privacyContainer">
       <h2>Privacy Statement</h2>
       {this.state.privacyStatement?
       <div>

{this.state.privacyStatement}

       </div>

    :null}
       
     </div>
    </React.Fragment>
);

}
}

export default PrivacyStatement;