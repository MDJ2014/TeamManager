import React, {Component} from 'react';
import './AdminHome.css';


class AdminEditHome extends Component{

    constructor(props){
        super(props);

        this.state={

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }


    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
  
      this.setState({[name]: value});
    }

    handleSubmit(event){

    }




    render(){


return(

    <div id="adminEditHomeContainer">
    <div id="adminEditHomeHeader">
    <h2>Home Page Edit</h2>
    <h6>Sections are in the order they appear on the home page.</h6>
    </div>


    <div className="adminEditHomeSection">
    <div className="homeSectionTitle"><h3>Header</h3></div>
    <div className="homeSectionBody">
    <form id="adminEditHomeHeaderForm">
        <textarea id="homeHeaderInput"type="textarea" name="pageHeader"value={this.state.playerPositionPreference} onChange={this.handleChange} placeholder="placeholder" rows="15" cols="150">
        </textarea>
        <div className="adminHomeBtnContainer">
        <button className="adminHomeButton" type="submit">
           Save
         </button>
        </div>
    </form>
    </div>
    <div className="adminSpacer"></div>
    </div>
    
    <div className="adminEditHomeSection">
    <div className="homeSectionTitle"><h3>Welcome</h3></div>
    <div className="homeSectionBody">
    <form id="adminEditHomeWelcomeForm">
        <textarea id="homewelcomeInput"type="textarea" name="pageWelcome"value={this.state.playerPositionPreference} onChange={this.handleChange} placeholder="placeholder" rows="15" cols="150">
        </textarea>
        <div className="adminHomeBtnContainer">
        <button className="adminHomeButton" type="submit">
           Save
         </button>
        </div>
    </form>
    </div>
    <div className="adminSpacer"></div>
    </div>



    <div className="adminEditHomeSection">
    <div className="homeSectionTitle"><h3>Main Announcement</h3></div>
    <div className="homeSectionBody">
    <form id="adminEditHomeWelcomeForm">
    <div>
    <h6>Title</h6>
    <input className="adminInput" type="text" name="playerAge"value={this.state.playerAge} onChange={this.handleChange} placeholder="placeholder"/>
    </div>
    <div className="spacer"></div>
    <h6>Announcement Body</h6>
        <textarea id="homewelcomeInput"type="textarea" name="pageWelcome"value={this.state.playerPositionPreference} onChange={this.handleChange} placeholder="placeholder" rows="15" cols="150">
        </textarea>
        <div className="spacer"></div>  
        <h6>Link</h6>
    <input className="adminInput" type="text" name="playerAge"value={this.state.playerAge} onChange={this.handleChange} placeholder="placeholder"/>
    <div className="spacer"></div>
        <div className="adminHomeBtnContainer">
        <button className="adminHomeButton" type="submit">
           Save
         </button>
        </div>
    </form>
    </div>
    <div className="adminSpacer"></div>
    </div>






    <div className="adminEditHomeSection">
    <div className="homeSectionTitle"><h3>Announcements</h3></div>
    <div className="homeSectionBody" id="announcements">

    <div id="announcementsList">
    <h5>Announcements</h5>

    <div className="listRow"> <div>This week's practice</div> 
    <div className="editBtnContainer"> <button className="adminEditButton" type="submit">
           Edit
         </button>
        </div> 
        </div>
     

        <div className="listRow"> <div>Registration for the 2019 season to Begin</div> 
    <div className="editBtnContainer"> <button className="adminEditButton" type="submit">
           Edit
         </button>
        </div> 
        </div>

        <button className="adminAddButton" type="submit">
           Add
         </button>

    </div>


    <div id="announcementEdit">
    <h5>Edit Announcement</h5>
    <div id="announcementEdit">
    <form id="adminEditHomeAnnouncementForm">
    <div>
<h6>Title</h6>
<input className="adminInput" type="text" name="playerAge"value={this.state.playerAge} onChange={this.handleChange} placeholder="placeholder"/>
</div>
<div className="spacer"></div>
<h6>Announcement Body</h6>
    <textarea id="homeAnnouncementInput"type="textarea" name="pageAnnouncements"value={this.state.playerPositionPreference} onChange={this.handleChange} placeholder="placeholder" rows="10" cols="70">
    </textarea>
    <div className="spacer"></div>  
    <h6>Link</h6>
<input className="adminInput" type="text" name="playerAge"value={this.state.playerAge} onChange={this.handleChange} placeholder="placeholder"/>
<div className="spacer"></div>
    <div className="adminHomeBtnContainer">
    <button className="adminHomeButton" type="submit">
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
    <div className="homeSectionTitle"><h3>Main Announcement</h3></div>
    <div className="homeSectionBody">
    <form id="adminEditHomeMainCalloutForm">
    <div>
    <h6>Title</h6>
    <input className="adminInput" type="text" name="playerAge"value={this.state.playerAge} onChange={this.handleChange} placeholder="placeholder"/>
    </div>
    <div className="spacer"></div>
    <h6>Callout Body</h6>
        <textarea id="homewelcomeInput"type="textarea" name="pageWelcome"value={this.state.playerPositionPreference} onChange={this.handleChange} placeholder="placeholder" rows="15" cols="150">
        </textarea>
        <div className="spacer"></div>  
        <h6>Link</h6>
    <input className="adminInput" type="text" name="playerAge"value={this.state.playerAge} onChange={this.handleChange} placeholder="placeholder"/>
    <div className="spacer"></div>
        <div className="adminHomeBtnContainer">
        <button className="adminHomeButton" type="submit">
           Save
         </button>
        </div>
    </form>
    </div>
    <div className="adminSpacer"></div>
    </div>











    <div className="adminEditHomeSection">
    <div className="homeSectionTitle"><h3>Call Outs</h3></div>
    <div className="homeSectionBody" id="announcements">

    <div id="announcementsList">
    <h5>Call Outs</h5>

    <div className="listRow"> <div>This week's practice</div> 
    <div className="editBtnContainer"> <button className="adminEditButton" type="submit">
           Edit
         </button>
        </div> 
        </div>
     

        <div className="listRow"> <div>Registration for the 2019 season to Begin</div> 
    <div className="editBtnContainer"> <button className="adminEditButton" type="submit">
           Edit
         </button>
        </div> 
        </div>

        <button className="adminAddButton" type="submit">
           Add
         </button>

    </div>


    <div id="announcementEdit">
    <h5>Edit Call Out</h5>
    <div id="announcementEdit">
    <form id="adminEditHomeAnnouncementForm">
    <div>
<h6>Title</h6>
<input className="adminInput" type="text" name="playerAge"value={this.state.playerAge} onChange={this.handleChange} placeholder="placeholder"/>
</div>
<div className="spacer"></div>
<h6>Announcement Body</h6>
    <textarea id="homeAnnouncementInput"type="textarea" name="pageAnnouncements"value={this.state.playerPositionPreference} onChange={this.handleChange} placeholder="placeholder" rows="10" cols="70">
    </textarea>
    <div className="spacer"></div>  
    <h6>Link</h6>
<input className="adminInput" type="text" name="playerAge"value={this.state.playerAge} onChange={this.handleChange} placeholder="placeholder"/>
<div className="spacer"></div>
    <div className="adminHomeBtnContainer">
    <button className="adminHomeButton" type="submit">
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
    <form id="adminEditHomeWelcomeForm">
        <textarea id="homewelcomeInput"type="textarea" name="pageWelcome"value={this.state.playerPositionPreference} onChange={this.handleChange} placeholder="placeholder" rows="15" cols="150">
        </textarea>
        <div className="adminHomeBtnContainer">
        <button className="adminHomeButton" type="submit">
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