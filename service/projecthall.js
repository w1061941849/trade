var httpUtil=require('../utils/http.js')
var async= require('async');
var appConfig=require('../appConfig.js');
var URL = require('url');
exports.showHtml = function (req, res, next) {    
    var cid = URL.parse(req.url, true).query.cid,
    	page=1;
	var resultData={}; 
	async.waterfall([
	    function (done) {
	    	var options={
		        "path":"projectlist/"+page+"?cid="+cid
		    }   
		    httpUtil.get(options,function(result,err){  
		        if(err){
		            done(err, null);
		        }else{ 
		        	resultData= result;
		            done(null, result);
		        }  
		    }) 
	    },
	    function (onearg, done) {   
	    	var arr=[];
	    	for(var i in onearg['data']){
	    		arr[i]= function(callback) {
	    			getUserInfo(onearg['data'][i],callback)
	    		}
	    	} 
	    	async.parallel(arr, 
			function(err, results) { 
				for(var i in resultData['data']){
					resultData['data'][i]['owner']=results[i]
				}
			    done(err, resultData) 
			}); 
	    }  
	],  
    function(err, results) {   
    	console.log(results)
    	res.render('projecthall',{"results":resultData}) 	
    });
 
}; 


exports.projectlist = function (req, res, next) { 
	console.log(req.originalUrl)
	var params={
		"cid":req.query.cid
	}
	console.log(params)
    var cid = URL.parse(req.url, true).query.cid,
    	page=1;
	var resultData={}; 
	 
 
}; 
function getUserInfo(params,callback){
	var path=params['owner'].replace(appConfig.config.proxy.replace,"") 
    var options={
        "path":path
    }  
    httpUtil.get(options,function(result,err){  
        if(err){
            callback(err, null);
        }else{   
            callback(null, result);
        }  
    })  
}