import React, {Component} from 'react';





class Team extends Component {
    constructor(props){
      super(props);
    
      this.state = {
        renderedResponse: '',
          
      };
    //   this.handleChange = this.handleChange.bind(this);
    //   this.handleSubmit = this.handleSubmit.bind(this);
    }


    getResponse = async()=>{
        const response = await fetch('/users/profile',{method:'GET', headers:{'Content-Type': 'application/json'}
      
      });
        const body = await response;
        if (response.status !== 200) 
        //throw Error(body.message);
        {
    
        } else{
           return body; 
        }
  
    
    
      }



      componentDidMount(){
 
        // fetch('/users/profile')
        // .then(data => data.json())
        // .then((data) => { 
        //   this.setState({ profileData: data }, ()=>console.log("data fetched...", data)) 
        // }); 
      
       }





// handleSubmit(event){


// }

    render(){
        


    
          return(
  <div id="teamContainer">
  <div id="teamHeader">
  <div id="teamPageName">Team name</div>
  <div id="teamPageLogo">
  <div id="teamPageHeaderLogo"></div>
  </div>
  <div id="teamPageCoaches">


  <div id="coachContainer">
   <div id="coachTitle">Head coach:</div>
  <div id="coachName">Tommy Tubervile</div>
  </div>

  <div id="coachContainer">
   <div id="coachTitle">Head coach:</div>
  <div id="coachName">Tommy Tubervile</div>
  </div>
  
  </div>
  </div>

  <div id="teamPageMessages">
  
  <div id="msgBody">
  <div id="msgTitle">Title</div>
  <div id="msgText">this is a message</div>
  
  </div>
  
  
  
  </div>

<div id="teamPageBody">
<div id="teamSchedule">


<div id="scheduleTitle">Schedule</div>

  
<table id="scheduleTable">
   <thead>
   <tr>
   <th>Date</th>
   <th>Opponent</th>
   <th>Location</th>
   <th>Home/Away</th>
   <th>Our Score</th>
   <th>Their Score</th>
   </tr>
   </thead>

   <tbody id="scheduleTableBody">



  <tr>
<td>9/20/2019</td>
<td>Raiders</td>
<td>City Park #3</td>
<td>Home</td>
<td>17</td>
<td>14</td>

</tr>


<tr>
<td>9/25/2019</td>
<td>Pats</td>
<td>City Park #1</td>
<td>Away</td>
<td></td>
<td></td>

</tr>



   </tbody>
   </table>











</div>
<div id="teamRoster">
<div id="rosterTitle">
Roster
</div>

<table id="rosterTable">
   <thead>
   <tr>
   <th>First name</th>
   <th>Last Name</th>
   <th>NicName</th>
   <th>Age</th>
   <th>Position</th>
   <th>Number</th>
   </tr>
   </thead>

   <tbody id="scheduleTableBody">



  <tr>
<td>Bucky</td>
<td>Radicadawski</td>
<td>BuckyRad</td>
<td>8</td>
<td>tackle</td>
<td>54</td>

</tr>




   </tbody>
   </table>









</div>
</div>


  </div>

          );

    }

}

export default Team;