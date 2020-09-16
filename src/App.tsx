import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  
  useEffect(()=>{
    axios.get("http://localhost:5000")
    .then((res)=>console.log(res.data))
    .catch((err)=>console.log("error"));
  },[]);

  return (
    <div className="App">
     hello
    </div>
  );
}

export default App;
