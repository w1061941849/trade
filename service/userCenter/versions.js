var httpUtil=require('../../utils/http.js')
var async= require('async');
var appConfig=require('../../appConfig.js');
var URL = require('url');
var underscore=require('underscore');
exports.showHtml = function (req, res, next) {   
	if(!req.session.user){
		return res.redirect('/login');  
	}
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
		        	resultData['projectversions']=bbb
		            done(null, bbb);
		        }  
		    }) 
	    },
	    function (onearg,done) {
	    	var options={
		        "path":'/project/'+req.query.projectid
		    }   
		    console.log(options)
		    httpUtil.get(options,function(result,err){  
		        if(err){
		            done(err, null);
		        }else{ 
		        	resultData['project']=result;
		            done(null, onearg);
		        }  
		    }) 
	    } 
	],  
    function(err, results) {     
    	console.log(resultData)
    	res.render('userCenter/versions.html',{'results':results,"project":resultData['project']}) 	
    });  
   // res.render('userCenter/versions.html',{'results':resultData}) 	



};  
function dateType(date){
	var date=new Date(date);
	return date.toLocaleDateString();
}