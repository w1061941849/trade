var httpUtil=require('../utils/http.js')

exports.bidcount = function (req, res, next) {  
   var options={
   		"path":""+req.params.projectid+"/bidcount"
   }
   console.log(options)
   httpUtil.get(options,function(result,err){
   		if(err){
   			res.send(err);
   		}else{
   			res.send(result);
   		} 
   })

}; 