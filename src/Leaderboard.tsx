import React from 'react';
import './Leaderboard.css';

function Leaderboard(props:any){ 
    
    interface IStats {
        s:string,
        w:number,
        l:number,
        d:number,
        pts:number
    }

    interface Iteam {
        [key:string]: IStats
    };


    const IplTableContentFill = () =>{
        let body:any =[];
        let teams_object : Iteam = {
            'Royal Challengers Bangalore' : {s:"RCB",w:0,l:0,d:0,pts:0},
            'Chennai Super Kings' :{s:"CSK",w:0,l:0,d:0,pts:0},
            'Delhi Capitals' : {s:"DC",w:0,l:0,d:0,pts:0},
            'Kolkata Knight Riders' : {s:"KKR",w:0,l:0,d:0,pts:0},
            'Kings XI Punjab' : {s:"KXIP",w:0,l:0,d:0,pts:0},
            'Mumbai Indians' : {s:"MI",w:0,l:0,d:0,pts:0},
            'Rajasthan Royals' : {s:"RR",w:0,l:0,d:0,pts:0},
            'Sunrisers Hyderabad' : {s:"SRH",w:0,l:0,d:0,pts:0}
        }
        let winloss= props.data.winloss;
        if( winloss !== undefined) {
            let matches = props.data.matches;
            for(let i=0;i<winloss.length;i=i+2){
                if(winloss[i] === 1) {
                    teams_object[matches[i]].w += 1;
                    teams_object[matches[i+1]].l += 1;
                    teams_object[matches[i]].pts += 2;
                }
                else if(winloss[i+1] === 1) {
                    teams_object[matches[i+1]].w += 1;
                    teams_object[matches[i]].l += 1;
                    teams_object[matches[i+1]].pts += 2;
                }
                else {
                    teams_object[matches[i]].d += 1;
                    teams_object[matches[i+1]].d += 1;
                    teams_object[matches[i]].pts += 1;
                    teams_object[matches[i+1]].pts += 1;
                }
            }
            let teams = [teams_object["Royal Challengers Bangalore"], teams_object["Chennai Super Kings"],
                    teams_object["Delhi Capitals"], teams_object["Kolkata Knight Riders"], 
                    teams_object["Kings XI Punjab"], teams_object["Mumbai Indians"], 
                    teams_object["Rajasthan Royals"], teams_object["Sunrisers Hyderabad"]]
            teams = teams.sort(function(a:any,b:any) {
                return(b.pts-a.pts);
            });
            console.log(teams);
            for(let i=0;i<teams.length;i++){
                let alternate:string[] = ['first','second'];
                body.push(
                <tr className={alternate[i%2]} key={i.toString()}>
                    <td>{teams[i].s}</td>
                    <td>{teams[i].w}</td>
                    <td>{teams[i].l}</td>
                    <td>{teams[i].d}</td>
                    <td>{teams[i].pts}</td>
                </tr>
                )
            }
            return(body);
        }
        else {
            return(<tr key={"fetching"}>
                    <td>fetching data</td>
                </tr>
            );
        }
    }



    return<>
        <div id="Leaderboard">
            <div id="FantasyLeaderBoard">
                <div id="FantasyLeaderboardHeading">
                    Fantasy Leaderboard
                </div>
                <table id="FantasyLeaderboardTable">
                    <thead>
                        <tr id="FantasyLeaderboardTableHead">
                            <td>Player</td>
                            <td>3x</td>
                            <td>2x</td>
                            <td>1x</td>
                            <td>Pts</td>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
            <div id="IplLeaderboard">
                <div id="IplLeaderboardHeading">
                    IPL Leaderboard
                </div>
                <table id="IplLeaderboardTable">
                    <thead id="IplLeaderboardTableHead">
                        <tr>
                            <td>Team</td>
                            <td>W</td>
                            <td>L</td>
                            <td>D</td>
                            <td>Pts</td>
                        </tr>
                    </thead>
                    <tbody>
                        {IplTableContentFill()}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}

export default Leaderboard;