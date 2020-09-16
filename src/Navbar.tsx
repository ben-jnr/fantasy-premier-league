import React from 'react';
import './Navbar.css';
import Hamburger from './Hamburger.svg';
import $ from 'jquery';

function Navbar() {

  const MenuOpenClose=()=>{
    if($('#Bar').css('left') === "0px") {
      $('#Bar').animate({
        left: '-' + $('#Bar').css('width')
      }, 200);
    }
    else {
      $('#Bar').animate({
        left: 0
      }, 200);
    } 
  }

  return <>
    <div id="Navbar">
        <button id="HamburgerButton">
          <img id="Hamburger" src={Hamburger} alt="" onClick={MenuOpenClose}/>
        </button>
        Fantasy Premier League
    </div>
  </>
}

export default Navbar;
