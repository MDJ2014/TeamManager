import React, {Component} from 'react';
import EditMessage from '../components/EditMessage';
import Popup from 'reactjs-popup';

class Messages extends Component{
    constructor(props){
        super(props);
      
        this.state = {
            messageData:"",
           editMessage: false,
           newMessage: false,
           messageStatus: null,
           deleteMessage:false,
           deleteSuccess: false,
           messageToEdit:""
        }
   
         this.clickNewMessage = this.clickNewMessage.bind(this);
         this.clickEditMessage = this.clickEditMessage.bind(this);
         this.processMessage= this.processMessage.bind(this);
         this.handleDeleteMessage=this.handleDeleteMessage.bind(this);
         this.componentRerender = this.componentRerender.bind(this);
         this.setSuccessMessage = this.setSuccessMessage.bind(this);

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
            this.setState({messageData:receivedData});
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
            this.setState({messageData:receivedData});
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

setSuccessMessage(item){
  setTimeout(() => {
   this.setState({
       [item]: ''
   });
}, 1400)
}


deleteMessage(msg){
this.state.deleteMessage? this.setState({deleteMessage:false}) : this.setState({deleteMessage:true});
}


handleDeleteMessage = async(msg)=>{
  const body = JSON.stringify({
    messageId: msg,
 
  });
  const headers = {'content-type': 'application/json', accept: 'application/json'};
  
  await fetch('/messages/message',{method: 'DELETE', headers, body})
  .then((res)=>this.setState({deleteSuccess:true}))
 .then(this.setSuccessMessage("deleteSuccess"))
 .then(this.componentRerender())
  .catch(function(response){
    //this.setState({error:true, errmsg: error});
    //console.log(response.data)
  })

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
<Popup trigger={<button  className="adminEditButton deleteBtn">Del</button>} 
modal id="tmModal" item={message._id}>
    {close => (
      <div className="modal">
        <a className="close" onClick={close}>
        &times;
        </a>
        <div className="header">Delete message</div>
        <div className="content">
          {' '}
          Are you sure you want to delete {message.title}?
    
        </div>
        <div className="actions">
         
          <button
            className="sectionButton"
            onClick={() => {
              console.log('modal closed ')
              close()
            }}
          >
           Cancel
          </button>



          <button
            className="sectionButton popupDelBtn"
            
            onClick={() => {
              this.handleDeleteMessage(message._id);
              close();
            }}
          >
            Delete
          </button>



        </div>
      </div>
    )}
  </Popup>
</td>
</tr>
},this)}



</tbody>
: null}
</table>


    
             </div>   


{this.state.deleteSuccess? 
  
 <h6>Message Deleted</h6>    
    
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

