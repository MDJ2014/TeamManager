import React, {Component} from 'react';
import Slider from "react-slick";





class About extends Component{
    constructor(props){
        super(props);
      
     this.state = {
       about: "",
      
        }

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
          this.setState({about: receivedData.about});
        });
      }
      




render(){   

  const setings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    fade: true,
    adaptiveHeight:true,
    className: "center",
  
  };
  var settings = {
    dots: true,
    infinite: true,
    autoplay:true,
    fade: true,
    adaptiveHeight: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


return(
  <div id="aboutContainer">
  <h2>About</h2>
  <div id="slideContainer">
  <Slider {...settings}>
    <div>
      <img src={"/images/players.png"} />
      <p>Age Eight Games</p>
    </div>
    <div>
      <img src={"/images/team1two.png"} />
      <p>Age Twelve Teams</p>
    </div>
    <div>
      <img src={"/images/team2two.png"} />
      <p>Age Ten Cardinals</p>
    </div>
    <div>
      <img src={ "/images/team3two.png"} />
      <p>Age Eleven Pats and Chargers</p>
    </div>
    <div>
      <img src={ "/images/teamplaytwo.png"} />
      <p>Age Seven Teams</p>
    </div>


  </Slider>
  </div>


<div id="aboutStatement">
  <h3>“IT’S MORE THAN FOOTBALL”</h3>
  <h4 id="aboutStatementBody">
  {this.state.about}
  </h4>
</div>






</div>

);

}
}

export default About;