import React, {Component} from 'react';
import Popup from 'reactjs-popup';






class TeamMessages extends Component {
    constructor(props){
      super(props);
    
     this.state={
          team: "",
            messages:"",
            messageToEdit:false,
            deleteSuccess:false
     
               
      };


   this.handleDeleteFromTeam=this.handleDeleteFromTeam.bind(this);
   this.setSuccessMessage=this.setSuccessMessage.bind(this);
   this.componentReRender = this.componentReRender.bind(this);

    }


    getResponse = async()=>{
      const response = await fetch(`/messages/team/${this.props.teamId}`,{method:'GET', headers:{'Content-Type': 'application/json'}
    
    });
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body; 
    }








    componentDidMount(){

   this.componentReRender();
            
            }
        
          
  
        

       
        componentReRender(){
 
   
         this.getResponse() 
          .then(res => {
                  const receivedData = res;

                
                  if(receivedData){
                this.setState({messages:receivedData});
                  }else{
                    this.setState({messages: ""});
                  }

                         
                });
           
        }
        


        setSuccessMessage(item){
            setTimeout(() => {
             this.setState({
                 [item]: ''
             });
          }, 1200)
          }



        handleDeleteFromTeam = async(message)=>{
            const body = JSON.stringify({
                    messageId: message
            });
          
            const headers = {'content-type': 'application/json', accept: 'application/json'};
            
            await fetch('/messages/message',{method: 'DELETE', headers, body})
            .then((res)=>this.setState({deleteSuccess:true}))
           .then(this.setSuccessMessage("deleteSuccess"))
           .then(this.componentReRender())
            .catch(function(response){
              //this.setState({error:true, errmsg: error});
              //console.log(response.data)
            })
            
          
          }















    render(){
    
return(

<div>
<table className={"systemTable coachTable"}>
   <thead>
   <tr>
   <th className="tbleRow">Date Posted</th>
   <th className="tbleRow">Title</th>
   <th className="tbleRow">Author</th>
   <th></th>
   <th></th>
   </tr>
   </thead>

   {this.state.messages? 
   <tbody>


{this.state.messages.map(function(message){
    const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };
    var mdate = (new Date(message.datePosted)).toLocaleString('en-US',DATE_OPTIONS);





 return <tr key={message._id}>
<td>{mdate}</td>
<td>{message.title}</td>
<td>{message.author}</td>
<td>
<button className="adminEditButton" id="coachEditBtn"type="button" onClick={()=>this.props.editMessage( message)}>
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
        <div className="header">Remove player</div>
        <div className="content">
          {' '}
          Are you sure you want to remove {message.title}?
    
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
              this.handleDeleteFromTeam(message._id);
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
   :null}
   </table>
{this.state.deleteSuccess? <h6>Message deleted</h6>:null}
</div>





);


    }


}

export default TeamMessages;