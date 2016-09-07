var httpUtil=require('../../utils/http.js')
var async= require('async');
var appConfig=require('../../appConfig.js');
var URL = require('url');
var underscore=require('underscore');
exports.showHtml = function (req, res, next) {   
	var resultData={};     
	async.waterfall([
	    function (done) {
	    	var options={
		        "path":'/'+req.query.projectid+"/projectversions"
		    }   
		    console.log(options)
		    httpUtil.get(options,function(result,err){  
		        if(err){
		            done(err, null);
		        }else{ 
		        	resultData= result;
		        	for(var i in result['data']){
		        		result['data'][i]['publishDate']=dateType(result['data'][i]['publishDate']) 
		        		
		        	} 
		        	var aaa=underscore.groupBy(result['data'],"publishDate")
		        	var bbb=underscore.toArray(aaa) 
		            done(null, bbb);
		        }  
		    }) 
	    } 
	],  
    function(err, results) {    
    	console.log("asdasd11111111111")
    	console.log(results)
    	res.render('userCenter/versions.html',{'results':results}) 	
    });  
   // res.render('userCenter/versions.html',{'results':resultData}) 	



};  
function dateType(date){
	var date=new Date(date);
	return date.toLocaleDateString();
}