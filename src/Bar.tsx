import React from 'react';
import './Styles/Bar.css';
import $ from 'jquery';

function Bar() {

    const MenuClose=()=>{
        if($('#Bar').css('left') === "0px") {
          $('#Bar').animate({
            left: '-' + $('#Bar').css('width')
          }, 200);
        }
      }

    const showLeaderboard=()=>{
        $('#MatchesComponent').css('display','none');
        $('#ContendersComponent').css('display','none');
        $('#LeaderboardComponent').css('display','block');
        MenuClose();
    }
    const showMatches=()=>{
        $('#ContendersComponent').css('display','none');
        $('#LeaderboardComponent').css('display','none');
        $('#MatchesComponent').css('display','block');
        MenuClose();
    }
    const showContenders=()=>{
        $('#MatchesComponent').css('display','none');
        $('#LeaderboardComponent').css('display','none');
        $('#ContendersComponent').css('display','block');
        MenuClose();
    }

    return<>
        <div id="Bar">
            <div className ="Options" id="LeaderboardOption" onClick={showLeaderboard}>
                Leaderboard
            </div>
            <div className ="Options" id="MatchesOption" onClick={showMatches}>
                Past Fixtures
            </div>
            <div className ="Options" id="ContendersOption" onClick={showContenders}>
                Contenders
            </div>
        </div>
    </>
}

export default Bar;