import React, {Component} from 'react';





class About extends Component{
    constructor(props){
        super(props);
      
     this.state = {
       about: "",
      
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
          this.setState({about: receivedData.about});
        });
      }
      













render(){   
return(
    <React.Fragment>
        <div id="termsContainer">
       <h2>About</h2>
       {this.state.about?
       <div>

{this.state.about}

       </div>

    :null}
       
     </div>
    </React.Fragment>
);

}
}

export default About;