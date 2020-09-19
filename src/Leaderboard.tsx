import React, { useEffect, useState } from 'react';
import './Styles/Leaderboard.css';
import players_list from './Players';

function Leaderboard(props:any){ 
    
    const [teams, setTeams]:any = useState(0);

    interface IStats {
        s:string,
        p:number,
        w:number,
        l:number,
        d:number,
        pts:number
    }

    interface Iteam {
        [key:string]: IStats
    };


    useEffect(()=>{
        let teams_object : Iteam = {};
        let winloss = props.data.winloss;
        if( winloss !== undefined) {
            teams_object={
                'Royal Challengers Bangalore' : {s:"RCB",p:0,w:0,l:0,d:0,pts:0},
                'Chennai Super Kings' :{s:"CSK",p:0,w:0,l:0,d:0,pts:0},
                'Delhi Capitals' : {s:"DC",p:0,w:0,l:0,d:0,pts:0},
                'Kolkata Knight Riders' : {s:"KKR",p:0,w:0,l:0,d:0,pts:0},
                'Kings XI Punjab' : {s:"KXIP",p:0,w:0,l:0,d:0,pts:0},
                'Mumbai Indians' : {s:"MI",p:0,w:0,l:0,d:0,pts:0},
                'Rajasthan Royals' : {s:"RR",p:0,w:0,l:0,d:0,pts:0},
                'Sunrisers Hyderabad' : {s:"SRH",p:0,w:0,l:0,d:0,pts:0}
            }
            let matches = props.data.matches;
            for(let i=0;i<winloss.length;i=i+2){
                if(winloss[i] === 1) {
                    teams_object[matches[i]].w += 1;
                    teams_object[matches[i]].p += 1;
                    teams_object[matches[i+1]].p += 1;
                    teams_object[matches[i+1]].l += 1;
                    teams_object[matches[i]].pts += 2;
                }
                else if(winloss[i+1] === 1) {
                    teams_object[matches[i]].p += 1;
                    teams_object[matches[i+1]].p += 1;
                    teams_object[matches[i+1]].w += 1;
                    teams_object[matches[i]].l += 1;
                    teams_object[matches[i+1]].pts += 2;
                }
                else {
                    teams_object[matches[i]].p += 1;
                    teams_object[matches[i+1]].p += 1;
                    teams_object[matches[i]].d += 1;
                    teams_object[matches[i+1]].d += 1;
                    teams_object[matches[i]].pts += 1;
                    teams_object[matches[i+1]].pts += 1;
                }
            }
            setTeams(teams_object);
        }
    },[props]);

    
    const TeamTableContentFill = () =>{
        let body:any =[];
        if(teams !== 0) {
            let unsorted_teams = [teams["Royal Challengers Bangalore"],teams["Chennai Super Kings"],
                teams["Delhi Capitals"],teams["Kolkata Knight Riders"],
                teams["Kings XI Punjab"],teams["Mumbai Indians"],
                teams["Sunrisers Hyderabad"],teams["Rajasthan Royals"]];
            let sorted_teams = unsorted_teams.sort(function(a:any,b:any) {
                return(b.pts-a.pts);
            });
            for(let i=0;i<sorted_teams.length;i++){
                let alternate:string[] = ['first','second'];
                body.push(
                    <tr className={alternate[i%2]} key={i.toString()}>
                        <td>{sorted_teams[i].s}</td>
                        <td>{sorted_teams[i].p}</td>
                        <td>{sorted_teams[i].w}</td>
                        <td>{sorted_teams[i].l}</td>
                        <td>{sorted_teams[i].d}</td>
                        <td>{sorted_teams[i].pts}</td>
                    </tr>
                )
            }
            return(body);
        }
        else {
            return(<tr key={"fetching"}>
                    <td>Loading</td>
                </tr>
            );
        }
    }


    const FantasyTableContentFill = () =>{
        let body:any =[];
        if(teams !== 0) {
            let unsorted_fantasy = [];
            for(let i=0;i<players_list.length;i++) {
                unsorted_fantasy.push(
                    [players_list[i][0],teams[players_list[i][1]].w, teams[players_list[i][2]].w,
                    teams[players_list[i][3]].w, 
                    teams[players_list[i][1]].w*3 + teams[players_list[i][2]].w*2 + teams[players_list[i][3]].w*1]
                )
            }
            let sorted_fantasy = unsorted_fantasy.sort(function(a:any,b:any) {
                return(b[4]-a[4]);
            });
            for(let i=0;i<sorted_fantasy.length;i++){
                let alternate:string[] = ['first','second'];
                body.push(
                    <tr className={alternate[i%2]} key={i.toString()}>
                        <td>{sorted_fantasy[i][0]}</td>
                        <td>{sorted_fantasy[i][1]}</td>
                        <td>{sorted_fantasy[i][2]}</td>
                        <td>{sorted_fantasy[i][3]}</td>
                        <td>{sorted_fantasy[i][4]}</td>
                    </tr>
                )
            }
            return(body);
        }
        else {
            return(<tr key={"fetching"}>
                <td>Loading</td>
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
                        {FantasyTableContentFill()}
                    </tbody>
                </table>
            </div>
            <div id="TeamLeaderboard">
                <div id="TeamLeaderboardHeading">
                    Team Leaderboard
                </div>
                <table id="TeamLeaderboardTable">
                    <thead id="TeamLeaderboardTableHead">
                        <tr>
                            <td>Team</td>
                            <td>P</td>
                            <td>W</td>
                            <td>L</td>
                            <td>D</td>
                            <td>Pts</td>
                        </tr>
                    </thead>
                    <tbody>
                        {TeamTableContentFill()}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}

export default Leaderboard;