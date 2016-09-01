var user=require('./service/user.js')
var project=require('./service/project.js') 
var category=require('./service/category.js')
var bid=require('./service/bid.js')
var usertag=require('./service/usertag.js')
var work=require('./service/work.js')
var worktag=require('./service/worktag.js')
var uploadfile=require('./service/uploadfile.js')
var version=require('./service/version.js')
var note=require('./service/note.js')
var message=require('./service/message.js')
var authen=require('./service/authen.js') 
var async= require('async')
var httpUtil=require('./utils/http.js') 
module.exports = function (app) { 
app.get("*",function(req,res,next){
    if(req.session.user){ 
        //var session=req.session.user;    
        res.locals.session =req.session.user;    

    }else{
      /*  res.locals.session={
                "authenticationType": 0, 
                "bankAuthentication": "http://10.0.1.122/api/v1.0/userauthen?userid=15&type=4", 
                "categorys": "http://10.0.1.122/api/v1.0/15/usercategorys", 
                "companyAuthentication": "http://10.0.1.122/api/v1.0/userauthen?userid=15&type=2", 
                "defaultImage": "2.jpg", 
                "description": null, 
                "email": "bob143@qq.com", 
                "id": 15, 
                "imageLarge": "http://10.0.1.122/static/default/img/2.jpg", 
                "imageMedium": "http://10.0.1.122/static/default/img/2.jpg", 
                "imageSmall": "http://10.0.1.122/static/default/img/2.jpg", 
                "location": null, 
                "manualAuthentication": "http://10.0.1.122/api/v1.0/userauthen?userid=15&type=8", 
                "nickname": "bob143", 
                "participateProjects": "http://10.0.1.122/api/v1.0/userParticipateProjects/1?userid=15", 
                "phone": null, 
                "privateAuthentication": "http://10.0.1.122/api/v1.0/userauthen?userid=15&type=1", 
                "publishedProjects": "http://10.0.1.122/api/v1.0/userPublishedProjects/1?userid=15", 
                "registDate": "2016-08-31T15:54:04", 
                "status": null, 
                "tags": "http://10.0.1.122/api/v1.0/15/usertags", 
                "works": "http://10.0.1.122/api/v1.0/15/userworks/1"
          }
        req.session.user={
              "authenticationType": 0, 
                "bankAuthentication": "http://10.0.1.122/api/v1.0/userauthen?userid=15&type=4", 
                "categorys": "http://10.0.1.122/api/v1.0/15/usercategorys", 
                "companyAuthentication": "http://10.0.1.122/api/v1.0/userauthen?userid=15&type=2", 
                "defaultImage": "2.jpg", 
                "description": null, 
                "email": "bob143@qq.com", 
                "id": 15, 
                "imageLarge": "http://10.0.1.122/static/default/img/2.jpg", 
                "imageMedium": "http://10.0.1.122/static/default/img/2.jpg", 
                "imageSmall": "http://10.0.1.122/static/default/img/2.jpg", 
                "location": null, 
                "manualAuthentication": "http://10.0.1.122/api/v1.0/userauthen?userid=15&type=8", 
                "nickname": "bob143", 
                "participateProjects": "http://10.0.1.122/api/v1.0/userParticipateProjects/1?userid=15", 
                "phone": null, 
                "privateAuthentication": "http://10.0.1.122/api/v1.0/userauthen?userid=15&type=1", 
                "publishedProjects": "http://10.0.1.122/api/v1.0/userPublishedProjects/1?userid=15", 
                "registDate": "2016-08-31T15:54:04", 
                "status": null, 
                "tags": "http://10.0.1.122/api/v1.0/15/usertags", 
                "works": "http://10.0.1.122/api/v1.0/15/userworks/1"
        }*/
    }
    next();
})   
app.get('/', function(req, res, next) {  

    
    res.render('index') 
}); 
//user
app.post('/login',user.create);     
app.put('/changepwd',user.changepwd); 
app.put('/user',user.modify); 
app.get('/user',user.getUserInfo); 
app.get('/login',user.login);  
app.get('/logout',user.logout);   
//project
app.post('/project',project.create); 
app.put('/project',project.modify);  
app.get('/project/:projectid',project.projectDetail);
app.get('/userPublishedProjects/:page',project.userPublishedProjects); 
app.get('/userParticipateProjects/:page',project.userParticipateProjects);

//category
app.get('/categorylist',category.categorylist); 
app.get('/usercategorys',category.usercategorys); 


//usertag
app.get('/usertags',usertag.usertags);
app.post('/usertag',usertag.add);
app.delete('/usertag',usertag.delete);
app.get('/search/usertaglist/:keyword',usertag.usertaglist);
//work
app.post('/work',work.create);
app.delete('/work',work.delete);
app.get('/userworks/:page',work.userworks);

//worktag
app.post('/worktag',worktag.create);
app.get('/:worktagsId/worktags',worktag.worktags);
//uploadfile
app.post('/uploadfile', uploadfile.uploadfile)   
//authen
app.get('/userauthen', authen.userauthen)  
app.delete('/privateauthen', authen.delPrivateAuthen) 
app.delete('/companyauthen', authen.delCompanyAuthen) 
app.post('/privateauthen', authen.privateAuthen) 
app.post('/companyauthen', authen.companyAuthen) 
app.post('/bankauthen', authen.bankAuthen) 
app.put('/bankauthen', authen.modifyBankAuthen) 
app.delete('/bankauthen', authen.delBankAuthen)  
app.post('/manualthen', authen.manualthen) 
//version
app.post('/version', version.addVersion) 
app.get('/projectversions', version.projectversions) 
//note
app.post('/note', note.addNote) 
app.get('/:projectid/projectnotes', note.projectnotes) 
//message
app.get('/:noteid/notemessagelist', message.notemessagelist) 
app.post('/notemessage', message.addMessage) 
//bid
app.get('/:projectid/bidcount',bid.bidcount);
/*--------------other---start---------*/

app.get('/makeProject', function(req, res, next) {   
    res.render('userCenter/makeProject.html') 
});
app.get('/publishedProjects', function(req, res, next) {   
    res.render('userCenter/publishedProjects.html') 
}); 
app.get('/participateProjects', function(req, res, next) {   
    res.render('userCenter/participateProjects.html') 
});   
app.get('/makeWork', function(req, res, next) {  
    res.render('userCenter/makeWork.html') 
});  
app.get('/myWork', function(req, res, next) {  
    res.render('userCenter/myWork.html')  
});   
app.get('/basicInfo', function(req, res, next) {  
    res.render('userCenter/basicInfo.html') 
}); 
app.get('/countSafe', function(req, res, next) {  
    res.render('userCenter/countSafe.html') 
}); 
app.get('/headIcon', function(req, res, next) {  
    res.render('userCenter/headIcon.html') 
});  
app.get('/skillTags', function(req, res, next) {  
    res.render('userCenter/skillTags.html') 
}); 
app.get('/authentication', function(req, res, next) {  
    res.render('userCenter/authentication.html') 
});  
app.get('/authenPerson', function(req, res, next) {  
    res.render('userCenter/authenPerson.html') 
});  
app.get('/authenCompany', function(req, res, next) {  
    res.render('userCenter/authenCompany.html') 
});  
app.get('/authenTrade', function(req, res, next) {  
    res.render('userCenter/authenTrade.html') 
});  
app.get('/authenManual', function(req, res, next) {  
    res.render('userCenter/authenManual.html') 
});  
app.get('/domain', function(req, res, next) {  
    res.render('userCenter/domain.html') 
});  
app.get('/versions', function(req, res, next) {  
    res.render('userCenter/versions.html') 
});  
app.get('/suggections', function(req, res, next) {  
    res.render('userCenter/suggections.html') 
});   
app.get('/bidding', function(req, res, next) {    
    async.waterfall([  
        function(callback) {
            var options={
              "path":""+req.query.projectid+"/bidlist"
            }
            httpUtil.get(options,function(results,err){
              callback(null,results,err) 
            }) 
        },
        function(results, err, callback) {
            for(var i in results['data']){  
              var options={
                "path":"user/"+results['data'][i]['userid']
              }
              httpUtil.get(options,function(result,err){
                if(err){
                  res.render("error.html")
                }else{
                  results['data'][i]['username']=result['nickname']
                  console.log(results)
                }
              })  
            }
            callback(null,results,err) 
        }
      ],function(results,err,result){  
     
    })   
});  
 
/*--------------other---end---------*/







app.get('/test', function(req, res, next) {  
    res.render('userCenter/test.html') 
}); 
}