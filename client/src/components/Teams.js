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
  
  <div className="bar2">
  <div className="outer2">
<div className="mid2">Our Teams</div>
  <div id="left"className="skewed2 bars" ></div>
  <div className="skewed2 radial2 bars"></div>
  <div className="skewed2 right2 bars"></div>
  </div>
</div>

















  <div id="allTeamsBody">
   <div className="bar2">
  <div className="outer2">
<div className="mid2">Six Year Olds</div>
  <div id="left"className="skewed2 bars" ></div>
  <div className="skewed2 radial2 bars"></div>
  <div className="skewed2 right2 bars"></div>
  </div>
</div>
  <div id="sixYearOlds" className="singleTeamContainer">

 
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

  <div className="bar2">
  <div className="outer2">
<div className="mid2">Seven Year Olds</div>
  <div id="left"className="skewed2 bars" ></div>
  <div className="skewed2 radial2 bars"></div>
  <div className="skewed2 right2 bars"></div>
  </div>
</div>
  <div id="sevenYearOlds" className="singleTeamContainer">

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
  <div className="bar2">
  <div className="outer2">
<div className="mid2">Eight Year Olds</div>
  <div id="left"className="skewed2 bars" ></div>
  <div className="skewed2 radial2 bars"></div>
  <div className="skewed2 right2 bars"></div>
  </div>
</div>
  <div id="eightYearOlds" className="singleTeamContainer">

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
 <div className="bar2">
  <div className="outer2">
<div className="mid2">Nine Year Olds</div>
  <div id="left"className="skewed2 bars" ></div>
  <div className="skewed2 radial2 bars"></div>
  <div className="skewed2 right2 bars"></div>
  </div>
</div>
  <div id="nineYearOlds" className="singleTeamContainer">

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
  <div className="bar2">
  <div className="outer2">
<div className="mid2">Ten Year Olds</div>
  <div id="left"className="skewed2 bars" ></div>
  <div className="skewed2 radial2 bars"></div>
  <div className="skewed2 right2 bars"></div>
  </div>
</div>
  <div id="tenYearOlds" className="singleTeamContainer">

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
  <div className="bar2">
  <div className="outer2">
<div className="mid2">Eleven Year Olds</div>
  <div id="left"className="skewed2 bars" ></div>
  <div className="skewed2 radial2 bars"></div>
  <div className="skewed2 right2 bars"></div>
  </div>
</div>
  <div id="elevenYearOlds" className="singleTeamContainer">

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
  <div className="bar2">
  <div className="outer2">
<div className="mid2">Twelve Year Olds</div>
  <div id="left"className="skewed2 bars" ></div>
  <div className="skewed2 radial2 bars"></div>
  <div className="skewed2 right2 bars"></div>
  </div>
</div>
  <div id="twelveYearOlds" className="singleTeamContainer">

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