import React, {Component} from 'react';



class Contact extends Component {

      constructor(props){
            super(props);
    
            this.state={
               
                    street:"",
                     city:"",
                     state:"",
                     zip:"",
                     phone:"",
                     email:"",
                    saveSuccess:"",
                    errorMessage:""
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
              if(receivedData.contact){
                this.setState({page: receivedData._id, street: receivedData.contact.street, city:receivedData.contact.city, state:receivedData.contact.state, zip: receivedData.contact.zip, phone: receivedData.contact.phone, email: receivedData.contact.email});
              }else{
                 this.setState({page: receivedData._id}); 
              }
              
            });
          }

render(){


  
      return(
          
 <div id="contactContainer">


<div id="contactViewContainer">
<div id="contactViewHeader">Contact</div>
<div id="contactViewBody">

<div>{this.state.street}</div>
<div><span>{this.state.city}</span><span>{this.state.state}</span><span>{this.state.zip}</span></div>
<div><span>{this.state.phone}</span></div>
<div>{this.state.email}</div>


</div>
</div>




</div>



      );
  
      }
}





  


export default Contact;
