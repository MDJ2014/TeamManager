import React, {Component} from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';



class Schedule extends Component {
    constructor(props){
      super(props);
    
      this.state = {
            gameData:"",
            gameDelete:""
        

      
               
      };

this.componentReRender = this.componentReRender.bind(this);
this.handleGameDelete = this.handleGameDelete.bind(this);
    }

    componentDidMount(){
        this.componentReRender();
      }


 

      getResponse = async(teamId)=>{
        const response = await fetch(`/games/team/${teamId}`,{method:'GET', headers:{'Content-Type': 'application/json'}
      
      
      });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body; 
      }

     componentReRender(){
         var opponent="";


        this.getResponse(this.props.teamId)
        .then(res => {
          const receivedData = res;
                 this.setState({gameData: receivedData, opponent: opponent});
        });
      
  
     }

     handleGameDelete= async(item)=>{


      const body = JSON.stringify({
        gameId: item,
            
       });
    
       const headers = {'content-type': 'application/json', accept: 'application/json'};
    
       await fetch('/games/game',{method: 'DELETE', headers, body})
     
       .then((res)=>this.setState({gameDelete:"success"}))
       .then(this.setDeleteSuccess('gameDelete'))  
       .then(this.componentReRender())
        .catch(function(res){
          //
       })
    
    }

    setDeleteSuccess(item){
      setTimeout(() => {
          this.setState({
              [item]: ''
          });
      }, 2000)
    }



render(){

return(
  <div>
    <table id="gameTable" className="systemTable">
<thead>
<tr>
  <th>Date</th>
  <th>Opponent</th>
  <th>Location</th>
  <th>Home/Away</th>
  <th>Our Score</th>
  <th>Opp. Score</th>
  <th></th>
  <th></th>
</tr>
</thead>

{this.state.gameData? 
<tbody>

{this.state.gameData.map(function(game){
    const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };
    var gdate = (new Date(game.date)).toLocaleString('en-US',DATE_OPTIONS);

return <tr key={game._id}>
 <td>{gdate}</td> 
 <td>{game.awayTeam._id !==this.props.teamId? game.awayTeam.teamName:game.homeTeam.teamName}</td>
 <td>{game.location}</td>
 <td>{game.awayTeam._id===this.props.teamId? "Away": "Home"}</td>
 <td>{game.awayTeam._id===this.props.teamId? game.awayTeamScore: game.homeTeamScore} </td>
 <td>{game.awayTeam._id !==this.props.teamId? game.awayTeamScore:game.homeTeamScore}</td>

{this.props.edit===true? 
 <td>
   <button className="adminEditButton" id="gameEditBtn"type="button" onClick={()=>this.props.editGame(game)}>
           Edit
         </button>
</td>
: null}
{this.props.edit===true? 
 <td>
 <Popup trigger={<button  className="adminEditButton deleteBtn">Del</button>} 
modal id="delGameModal" item={game._id}>
    {close => (
      <div className="modal">
        <a className="close" onClick={close}>
        &times;
        </a>
        <div className="header">Delete Game</div>
        <div className="content">
          {' '}
          Are you sure you want to delete this game?
    
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
             this.handleGameDelete(game._id);
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
 : null}
</tr>
},this)}


</tbody>
:null}

</table>
{this.state.gameDelete === 'success'? <h6>Game deleted</h6>:null}
</div>
)



}




}
Schedule.propTypes = {

  teamId: PropTypes.string,
 
 };
export default Schedule;