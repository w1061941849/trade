var httpUtil=require('../utils/http.js')
 var async= require('async')
exports.login = function (req, res, next) {  
    res.render('login');

}; 
exports.logout = function (req, res, next) {  
    res.locals.session="" ;
    res.render('login');
}; 
exports.create = function (req, res, next) {   
    
    async.waterfall([  
        function(callback) {
            var params = {
                'email':req.body.email,
                'password':req.body.password
            }
            var options={
                "path":"login"
            } 
            httpUtil.post(params,options,function(results,err){ 
                  callback(null,results,err) 
            })  
        },
        function(results, err, callback) {   
            if(results['result']){  
                var options={
                    "path":"user/"+results['data']['id']
                }
                httpUtil.get(options,function(result,err){
                    if(err){
                        res.render("error.html")
                    }else{  
                        req.session.user=result; 
                        res.send(results) 
                    }
                })   
            }else{ 
                res.send(results) 
            } 
        }
      ])     
} 
exports.getUserInfo = function (req, res, next) {    
    var options={
        "path":"user/"+req.session.user.id
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
exports.changepwd = function (req, res, next) {  
    var params={
        'email':req.body.email,
        'password':req.body.password, 
        'orignalPassword':req.body.orignalPassword, 
    }; 
    var options={
        "path":"changepwd"
    }
    console.log(params);
    httpUtil.put(params,options,function(result,err){
        if(err){
            res.send("statusCode is:"+err);
        }else{
            res.send(result);
        } 
    })

};
exports.modify = function (req, res, next) {  
    var params={  
        "id":req.session.user.id,
        "nickname":req.body.nickname ? req.body.nickname : req.session.user.nickname, 
        'phone': req.body.phone ? req.body.phone : req.session.user.phone, 
        'location': req.body.location ? req.body.location : req.session.user.location, 
        'description': req.body.description ? req.body.description : req.session.user.description, 
        "defaultImage":req.body.defaultImage ? req.body.defaultImage : req.session.user.defaultImage,
        "cids":req.body.cids ? req.body.cids : req.session.user.cids
    } 
    console.log(params);
    var options={
        "path":"user"
    }
    httpUtil.put(params,options,function(result,err){
        if(err){
            res.send("statusCode is:"+err);
        }else{
            res.send(result);
        } 
    })
 
};