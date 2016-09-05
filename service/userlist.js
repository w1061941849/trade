var httpUtil=require('../utils/http.js')
var async= require('async');
var appConfig=require('../appConfig.js');
var URL = require('url');
exports.showHtml = function (req, res, next) {    
     var url=req.originalUrl;
    console.log(url)
	var resultData={};  
	var cid=req.query.cid ? req.query.cid : ""
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
	    	 var options={
		        "path":"/categorylist"
		    }  
		    httpUtil.get(options,function(result,err){  
		        if(err){
		            done(err, null);
		        }else{   
		        	resultData['categorylist']=result; 
		            done(null, onearg);
		        }  
		    })  
	    } , 
	    function (onearg, done) {   
	    	var arr=[]; 
	    	async.each(onearg['data'], function(obj, callback) {  
			    arr.push(function(callback) {
						getUserCategorys(obj,callback)
					}) 
			}, function(err) { 
			     
			}); 



	    	async.parallel(arr, 
			function(err, results) { 
				for(var i in resultData['data']){
					resultData['data'][i]['categorys']=results[i]
				}
			    done(err, resultData) 
			}); 
	    }  
	],  
    function(err, results) {   
    	resultData['activeCid']=cid;  
    	console.log(resultData)
    	res.render('userlist',{'results':resultData}) 	
    });   
}; 
function getUserCategorys(params,callback){
	var path=params['categorys'].replace(appConfig.config.proxy.replace,"") 
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