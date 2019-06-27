import React, {Component} from 'react';


class EditMessage extends Component{
    constructor(props){
        super(props);
      
        this.state = {
          editMessage: "",
          messageAuthor:"",
          messageTitle:"",
          messageBody:"",
          saveSuccess:false
        }
        
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.setSuccessMessage = this.setSuccessMessage.bind(this);


    }

    componentDidMount(){
      if(this.props.msgToEdit){
      this.setState({
       editMessage: this.props.msgToEdit._id,
       messageAuthor: this.props.msgToEdit.author,
       messageTitle: this.props.msgToEdit.title,
       messageBody: this.props.msgToEdit.body
       
     });
      }else{
        this.setState({

        });
      }
     
    }



    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
  
      this.setState({[name]: value});
    }

    handleSubmit= async(event)=>{
      event.preventDefault();
      
      var universalType= false;
      if(this.props.type ==="team"){
        universalType=false
      }else{
        universalType=true
      }
      const body = JSON.stringify({
        messageId: this.state.editMessage,
        message:{
        universal: universalType,
        author: this.state.messageAuthor,  
        title: this.state.messageTitle,  
        body:this.state.messageBody
      }
      });

      const headers = {'content-type': 'application/json', accept: 'application/json'};

      let route = "";

      if(this.props.status === "edit"){
route = "/messages/message"
      }else{
route = "/messages"

      }



      await fetch(route,{method: 'POST', headers, body})
      .then((res)=>this.setState({saveSuccess:res}))
      .then(this.setSuccessMessage('saveSuccess'))
      .then(this.props.reSet())
      .then(()=>this.props.reRender())
       .catch(function(response){
      // this.setState({errorMessage: response.message})
      })
    
  }



    setSuccessMessage(item){
      setTimeout(() => {
       this.setState({
           [item]: ''
       });
   }, 2000)
}





render(){
return(

<div id="adminAddMessage">
<div className="playerFormTop"></div>
<form id="messageForm" action="" onSubmit={this.handleSubmit}>

 <input className="playerInput" type="text" name="messageAuthor"value={this.state.messageAuthor} onChange={this.handleChange} placeholder="Author"/>
 <div className="space"></div>
 <input className="playerInput" type="text" name="messageTitle"value={this.state.messageTitle} onChange={this.handleChange} placeholder="Title"/>
 <div className="space"></div>

 <textarea type="text" id="messageTextArea" name="messageBody"value={this.state.messageBody} onChange={this.handleChange} placeholder="MessageBody"></textarea>

 
 <div className="space"></div>


 <button id="saveMessageButton" className="sectionButton" type="submit">
           Save
         </button>
    
</form>

{this.state.saveSuccess? <h6>Message saved</h6>: null}
</div>
);

}

}




export default EditMessage;