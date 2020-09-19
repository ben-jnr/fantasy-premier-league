import React from 'react';
import './Styles/Matches.css';

function Matches(props:any) {

    interface Short {
        [key:string]:string
    };
    
    const ifwin=(res:number)=>{
        if(res === 1)
            return("Winning");
    }

    const MatchesTableContentFill=()=>{
        let body:any=[];
        let winloss = props.data.winloss;
        if( winloss !== undefined) {
            let matches = props.data.matches;
            let scores = props.data.scores;
            let info = props.data.info;
            let results = props.data.results;
            let ShortName:Short = {
                'Royal Challengers Bangalore' : 'RCB',
                'Chennai Super Kings' :'CSK',
                'Delhi Capitals' : "DC",
                'Kolkata Knight Riders' : "KKR",
                'Kings XI Punjab' : "KXIP",
                'Mumbai Indians' : "MI",
                'Rajasthan Royals' : "RR",
                'Sunrisers Hyderabad' : "SRH"
            }
            let alternate:string[] = ['FirstMatch','SecondMatch'];
            for(let i=0;i<info.length;i++){
                body.push(
                    <tr className = {'Match '+ alternate[i%2]} key={i.toString()}>
                        <td>
                            <div className={"MatchTeam1 " + ifwin(winloss[2*i])}>{ShortName[matches[2*i]]}</div>
                            <div className={"MatchTeam2 " + ifwin(winloss[2*i+1])}>{ShortName[matches[2*i+1]]}</div>
                        </td>
                        <td>
                            <div className={"MatchScore1 " + ifwin(winloss[2*i])}>{scores[2*i]}</div>
                            <div className={"MatchScore2 " +  ifwin(winloss[2*i+1])}>{scores[2*i+1]}</div>
                        </td>
                        <td><div className="MatchResult">{results[i]}</div></td>
                        <td><div className = "MatchInfo">{info[i]}</div></td>
                    </tr>
                );
            }
            return(body);
        }
        else{
            return(<tr key={"fetching"}>
                    <td>Loading</td>
                </tr>
            );
        }
    }


    return <>
        <div id="Matches">
            <div id="MatchesHeading">Matches</div>
            <table id="MatchesTable">
                <tbody>
                    {MatchesTableContentFill()}
                </tbody>
            </table>
        </div>    
    </>
};

export default Matches;