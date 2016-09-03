var httpUtil=require('../utils/http.js')
var async= require('async');
var appConfig=require('../appConfig.js');
var URL = require('url');
exports.showHtml = function (req, res, next) {    
    var url=req.originalUrl;
    console.log(url)
	var resultData={}; 
	async.waterfall([
	    function (done) {
	    	var options={
		        "path":url
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
    	res.render('projectlist',{'results':resultData}) 	
    }); 
 
}; 


exports.projectlist = function (req, res, next) { 
	
	 
 
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