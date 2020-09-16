var express = require('express');
var cheerio = require('cheerio');
var axios = require('axios');
const cors = require('cors');
const path = require('path')
var app = express();
app.use(cors());


app.get('/fpl', function(req, res){
    	url = 'https://www.iplt20.com/matches/results/men/2019';
    	axios.get(url)
    	.then((a)=>{
                var $ = cheerio.load(a.data);
                let index = "";             
        let matches = [];
        let results = [];
        let info = [];
        let scores = [];
        let winloss = [];  
		let matches_html = $('.result__team-name');
		let results_html = $('.result__outcome');
		let info_html = $('.result__info');
		let scores_html = $('.result__score');
		for(let i=0; i < matches_html.length; i++) {
			index = i.toString();    			
        		matches.push(matches_html[index].children[0].data);
        		scores.push(scores_html[index].children[1].children[0].data
        				+ scores_html[index].children[2].data.trim() + " ("
        				+ scores_html[index].children[3].children[0].data.trim() + ")");
        		if(scores_html[index].attribs.class.trim().split(" ").length == 2)
        			winloss.push(1);
        		else
        			winloss.push(0);
        		if(i % 2 === 0) {
        			results.push(results_html[index].children[0].data.trim());
        			info.push(info_html[index].children[1].children[0].data + " : " 
        					+ info_html[index].children[2].data.trim());	
        		}	
        	}
        	res.send({
    			"matches":matches,
    			"results":results,
    			"info":info,
    			"scores":scores,
    			"winloss":winloss
    		});
        })
        .catch(()=>{
        	 console.log("Error, Match not found");
        	 res.send({
    			"matches":[],
    			"results":[],
    			"info":[],
    			"scores":[],
    			"winloss":[]
    		});
    	});
})


app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
