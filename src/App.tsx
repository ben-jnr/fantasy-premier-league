import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './Styles/App.css';
import Navbar from './Navbar';
import Leaderboard from './Leaderboard';
import Matches from './Matches';
import Contenders from './Contenders';
import Bar from './Bar';
import $ from 'jquery';

function App() {

  const [data,setData] = useState({});

  useEffect(()=>{
    axios.get("http://ec2-13-232-104-42.ap-south-1.compute.amazonaws.com/fpl")
    .then((res)=>{
	console.log(res.data);
      setData(res.data)
    })
    .catch((err)=>console.log("error"));
  },[]);

  const MenuClose=()=>{
    if($('#Bar').css('left') === "0px") {
      $('#Bar').animate({
        left: '-' + $('#Bar').css('width')
      }, 200);
    }
  }

  return (
    <div className="App">
      <div id="BarComponent">
        <Bar />
      </div>
      <div id="NavbarComponent">
          <Navbar />
      </div>
      <div id="LeaderboardComponent" onClick={MenuClose}>
        <Leaderboard data={data}/>
      </div>
      <div id="MatchesComponent" onClick = {MenuClose}>
        <Matches data={data}/>
      </div>
      <div id="ContendersComponent" onClick = {MenuClose}>
        <Contenders/>
      </div>
    </div>
  );
}

export default App;
