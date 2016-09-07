var async= require('async')
var httpUtil=require('./utils/http.js') 
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


var index=require('./service/index.js') 
var vrhall=require('./service/vrhall.js') 
var mhall=require('./service/mhall.js') 
var projectlist=require('./service/projectlist.js') 
var projectDetail=require('./service/projectDetail.js') 
var userlist=require('./service/userlist.js') 
var userDetail=require('./service/userDetail.js') 
var workDetail=require('./service/workDetail.js') 


var publishedProjects =require('./service/userCenter/publishedProjects.js') 
var participateProjects =require('./service/userCenter/participateProjects.js') 
var versions =require('./service/userCenter/versions.js') 
var suggections =require('./service/userCenter/suggections.js') 
var bidding=require('./service/bidding.js')  
module.exports = function (app) { 
app.get("*",function(req,res,next){
    if(req.session.user){ 
        //var session=req.session.user;    
        res.locals.session =req.session.user;    

    }else{
        res.locals.session=""
   /*     req.session.user={
              "authenticationType": 1, 
                "bankAuthentication": "http://139.196.183.6/api/v1.0/userauthen?userid=15&type=4", 
                "categorys": "http://139.196.183.6/api/v1.0/15/usercategorys", 
                "companyAuthentication": "http://139.196.183.6/api/v1.0/userauthen?userid=15&type=2", 
                "defaultImage": "2.jpg", 
                "description": null, 
                "email": "bob143@qq.com", 
                "id": 64, 
                "imageLarge": "http://139.196.183.6/static/default/img/2.jpg", 
                "imageMedium": "http://139.196.183.6/static/default/img/2.jpg", 
                "imageSmall": "http://139.196.183.6/static/default/img/2.jpg", 
                "location": null, 
                "manualAuthentication": "http://139.196.183.6/api/v1.0/userauthen?userid=15&type=8", 
                "nickname": "bob143", 
                "participateProjects": "http://139.196.183.6/api/v1.0/userParticipateProjects/1?userid=15", 
                "phone": null, 
                "privateAuthentication": "http://139.196.183.6/api/v1.0/userauthen?userid=15&type=1", 
                "publishedProjects": "http://139.196.183.6/api/v1.0/userPublishedProjects/1?userid=15", 
                "registDate": "2016-08-31T15:54:04", 
                "status": null, 
                "tags": "http://139.196.183.6/api/v1.0/15/usertags", 
                "works": "http://139.196.183.6/api/v1.0/15/userworks/1"
        }  */
 
    }
    next();
})   
//大厅
app.get('/',index.showHtml); 
app.get('/vrhall',vrhall.showHtml);  
app.get('/mhall',mhall.showHtml); 
app.get('/userlist/:page',userlist.showHtml);  
app.get('/projectDetail',projectDetail.showHtml); 
app.get('/userDetail',userDetail.showHtml); 
app.get('/workDetail',workDetail.showHtml);  
app.get('/projectlist/:page',projectlist.showHtml);  
app.get('/toolhall', function(req, res, next) {   
    res.render('toolhall') 
});
app.get('/servicehall', function(req, res, next) {   
    res.render('servicehall') 
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
//note
app.post('/note', note.addNote) 
app.get('/:projectid/projectnotes', note.projectnotes) 
//message
app.get('/:noteid/notemessagelist', message.notemessagelist) 
app.post('/notemessage', message.addMessage) 
//bid
app.get('/:projectid/bidcount',bid.bidcount);
app.put('/bid',bid.put);
app.post('/bid',bid.bid);

/*--------------个人中心---start---------*/

app.get('/publishedProjects/:page',publishedProjects.showHtml);
app.get('/participateProjects/:page',participateProjects.showHtml); 
app.get('/bidding',bidding.showHtml); 
app.get('/versions',versions.showHtml); 
app.get('/suggections',suggections.showHtml); 
 
 


app.get('/makeProject', function(req, res, next) {   
    res.render('userCenter/makeProject.html') 
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


 
/*--------------other---end---------*/




 
}