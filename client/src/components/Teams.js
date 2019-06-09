import React, {Component} from 'react';

import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';





class AllTeams extends Component {
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
  <div id="allTeamsContainer">
  
  <h2>Our 2019 Teams</h2>



  <div id="allTeamsBody">
  
  <div id="sixYearOlds" className="singleTeamContainer">

  <h3>Six Year Olds</h3>
<div className="teamGroupContainer">
  <div className="teamBody">
  <Link to="/">
      <div className="teamImgContainer">
  <div className="teamImg"></div>
  <div className="teamImgName">Vikings</div>
  </div>
 </Link>
   </div>

  <div className="teamBody">
  <Link to="/">
      <div className="teamImgContainer">
  <div className="teamImg"></div>
  <div className="teamImgName">Vikings</div>
  </div>
 </Link>
   </div>

   </div>
  </div>


  <div id="sevenYearOlds" className="singleTeamContainer">
  <h3>Seven Year Olds</h3>
  <div className="teamGroupContainer">
  <div className="teamBody">
  <Link to="/">
      <div className="teamImgContainer">
  <div className="teamImg"></div>
  <div className="teamImgName"></div>
  </div>
 </Link>
   </div>
   </div>
  </div>

  <div id="eightYearOlds" className="singleTeamContainer">
  <h3>Eight Year Olds</h3> 
  <div className="teamGroupContainer">
  <div className="teamBody">
  <Link to="/">
      <div className="teamImgContainer">
  <div className="teamImg"></div>
  <div className="teamImgName"></div>
  </div>
 </Link>
   </div>
   </div>
 </div>
  <div id="nineYearOlds" className="singleTeamContainer">
  <h3>Nine Year Olds</h3>
  <div className="teamGroupContainer">
  <div className="teamBody">
  <Link to="/">
      <div className="teamImgContainer">
  <div className="teamImg"></div>
  <div className="teamImgName"></div>
  </div>
 </Link>
   </div>
   </div>
  </div>
  <div id="tenYearOlds" className="singleTeamContainer">
  <h3>Ten Year Olds</h3>
  <div className="teamGroupContainer">
  <div className="teamBody">
  <Link to="/">
      <div className="teamImgContainer">
  <div className="teamImg"></div>
  <div className="teamImgName"></div>
  </div>
 </Link>
   </div>
   </div>
  </div>
  <div id="elevenYearOlds" className="singleTeamContainer">
  <h3>Eleven Year Olds</h3>
  <div className="teamGroupContainer">
  <div className="teamBody">
  <Link to="/">
      <div className="teamImgContainer">
  <div className="teamImg"></div>
  <div className="teamImgName"></div>
  </div>
 </Link>
   </div>
   </div>
  </div>
  <div id="twelveYearOlds" className="singleTeamContainer">
  <h3>Twelve Year Olds</h3>
  <div className="teamGroupContainer">
  <div className="teamBody">
  <Link to="/">
      <div className="teamImgContainer">
  <div className="teamImg"></div>
  <div className="teamImgName"></div>
  </div>
 </Link>
   </div>
   </div>
  </div>
  </div>
  
  </div>

          );

    }

}

export default AllTeams;