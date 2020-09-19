import React from 'react';
import './Styles/Contenders.css';
import players_list from './Players';

function Contenders(props:any) {
    
    const ContendersListFill = () =>{
        let body:any = [];
        for(let i=0;i<players_list.length;i++)
        {
            body.push(
                <span className="Contender">
                    <div className = "ContenderName">{players_list[i][0]}</div>
                    <div className = "ContenderTeam1">{players_list[i][1]}</div>
                    <div className = "ContenderTeam2">{players_list[i][2]}</div>
                    <div className = "ContenderTeam3">{players_list[i][3]}</div>
                </span>
            );
        }
        return body;
    }

    return<>
        <div id="Contenders">
            <div id="ContendersHeading">Contenders</div>
            <div id="ContendersContainer">
                {ContendersListFill()}
            </div>
        </div>
    </>
};

export default Contenders;