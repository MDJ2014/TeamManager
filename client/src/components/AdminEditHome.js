import React, {Component} from 'react';



class AdminEditHome extends Component{

    constructor(props){
        super(props);

        this.state={
            data: '',
            pageHeader: "",
            welcome:"",
            mainAnnouncementTitle:"",
            mainAnnouncementBody:"",
            mainAnnouncementLink:"",
            mainCalloutTitle:"",
            mainCalloutBody:"",
            mainCalloutLink:"",
            announcements:[],
            callOuts:[],
            notice:"",


            addCallout: false,
            editCallout: "",
            deleteCallout:false,
            
            calloutTitleEdit:"",
            calloutBodyEdit:"",
            calloutLinkEdit:"",


            headerSaved:false,
            errorMessage: "",
            headerSuccess: "",
            welcomeSuccess:"",
            mainAnnouncementSuccess:"",
            mainCalloutSuccess:"",
            
            announceTitle:"",
            announceBody:"",
            announceLink:"",

            announceAdd: false,
            announceEdit: "",
            deleteAnnouncement: false,  

            minorAnnouncementSuccess:""
            

            
        }


        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        //this.clickAnnouncementEdit = this.clickAnnouncementEdit.bind(this);
        this.calloutEdit = this.calloutEdit.bind(this);
        this.clickCalloutDelete = this.clickCalloutDelete.bind(this);
        this.addMinorCallout = this.addMinorCallout.bind(this);
        this.handleHeaderSubmit = this.handleHeaderSubmit.bind(this);
        this.setSuccessMessage = this.setSuccessMessage.bind(this);
        this.handleWelcomeSubmit = this.handleWelcomeSubmit.bind(this);
        this.setErrorMessage = this.setErrorMessage.bind(this);
        this.handleErrors=this.handleErrors.bind(this);
        this.handleMainAnnouncementSubmit = this.handleMainAnnouncementSubmit.bind(this);
        this.handleMainCalloutSubmit = this.handleMainCalloutSubmit.bind(this);
        this.handleAnnouncmentEdit = this.handleAnnouncmentEdit.bind(this);
        this.handleMinorAnnouncementSubmit = this.handleMinorAnnouncementSubmit.bind(this);
        this.addMinorAnnouncement = this.addMinorAnnouncement.bind(this);
        this.announcementDelete = this.announcementDelete.bind(this);
        this.handleAnnouncementDelete = this.handleAnnouncementDelete.bind(this);
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
          this.setState({data: receivedData, pageHeader:receivedData.header,mainAnnouncementTitle:receivedData.mainAnnouncement.title,
            welcome: receivedData.welcome, mainAnnouncementBody:receivedData.mainAnnouncement.body,
            mainAnnouncementLink: receivedData.mainAnnouncement.link,mainCalloutTitle:receivedData.mainCallOut.title,
            mainCalloutBody:receivedData.mainCallOut.body, mainCalloutLink:receivedData.mainCallOut.link, announcements:receivedData.announcements, callOuts:receivedData.callsToAction,notice:receivedData.notice
        });
        });
      }
      
    
    



    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
  
      this.setState({[name]: value});
    }

announcementDelete(item){
this.state.deleteAnnouncement ? this.setState({deleteAnnouncement: false}) : this.setState({deleteAnnouncement: item});
}
handleAnnouncementDelete(item){

}
calloutEdit(item){
//this.state.editCallout? this.setState({editCallout: false}) : this.setState({editCallout: item});


}



clickCalloutDelete(item){
    this.state.calloutDelete? this.setState({calloutDelete:false}) : this.setState({calloutDelete:item});
}

addMinorCallout(){

   this.setState({addCallout:true, editCallout:"", calloutTitleEdit:"", calloutBodyEdit:"", calloutLinkEdit:""});
}


 handleErrors(response) {
    if (!response.ok) {
      //  throw Error(response.statusText);
      this.setState({ errorMessage: 'Error' })
      .then(this.setErrorMessage());
   
    }
    return response;
}


