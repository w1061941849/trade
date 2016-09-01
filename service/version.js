var httpUtil=require('../utils/http.js')
var URL = require('url');
exports.addVersion = function (req, res, next) {   
	var params = {
      "projectid":req.body.projectid, 
      "title":req.body.projectid, 
      "description":req.body.projectid, 
      "userid":req.session.user.id,
      'image':req.body.image
   
   }
   var options={
      "path":"version"
   }
   console.log(params);
   httpUtil.post(params,options,function(result,err){
        if(err){ 
            res.send("statusCode is:"+err);  
        }else{  
            res.send(result); 
        }
   })  
};
exports.projectversions = function (req, res, next) {   
   var projectid = URL.parse(req.url, true).query.projectid; 
    var options={
        'path':''+projectid+"/projectversions"

    } 
    console.log(options)
    httpUtil.get(options,function(result,err){
        if(err){ 
            res.send("statusCode is:"+err);  
        }else{  
            res.send(result); 
        }
    })  
} 