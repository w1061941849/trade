var httpUtil=require('../utils/http.js')
var async= require('async');
exports.showHtml = function (req, res, next) {   
     // "path":"1/recommenditemlist"  "path":"categorylist"
    var objs = [{path:'categorylist',"name":"categorylist"}, {path:'1/recommenditemlist',"name":"list1"}, {path:'2/recommenditemlist',"name":"list2"}];  
  	var results={}; 
  	function dosomething(obj,done){
  		console.log(obj) 
  		var options={
	         "path":obj.path
	   	}  
	   	httpUtil.get(options,function(result,err){ 
	   		results[obj.name]=result;
	   		console.log(results)
	        if(err){
	        	done(err)
	        } 
	   	})  
  	}
	async.each(objs, function(obj, callback) {  
		dosomething(obj,function(err){  
		 	if(err){
		 		callback(err);  
		 	}
		})
	    
	}, function(err){  
	    if(err){ 
	    	console.log("err is:" + err);  
	    }
	});  
	res.render('index',{"results":results})

}; 