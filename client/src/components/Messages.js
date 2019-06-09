import React, {Component} from 'react';


class Messages extends Component{
    constructor(props){
        super(props);
      
        this.state = {
           editMessage: false,
           newMessage: false,
           messageStatus: null
        }
        // this.clickDelete = this.clickDelete.bind(this);
        // this.clickEditGame = this.clickEditGame.bind(this);
        // this.clickAddGame = this.clickAddGame.bind(this);
        // this.clickAddPlayer = this.clickAddPlayer.bind(this);
         this.clickNewMessage = this.clickNewMessage.bind(this);
         this.clickEditMessage = this.clickEditMessage.bind(this);
         this.processMessage= this.processMessage.bind(this);
    }

clickEditMessage(){
    this.state.editMessage ? this.setState({editMessage: false}) : this.setState({editMessage:true});
}
clickNewMessage(){
    this.state.newMessage ? this.setState({newMessage: false}) : this.setState({newMessage:true});
}

processMessage(type){
    if(type === 'new'){
this.setState({messageStatus:'new'})
    }else if(type === 'edit'){
this.setState({messageStatus: 'edit'})
    }else{
        this.setState({messageStatus:null})
    }
    
}







    render(){

        return(

            <div id="messageEditContainer"className="adminEditHomeSection">
            <div className="homeSectionTitle"><h3>Messages</h3></div>
            <h6>Messages to appear on every team's page</h6>
            <div className="homeSectionBody">
             <div id="messageContainer">
             
             
             <table className="systemTable">
   <thead>
   <tr>
   <th className="tbleRow">Author</th>
   <th className="tbleRow">Title</th>
   <th className="tbleRow">Date</th>
   </tr>
   </thead>
   <tbody>
  <tr>
<td>Jake H.</td>
<td>Team Meeting</td>
<td>9/15/2019</td>
<td>
<button  className="adminEditButton cancelBtn" id="editBtn"type="button" onClick={()=>this.processMessage('edit')}>
             Edit
           </button> 
</td>
<td>
<button  className="adminEditButton deleteBtn" id="deleteBtn"type="button" onClick={()=>this.processMessage('edit')}>
             Del
           </button> 


</td>
  </tr>

   </tbody>
   </table>

    
             </div>   

             <button type="button" id="newMessageBtn" className="sectionButton" onClick={()=>this.processMessage('new')}>
           New Message
         </button>
         <div className="space"></div>    


             {this.state.messageStatus != null ? 
   
   <div id="editMessageBody">
   {this.state.messageStatus === 'edit'?
   <h4>Edit Message</h4>
:
<h4>Add New Message</h4>

}
   
        <form>
           
            <input className="registerInput" type="text" name="title" value={this.state.author} onChange={this.handleChange} placeholder="author"/>
            <div className="space"></div>
       <input className="registerInput" type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="title"/>
       <div className="space"></div>
       <textarea type="text" id="editMsgTextArea" name="body"value={this.state.messageBody} onChange={this.handleChange} placeholder="MessageBody"></textarea>


       {this.state.messageStatus === 'edit'?
   
    <button id="messageSaveBtn" className="sectionButton" type="submit">
          Save
         </button>
:
<button id="messageSaveBtn" className="sectionButton" type="submit">
Save
</button>

}


      
         <div className="space"></div>
       </form>
   </div>
    : null}



            </div>
            </div>





        );






    }





}

export default Messages;