setSuccessMessage(item){
       setTimeout(() => {
        this.setState({
            [item]: ''
        });
    }, 3000)
}

setErrorMessage(){
    setTimeout(() => {
     this.setState({
         errorMessage: ''
     });
 }, 3000)
}







    handleHeaderSubmit= async(event)=>{
        event.preventDefault();

        const body = JSON.stringify({
            id: this.state.data._id,
            header: this.state.pageHeader
        });

        const headers = {'content-type': 'application/json', accept: 'application/json'};

        await fetch('/home/header/edit',{method: 'PUT', headers, body})
        .then((res)=>this.setState({headerSuccess:res}))
        .then(this.setSuccessMessage('headerSuccess'))
         .catch(function(response){
         this.setState({errorMessage: response.message})
        }).then(this.setErrorMessage())
    }


    handleWelcomeSubmit= async(event)=>{
        event.preventDefault();

        const body = JSON.stringify({
           id: this.state.data._id,
            welcome: this.state.welcome
        });

        const headers = {'content-type': 'application/json', accept: 'application/json'};

        await fetch('/home/welcome/edit',{method: 'PUT', headers, body})
        .then(this.handleErrors)
        .then((res)=>this.setState({welcomeSuccess:res}))
        .then(this.setSuccessMessage('welcomeSuccess'))  
         .catch(function(res){
           
        })
    }


    handleMainAnnouncementSubmit= async(event)=>{
        event.preventDefault();

        const body = JSON.stringify({
           id: this.state.data._id,
         mainAnnouncement:{
             title: this.state.mainAnnouncementTitle,
             body: this.state.mainAnnouncementBody,
             link: this.state.mainAnnouncementLink
         }
        });

        const headers = {'content-type': 'application/json', accept: 'application/json'};

        await fetch('/home/main-announcement/edit',{method: 'PUT', headers, body})
        .then(this.handleErrors)
        .then((res)=>this.setState({mainAnnouncementSuccess:res}))
        .then(this.setSuccessMessage('mainAnnouncementSuccess'))  
         .catch(function(res){
           
        })
    }





    handleMainCalloutSubmit= async(event)=>{
        event.preventDefault();

        const body = JSON.stringify({
           id: this.state.data._id,
           mainCallOut:{
             title: this.state.mainCalloutTitle,
             body: this.state.mainCalloutBody,
             link: this.state.mainCalloutLink
         }
        });

        const headers = {'content-type': 'application/json', accept: 'application/json'};

        await fetch('/home/main-callout/edit',{method: 'PUT', headers, body})
        .then(this.handleErrors)
        .then((res)=>this.setState({mainCalloutSuccess:res}))
        .then(this.setSuccessMessage('mainCalloutSuccess'))  
         .catch(function(res){
           
        })
    }

   
    handleAnnouncmentEdit(item){

this.setState({


    announceAdd:false,
    announceEdit: item._id,
    announceTitle: item.title,
    announceBody:item.body,
    announceLink: item.link

})

    }

    
