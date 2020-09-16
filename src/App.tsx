import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './Navbar';
import Leaderboard from './Leaderboard';
import Bar from './Bar';
import $ from 'jquery';

function App() {

  const [data,setData] = useState({});

  useEffect(()=>{
    axios.get("/fpl")
    .then((res)=>{
      setData(res.data);
    })
    .catch((err)=>console.log("error"));
  },[]);

  const MenuOpenClose=()=>{
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
      <div id="LeaderboardComponent" onClick={MenuOpenClose}>
        <Leaderboard data={data}/>
      </div>
    </div>
  );
}

export default App;
