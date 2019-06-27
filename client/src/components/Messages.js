import React, {Component} from 'react';
import EditMessage from '../components/EditMessage';

class Messages extends Component{
    constructor(props){
        super(props);
      
        this.state = {
            messageData:"",
           editMessage: false,
           newMessage: false,
           messageStatus: null,
           deleteMessage:false,
           messageToEdit:""
        }
   
         this.clickNewMessage = this.clickNewMessage.bind(this);
         this.clickEditMessage = this.clickEditMessage.bind(this);
         this.processMessage= this.processMessage.bind(this);
         this.deleteMessage = this.deleteMessage.bind(this);
         this.componentRerender = this.componentRerender.bind(this);
    }



    getResponse = async()=>{
        const response = await fetch('/messages/universal',{method:'GET', headers:{'Content-Type': 'application/json'}
      
      });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body; 
      }
      
      componentDidMount(){
        this.getResponse()
        .then(res => {
          const receivedData = res;
          if(receivedData){
            this.setState({messageData:receivedData},()=>console.log(this.state.messageData));
          }else{
             this.setState({messageData: ""}); 
          }
          
        });
      }



      componentRerender(){
        this.getResponse()
        .then(res => {
          const receivedData = res;
          if(receivedData){
            this.setState({messageData:receivedData},()=>console.log(this.state.messageData));
          }else{
             this.setState({messageData: ""}); 
          }
          
        });
    }






clickEditMessage(){
    this.state.editMessage ? this.setState({editMessage: false}) : this.setState({editMessage:true});
}
clickNewMessage(){
    this.state.newMessage ? this.setState({newMessage: false}) : this.setState({newMessage:true});
}

processMessage(type,msg){
    if(type === 'new'){
this.setState({messageStatus:'new', messageToEdit:""})
    }else if(type === 'edit'){
this.setState({messageStatus: 'edit',messageToEdit:msg})
    }else{
        this.setState({messageStatus:null, messageToEdit:""})
    }
    
}


deleteMessage(msg){
this.state.deleteMessage? this.setState({deleteMessage:false}) : this.setState({deleteMessage:true});
}




    render(){

        return(

            <div id="messageEditContainer"className="adminEditHomeSection">
            <div className="homeSectionTitle"><h3>Messages</h3></div>
            <h6>Messages to appear on every team's page</h6>
            <div className="homeSectionBody">
             <div id="messageContainer">
             
         
<table id="messageTable" className="systemTable">
<thead>
<tr>
<th>Author</th>
<th>Title</th>
<th>Date</th>
<th></th>
<th></th>
</tr>
</thead>


{this.state.messageData? 
<tbody>


{this.state.messageData.map(function(message){
    const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };
    var cdate = (new Date(message.datePosted)).toLocaleString('en-US',DATE_OPTIONS);

return <tr  key={message._id}>
<td>{message.author}</td>
<td>{message.title}</td>
<td>{cdate}</td>
<td>
<button  className="adminEditButton cancelBtn" id="editBtn"type="button" onClick={()=>this.processMessage('edit',message)}>
             Edit
           </button> 
</td>
<td>
<button  className="adminEditButton deleteBtn" id="deleteBtn"type="button" onClick={this.deleteMessage}>
             Del
           </button> 
</td>
</tr>
},this)}



</tbody>
: null}
</table>


    
             </div>   


{this.state.deleteMessage? 
  
 
    <div className="deleteWarning" id="messageDeleteWarning"><h6>Are you sure you want to delete this message? </h6>
    <div id="msgDelCancelBtn">
    <button className="adminEditGameButton" id="msgDelCancelBtn"type="button" onClick={this.deleteMessage}>
               Cancel
             </button>
     </div>      
     <div id="commitPlayerDelBtn">
      <button className="adminEditGameButton" id="commitDeleteMessageBtn"type="button" >
               Delete
             </button> 
     </div>  
    </div>
  
    
    
    :
  
  
  null
  
  }






{this.state.messageStatus === 'new' || this.state.messageStatus==='edit'?

<button type="button" id="newMessageBtn" className="sectionButton" onClick={()=>this.processMessage('')}>
Cancel
</button>

:


<button type="button" id="newMessageBtn" className="sectionButton" onClick={()=>this.processMessage('new')}>
New Message
</button>

}
           
         <div className="space"></div>    


             {this.state.messageStatus != null ? 
   
   <div id="editMessageBody">
   {this.state.messageStatus === 'edit'?
   <h4>Edit Message</h4>
:
<h4>Add New Message</h4>

}
   
<EditMessage status={this.state.messageStatus} 
msgToEdit={this.state.messageToEdit}
 reRender={this.componentRerender}
reSet={()=>this.processMessage('')}
type={"universal"}
 />


 



   </div>
    : null}



            </div>
            </div>





        );






    }





}

export default Messages;