handleCalloutsEdit(item){
    this.setState({
        addCallout:false,
editCallout: item._id,
calloutTitleEdit: item.title,
    calloutBodyEdit: item.body,
    calloutLinkEdit: item.link

    });
    
}

    addMinorAnnouncement(){

        this.setState({announceAdd:true, announceEdit:"",announceTitle:"",announceBody:"",announceLink:""});
    }


    handleMinorAnnouncementSubmit= async(event)=>{
        event.preventDefault();
        let route="";

        if(this.state.announceAdd){
route = '/home/announcements/add'
        }else{
route='/home/announcements/edit';
        }

        const body = JSON.stringify({
            id: this.state.data._id,
          announcements:{
              title: this.state.announceTitle,
              body: this.state.announceBody,
              link: this.state.announceLink
          }
         });

         const headers = {'content-type': 'application/json', accept: 'application/json'};

         await fetch(route,{method: 'PUT', headers, body})
         .then(this.handleErrors)
         .then((res)=>this.setState({minorAnnouncementSuccess:res}))
         .then(this.setSuccessMessage('minorAnnouncementSuccess'))  
          .catch(function(res){
            
         })

    }











    render(){

        const homePageData = this.state.data;
     
return(

    <div id="adminEditHomeContainer">
    <div id="adminEditHomeHeader">
    <h2>Home Page Edit</h2>
    <h6>Sections are in the order they appear on the home page.</h6>
    </div>


    <div className="adminEditHomeSection">
    <div className="homeSectionTitle"><h3>Welcome</h3></div>
    <div className="homeSectionBody">
    <form id="adminEditHomeWelcomeForm"   onSubmit={this.handleWelcomeSubmit}>
        <textarea id="homeHeaderInput"type="textarea" name="welcome"value={this.state.welcome} onChange={this.handleChange} placeholder="Enter page header message" rows="15" cols="150">
        </textarea>
        <div className="adminHomeBtnContainer">
        <button className="sectionButton" type="submit">
           Save
         </button>
        </div>
        {this.state.welcomeSuccess?
        <h6>Welcome Saved!</h6>
    :
    this.state.errorMessage?
    <h6>Error: Item not saved!</h6>
    :
    null
    }
    </form>
    </div>
        <div className="adminSpacer"></div>
    </div>
    
    <div className="adminEditHomeSection">
    <div className="homeSectionTitle"><h3>Header</h3></div>
    <div className="homeSectionBody">
    <form id="adminEditHomeWelcomeForm" onSubmit={this.handleHeaderSubmit}>
        <textarea id="homewelcomeInput"type="textarea" name="pageHeader"value={this.state.pageHeader} onChange={this.handleChange} placeholder="Enter welcome message"rows="15" cols="150">
        </textarea>
        <div className="adminHomeBtnContainer">
        <button className="sectionButton" type="submit">
           Save
         </button>
        </div>
    </form>
    {this.state.headerSuccess?
<h6>Header Saved!</h6>
  :this.state.errorMessage?
  <h6>Error: Item not saved!</h6>
  
        :null}
    </div>
    <div className="adminSpacer"></div>
    </div>



    <div className="adminEditHomeSection">
    <div className="homeSectionTitle"><h3>Main Announcement</h3></div>
    <div className="homeSectionBody">
    <form id="adminEditHomeMainAnnouncementForm" onSubmit={this.handleMainAnnouncementSubmit}>
    <div>
    <h6>Title</h6>
    <input className="adminInput titleInput" type="text" name="mainAnnouncementTitle"value={this.state.mainAnnouncementTitle} placeholder="Enter title"onChange={this.handleChange} />
    </div>
    <div className="spacer"></div>
    <h6>Announcement Body</h6>
        <textarea id="mainAnnouncementBody"type="textarea" name="mainAnnouncementBody"value={this.state.mainAnnouncementBody} onChange={this.handleChange} placeholder="Enter message" rows="15" cols="150">
        </textarea>
        <div className="spacer"></div>  
        <h6>Link</h6>
    <input className="adminInput" type="text" name="mainAnnouncementLink"value={this.state.mainAnnouncementLink} onChange={this.handleChange} placeholder="Link"/>
    <div className="spacer"></div>
        <div className="adminHomeBtnContainer">
        <button className="sectionButton" type="submit">
           Save
         </button>
        </div>
        {this.state.mainAnnouncementSuccess?
<h6>Announcement Saved!</h6>
  :this.state.errorMessage?
  <h6>Error: Item not saved!</h6>
  
        :null}


    </form>
    </div>
    <div className="adminSpacer"></div>
    </div>








    <div className="adminEditHomeSection">
    <div className="homeSectionTitle"><h3>Main Callout</h3></div>
    <div className="homeSectionBody">
    <form id="adminEditHomeMainCalloutForm" onSubmit={this.handleMainCalloutSubmit}>
    <div>
    <h6>Title</h6>
    <input className="adminInput" type="text" name="mainCalloutTitle"value={this.state.mainCalloutTitle} onChange={this.handleChange} placeholder="Enter Title"/>
    </div>
    <div className="spacer"></div>
    <h6>Callout Body</h6>
        <textarea id="homewelcomeInput"type="textarea" name="mainCalloutBody"value={this.state.mainCalloutBody} onChange={this.handleChange} placeholder="Enter message"rows="15" cols="150">
        </textarea>
        <div className="spacer"></div>  
        <h6>Link</h6>
    <input className="adminInput" type="text" name="mainCalloutLink"value={this.state.mainCalloutLink} onChange={this.handleChange} placeholder="Enter Link"/>
    <div className="spacer"></div>
        <div className="adminHomeBtnContainer">
        <button className="sectionButton" type="submit">
           Save
         </button>
        </div>
        {this.state.mainCalloutSuccess?
<h6>Callout Saved!</h6>
  :this.state.errorMessage?
  <h6>Error: Item not saved!</h6>
  
        :null}
    </form>
    </div>
    <div className="adminSpacer"></div>
    </div>








    <div className="adminEditHomeSection">
    <div className="homeSectionTitle"><h3>Announcements</h3></div>
    <div className="homeSectionBody" id="announcements">

    <div id="announcementsList">
    <h5>Announcements</h5>

    <div id="announcementsContainer">
{this.state.announcements.map(function(announcement){
return <div className="listRow" key={announcement._id}> <div className="announcementTitle">{announcement.title}</div> 
<div className="editBtnContainer">
     <button className="adminEditButton" type="button" 
onClick={()=>this.handleAnnouncmentEdit(announcement)}>
       Edit
     </button>
 <button id="announcemnetsDelBtn"className="adminEditButton deleteBtn" type="button" onClick={()=>this.announcementDelete(announcement._id)}>
               Del  
               </button>

    </div> 
   
   

            {this.state.deleteAnnouncement===announcement._id? 
        <h6 id="deleteWarningMessage">Are you sure you want to delete this announcement?</h6>
    
        :null}
        {this.state.deleteAnnouncement===announcement._id?
        <div id="deleteConfirmationBtns" className="editBtnContainer">
     <button className="adminEditButton cancelBtn"  type="button" 
onClick={this.announcementDelete}>
       Cancel
     </button>
 <button id="announcemnetsDelBtn"className="adminEditButton deleteBtn cancelBtn" type="button" onClick={()=>this.handleAnnouncementDelete(announcement._id)}>
               Delete  
               </button>

    </div> 
    :null}
    
  
    





    </div>




},this)}

</div>

  

        <button className="sectionButton" type="submit" onClick={this.addMinorAnnouncement}>
           Add
         </button>

    </div>




    <div id="announcementEdit">
    {this.state.announceAdd? 
    <h5>Add New Announcement</h5>
    :
    <h5>Edit Announcement</h5>
    }
    
    <div id="announceEdit">

    <form id="adminEditHomeAnnouncementsForm" onSubmit={this.handleMinorAnnouncementSubmit}>
    <div>
<h6>Title</h6>
<input className="adminInput" type="text" name="announceTitle"value={this.state.announceTitle} onChange={this.handleChange} placeholder="Enter a title"/>
</div>
<div className="spacer"></div>
<h6>Announcement Body</h6>
    <textarea id="homeAnnounceInput"type="textarea" name="announceBody"value={this.state.announceBody} onChange={this.handleChange} placeholder="Enter a message" rows="10" cols="70">
    </textarea>
    <div className="spacer"></div>  
    <h6>Link</h6>

<input className="adminInput" type="text" name="announceLink"value={this.state.announceLink} onChange={this.handleChange} placeholder="enter a link beginning with /"/>
<div className="spacer"></div>
    <div className="adminHomeBtnContainer">
    
    <button className="sectionButton" name="addBtn"type="submit">
    Save
  </button>
    
 
    </div>
{this.state.minorAnnouncementSuccess?

<h6>Announcement Saved!</h6>
  :this.state.errorMessage?
  <h6>Error: Item not saved!</h6>
  
        :null}

    </form>
    </div>

    </div>

    </div>
    <div className="adminSpacer"></div>
    </div>







    <div className="adminEditHomeSection">
    <div className="homeSectionTitle"><h3>Call Outs</h3></div>
    <div className="homeSectionBody" id="callsToAction">

    <div id="callOutList">
   

<div>
<h5>Calls To Action</h5>

 <div id="calloutsContainer">
{this.state.callOuts.map(function(callout){
    return(
        <div>
          
       
     <div id="calloutListRow" className="listRow" key={callout._id}> 

     <div id="calloutsTitle">{callout.title}</div> 
        <div id="calloutBtnContainer"className="editBtnContainer">
             <button className="adminEditButton" type="button" onClick={()=>this.handleCalloutsEdit(callout)}>
               Edit
             </button>

                 <button className="adminEditButton deleteBtn" type="button" onClick={()=>this.clickCalloutDelete(callout._id)}>
               Del  
             </button>
                </div> 
               
                {this.state.calloutDelete === callout._id?
                <h6 id="confirmCalloutDelete">Are you sure you want to delete this call out?</h6>
:null}

  {this.state.calloutDelete === callout._id?
                <div id="calloutConfirmationBtns"className="editBtnContainer"> 
                 <button className="adminEditButton cancelBtn" id="calloutCancelDelete"type="button" onClick={()=>this.clickCalloutDelete()}>
               Cancel
             </button>
 <button className="adminEditButton deleteBtn" id="callOutConfirmDelete"type="button" onClick={()=>this.clickCalloutDelete(callout._id)}>
               Delete  
             </button>

                </div> 
:null}




            </div>
          
            
            
          
            </div>
            
            
    );
    
    },this)}
</div>

</div>


    

        <button className="sectionButton" type="button" onClick={this.addMinorCallout}>
           Add
         </button>

    </div>

    


  <div id="callOutEdit">
{this.state.editCallout? 
    <h5>Edit Callout</h5>
    :
    <h5>Add New Callout</h5>
    }
    
    <div>
    <form id="adminEditCalloutForm">
    <div>
<h6>Title</h6>
<input className="adminInput" type="text" name="calloutTitleEdit"value={this.state.calloutTitleEdit} onChange={this.handleChange} placeholder="Title"/>
</div>
<div className="spacer"></div>
<h6>Call Out Body</h6>
    <textarea id="homeAnnouncementInput"type="textarea" name="calloutBodyEdit"value={this.state.calloutBodyEdit} onChange={this.handleChange} placeholder="placeholder" rows="10" cols="70">
    </textarea>
    <div className="spacer"></div>  
    <h6>Link</h6>
<input className="adminInput" type="text" name="calloutLinkEdit"value={this.state.calloutLinkEdit} onChange={this.handleChange} placeholder="placeholder"/>
<div className="spacer"></div>
    <div className="adminHomeBtnContainer">
    <button className="sectionButton" type="submit">
       Save
     </button>
    </div>

    </form>
    </div>

    </div>






    </div>
    <div className="adminSpacer"></div>
    </div>








    <div className="adminEditHomeSection">
    <div className="homeSectionTitle"><h3>Notice</h3></div>
    <div className="homeSectionBody">
    <form id="adminEditNoticeForm">
        <textarea id="noticeInput"type="textarea" name="notice"value={this.state.notice} onChange={this.handleChange} placeholder="Enter notice"rows="15" cols="150">
        </textarea>
        <div className="adminHomeBtnContainer">
        <button className="sectionButton" type="submit">
           Save
         </button>
        </div>
    </form>
    </div>
    <div className="adminSpacer"></div>
    </div>




















    </div>

);

    }





}


export default AdminEditHome;