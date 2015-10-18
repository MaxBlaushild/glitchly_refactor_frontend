"use strict";angular.module("frontendApp",["ngRoute","MainController","infinite-scroll","MainDirective"]).config(["$httpProvider",function(a){a.interceptors.push("fourOhOneInterceptor");var b=simpleStorage.get("gl-user-token");b&&(a.defaults.headers.common.Authorization="Token token="+b)}]).run(["$rootScope","$http","$window","$location","$routeParams","AuthService",function(a,b,c,d,e,f){var g=["/login","/try-glitchly","/sign-up"],h=function(a){return g.indexOf(a)>-1};a.$on("$routeChangeStart",function(){h(d.url())||f.isLoggedIn()||d.path("/try-glitchly")})}]),function(){angular.module("frontendApp").config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html"}).when("/login",{templateUrl:"views/login-page.html"}).when("/followers",{templateUrl:"views/user-list-view.html",controller:"followersController",controllerAs:"UserCtrl"}).when("/following",{templateUrl:"views/user-list-view.html",controller:"followingController",controllerAs:"UserCtrl"}).when("/try-glitchly",{templateUrl:"views/landing-page.html"}).when("/sign-up",{templateUrl:"views/sign-up-view.html"}).when("/pictures/:pictureId",{templateUrl:"views/picture-show-view.html"}).when("/discover",{templateUrl:"views/discover-view.html"}).when("/glitch-a-pic",{templateUrl:"views/new-picture-view.html"}).when("/users",{templateUrl:"views/user-list-view.html",controller:"usersController",controllerAs:"UserCtrl"}).when("/users/:userId",{templateUrl:"views/user-show-view.html"}).when("/glitch-in-progress",{templateUrl:"views/glitch-in-progress-view.html"}).otherwise({redirectTo:"/"})}])}(),function(){angular.module("frontendApp").value("appSettings",{apiUrl:"http://159.203.86.38",version:"1.0"})}(),function(){function a(a,b,c,d){function e(a){angular.copy(a,s)}function f(b){return a.get(d.apiUrl+"/users/"+b).then(function(a){angular.copy(a.data.user,s)})}function g(a){r.splice(h(a.id),1)}function h(a){for(var b=0;b<r.length;b++)if(r[b].id===a)return b}function i(b){return a.get(d.apiUrl+"/users?username="+b).then(function(a){angular.copy(a.data.users,r)})}function j(){return a.get(d.apiUrl+"/followers").then(function(a){angular.copy(a.data.users,t)})}function k(){return a.get(d.apiUrl+"/following").then(function(a){angular.copy(a.data.users,u)})}function l(b){return a.get(d.apiUrl+"/users/"+b+"/follow")}function m(b){return a.get(d.apiUrl+"/users/"+b+"/unfollow")}function n(b){var c={user:b};return a.patch(d.apiUrl+"/users",c).then(function(a){angular.copy(a.data.user,b),location.reload()})}function o(b){var e={auth:b};return a.post(d.apiUrl+"/register",e).success(function(b){simpleStorage.set("gl-user-token",b.token,{TTL:86400}),a.defaults.headers.common.Authorization="Token token="+b.token,c.path("/")})}function p(b){return a["delete"](d.apiUrl+"/users/"+b.id)}var q,r=[],s={},t=[],u=[];return{search:q,users:r,user:s,removeUser:g,getUser:f,setUser:e,getFollowing:k,getFollowers:j,followers:t,following:u,getUsers:i,deleteUser:p,followUser:l,unfollowUser:m,updateUser:n,createUser:o}}angular.module("frontendApp").factory("UserFactory",a),a.$inject=["$http","$window","$location","appSettings"]}(),function(){function a(a,b){var c={},d=[],e=function(c,d){var e={comment:{body:c}};return a.post(b.apiUrl+"/pictures/"+d+"/comments",e).success(function(a){angular.copy(a.comment,e)})},f=function(c,d){return a.get(b.apiUrl+"/pictures/"+d+"/comments?page="+c)};return{comment:c,comments:d,getMoreComments:f,createComment:e}}angular.module("frontendApp").factory("CommentFactory",a),a.$inject=["$http","appSettings"]}(),function(){function a(a,b,c,d){function e(a){angular.copy(a,l)}function f(b){return a.get(d.apiUrl+"?page="+b).then(function(a){angular.copy(a.data.pictures,n)})}function g(b){return a.get(d.apiUrl+"?page="+b)}function h(b){return a.get(d.apiUrl+"/pictures/"+b).then(function(a){angular.copy(a.data.picture,l)})}function i(b){return a.get(d.apiUrl+"/pictures").then(function(a){angular.copy(a.data.pictures,m)})}function j(b){return a["delete"](d.apiUrl+"/pictures/"+b).then(function(a){c.path("/new-picture")})}function k(b){var b={picture:b};return a.post(d.apiUrl+"/pictures",b).then(function(a){angular.copy(a.data.picture,b)})}var l={},m=[],n=[];return{picture:l,pictures:m,getFeed:f,feed:n,deletePicture:j,setPicture:e,createPicture:k,getPictures:i,getMoreFeed:g,getPicture:h}}angular.module("frontendApp").factory("PictureFactory",a),a.$inject=["$http","$window","$location","appSettings"]}(),function(){function a(a,b){var c=function(c){var d={like:{}};return a.post(b.apiUrl+"/pictures/"+c+"/likes",d).success(function(a){angular.copy(a.like,d)})},d=function(d){return a["delete"](b.apiUrl+"/pictures/"+d+"/likes").success(function(a){angular.copy({},c)})};return{like:c,unlike:d}}angular.module("frontendApp").factory("LikeFactory",a),a.$inject=["$http","appSettings"]}(),function(){function a(a,b,c){var d=[],e=!0,f=function(c){var d={notification:{}};return a.patch(b.apiUrl+"/notifications/"+c+"/deactivate",d)},g=function(a){0===a.data.notifications.length&&angular.copy(!1,e)},h=function(c){return a.get(b.apiUrl+"/notifications?page="+c).then(function(a){g(a),a.data.notifications.forEach(function(a){d.push(a)})})},i=function(){var a=c.createWatcher(b.apiUrl+"/notifications/watch",{Authorization:"Token token="+simpleStorage.get("gl-user-token"),timeout:45});return a.on("change",function(a){var b=JSON.parse(a);d.unshift(b),d.length>=8&&d.pop()}),a.on("error",function(a){}),a},j=function(){var a=i();setInterval(function(){a=null,a=i()},45e3)};return{notifications:d,hasMoreNotifications:e,watchForNewNotifications:j,getMoreNotifications:h,deactivateNotification:f}}angular.module("frontendApp").factory("NotificationFactory",a),a.$inject=["$http","appSettings","WatcherFactory"]}(),function(){function a(a,b){function c(){return a.get(b.apiUrl+"/refresh-navbar").then(function(a){angular.copy(a.data.user,d)})}var d={};return{currentUser:d,getCurrentUser:c}}angular.module("frontendApp").factory("CurrentUserFactory",a),a.$inject=["$http","appSettings","NotificationFactory"]}(),function(){var a=function(){var a=function(a,b){var c=function(a){return a&&(a=a.Authorization)&&(a="string"==typeof a&&a.split("="))&&Array.isArray(a)&&a[1]};a+="?token="+c(b),a+=b.timeout?"&timeout="+b.timeout:"";var d=new EventSource(a),e=function(){d.close()},f=function(a,b){return function(c){return b&&b(),a(c.data?c.data:c)}},g=function(a,b){switch(a){case"connect":d.onopen=f(b);break;case"change":d.onmessage=f(b);break;case"error":d.onerror=f(b,e);break;default:console.error("Unknown event type:"+a)}};return{close:e,on:g}};return{createWatcher:a}};angular.module("frontendApp").factory("WatcherFactory",a),a.$inject=[]}(),function(){angular.module("frontendApp").factory("fourOhOneInterceptor",["$location","$q",function(a,b){var c={responseError:function(c){return 401===c.status?(simpleStorage.flush(),a.path("/try-glitchly"),b.reject(c)):b.reject(c)}};return c}])}(),function(){function a(a,b,c){var d=function(d){return a.post(c.apiUrl+"/login",d).success(function(c){simpleStorage.set("gl-user-token",c.token),a.defaults.headers.common.Authorization="Token token="+c.token,b.path("")})},e=function(){simpleStorage.flush(),b.path("/try-glitchly")},f=function(){return simpleStorage.get("gl-user-token")};return{login:d,logOut:e,isLoggedIn:f}}angular.module("frontendApp").service("AuthService",a),a.$inject=["$http","$location","appSettings"]}(),angular.module("MainController",[]),function(){function a(a,b,c,d,e,f,g){var h=this;h.searchString="",h.currentUser=g.currentUser,h.notifications=f.notifications,h.notificationPage=1,h.hasMoreNotifications=f.hasMoreNotifications,h.getNotificationIndexById=function(a){for(var b=0;b<h.notifications.length;b++)if(h.notifications[b].id===a)return b},h.isLoggedIn=function(){return c.isLoggedIn()},h.logOut=function(){c.logOut()},h.searchUsers=function(c){b.getUsers(c).then(function(b){a.path("/users"),a.search("username",c),h.searchString=""})},h.toggleNotification=function(a){h.notifications[a].active=!1,h.currentUser.active_notifications--},h.followNotification=function(b,c){f.deactivateNotification(b).then(function(){var d=h.getNotificationIndexById(b);h.toggleNotification(d),a.path("/pictures/"+c)})},h.getMoreNotifications=function(){h.notificationPage++,f.getMoreNotifications(h.notificationPage)};var i=function(){g.getCurrentUser(),f.getMoreNotifications(h.notificationPage),f.watchForNewNotifications()};d.$watch(function(){return self.currentUser},function(a){!a&&simpleStorage.get("gl-user-token")&&i()}),d.$watchCollection("NavbarCtrl.notifications",function(a,b){b.length>0&&a.length==b.length&&h.currentUser.active_notifications++})}angular.module("MainController").controller("NavbarCtrl",a),a.$inject=["$location","UserFactory","AuthService","$scope","$timeout","NotificationFactory","CurrentUserFactory"]}(),function(){function a(a,b,c){function d(){f.user={},f.serverErrors=!1}function e(){b.getUser(g)}var f=this,g=a.userId;f.user=b.user,f.search=b.search,f.editMode=!1,f.updateUser=function(a){b.updateUser(a)},f.toggleEditMode=function(){f.user.avatar="",f.editMode=!f.editMode},f.renderPreview=function(){var a=new FileReader;a.onload=function(a){$("#profile").attr("src",a.target.result)},a.readAsDataURL($("#profile-preview")[0].files[0])},f.isCurrentUser=function(a){return c.currentUser.id===a},f.unfollowUser=function(a){b.unfollowUser(a).then(function(){f.user.followed_by_user=!f.user.followed_by_user})},f.followUser=function(a){b.followUser(a).then(function(){f.user.followed_by_user=!f.user.followed_by_user})},f.showUser=function(){b.getUser(g)},f.searchUsers=function(){b.getUsers(search)},f.removeUser=function(a){b.removeUser(a)},f.cancel=function(){d()},e()}angular.module("MainController").controller("UserCtrl",a),a.$inject=["$routeParams","UserFactory","CurrentUserFactory"]}(),function(){function a(a,b,c,d,e,f){function g(a){j.picture.comments.unshift(a),j.picture.comments.length>5&&j.picture.comments.pop()}function h(a,b){b?j.picture.likes--:j.picture.likes++,j.picture.liked_by_user=!j.picture.liked_by_user}function i(){c.getPicture(k)}var j=this,k=a.pictureId;j.picture=c.picture,j.comment=c.comment,j.commentPage=1,j.hasMoreComments=!0,j.createComment=function(b){d.createComment(j.comment,a.pictureId).then(function(a){g(a.data.comment),j.comment=""})},j.checkCommentLength=function(a){0===a.data.comments.length&&f(function(){j.hasMoreComments=!1})},j.getMoreComments=function(){j.commentPage++,d.getMoreComments(j.commentPage,j.picture.id).then(function(a){j.checkCommentLength(a),a.data.comments.forEach(function(a){j.picture.comments.push(a)})})},j.toggleLike=function(a,b){var c;c=b?!0:!1,(b?e.unlike(a):e.like(a)).then(function(b){h(a,c)})},j.deletePicture=function(){c.deletePicture(k)},i()}angular.module("MainController").controller("PictureCtrl",a),a.$inject=["$routeParams","$location","PictureFactory","CommentFactory","LikeFactory","$timeout"]}(),function(){function a(a,b){function c(){$("#progress-view").toggle(),$("#form-view").toggle()}function d(){c();var a=Processing.getInstanceById("image-preview"),b=[],d=[],e=[],f=[],g=[],i=[],j=[];h.recipes.forEach(function(a){b.push(a.sort.id),f.push(a.relativity.id),d.push(a.polarity.id),e.push(a.order.id),g.push(a.hue),j.push(Number(a.intensity)),i.push(a.direction.id)}),a.uploadImage(h.picture.image,b,d,e,f,g,j,i)}function e(){var a=$("input.ng-invalid-required, select.ng-invalid-required");a.length>0?h.filterFormGoof=!0:h.filterFormGoof=!1}function f(){h.recipes=[],h.newRecipe={}}function g(a){var b="";return angular.forEach(a,function(a,c){b+=c+": "+a}),b}var h=this;h.picture={},h.recipes=[],h.newRecipe={},h.filterFormGoof=!1,h.sorts=[{name:"Bubble",id:0},{name:"Insertion",id:1},{name:"Selection",id:2},{name:"Heap",id:3},{name:"Shell",id:4},{name:"Merge",id:5},{name:"Quick",id:6},{name:"Smooth",id:7},{name:"Permute",id:8},{name:"One Color",id:9},{name:"Roll",id:10},{name:"One Color RB",id:11}],h.relativity=[{name:"Relative",id:0},{name:"Absolute",id:1}],h.orders=[{name:"Ascending",id:0},{name:"Descending",id:2}],h.polarities=[{name:"Positive",id:0},{name:"Negative",id:4}],h.hues=[{name:"Red",id:1,hex:"#FF0000"},{name:"Orange",id:2,hex:"#FF6600"},{name:"Yellow",id:3,hex:"#FFFF00"},{name:"Green",id:4,hex:"#00FF00"},{name:"Cyan",id:5,hex:"#00FFFF"},{name:"Blue",id:6,hex:"#0000FF"},{name:"Magenta",id:7,hex:"#FF00FF"},{name:"Pink",id:8,hex:"#FF0080"}],h.directions=[{name:"Left",id:37},{name:"Right",id:39},{name:"Up",id:101},{name:"Bottom",id:102}],h.createPicture=function(){var c=document.getElementById("image-preview"),d={image:c.toDataURL(),caption:h.picture.caption};b.createPicture(d).then(function(){a.path("/")},function(a){h.serverErrors=!0,h.serverErrorMsg=g(a.data)})},h.closeWarningMessage=function(){h.filterFormGoof=!h.filterFormGoof},h.addRecipe=function(a){e(),h.filterFormGoof||(h.recipes.push(a),h.newRecipe={},d())},h.cancel=function(){f()},h.removeFilter=function(a){h.recipes.splice(a,1),d()},h.uploadImage=function(){d()},h.resetPage=function(){location.reload()}}angular.module("MainController").controller("PictureFormCtrl",a),a.$inject=["$location","PictureFactory"]}(),function(){function a(a){function b(){a.getPictures()}var c=this;c.pictures=a.pictures,b()}angular.module("MainController").controller("PictureCloudCtrl",a),a.$inject=["PictureFactory"]}(),function(){function a(a,b){function c(a){for(var b=0;b<e.feed.length;b++)e.feed[b].id===a&&(e.feed[b].liked_by_user=!e.feed[b].liked_by_user)}function d(){a.getFeed(e.page)}var e=this;e.feed=a.feed,e.page=1,e.toggleLike=function(a,d){(d?b.unlike(a):b.like(a)).then(function(b){c(a)})},e.getMoreFeed=function(){e.page++,a.getMoreFeed(e.page).then(function(a){a.data.pictures.forEach(function(a){e.feed.push(a)})})},d()}angular.module("MainController").controller("FeedCtrl",a),a.$inject=["PictureFactory","LikeFactory"]}(),function(){var a=function(a,b){function c(a){for(var b=0;b<f.users.length;b++)if(f.users[b].id===a)return b}function d(a){var b=c(a);f.users[b].followed_by_user=!f.users[b].followed_by_user}function e(){a.getFollowing()}var f=this;f.users=a.following,f.followUser=function(b){a.followUser(b),d(b)},f.isCurrentUser=function(a){return b.currentUser.id===a},f.unfollowUser=function(b){a.unfollowUser(b),d(b)},e()};a.$inject=["UserFactory","CurrentUserFactory"],angular.module("frontendApp").controller("followingController",a)}(),function(){var a=function(a,b){function c(a){for(var b=0;b<f.users.length;b++)if(f.users[b].id===a)return b}function d(a){var b=c(a);f.users[b].followed_by_user=!f.users[b].followed_by_user}function e(){a.getFollowers()}var f=this;f.users=a.followers,f.followUser=function(b){a.followUser(b),d(b)},f.isCurrentUser=function(a){return b.currentUser.id===a},f.unfollowUser=function(b){a.unfollowUser(b),d(b)},e()};a.$inject=["UserFactory","CurrentUserFactory"],angular.module("frontendApp").controller("followersController",a)}(),function(){var a=function(a,b,c){function d(a){for(var b=0;b<g.users.length;b++)if(g.users[b].id===a)return b}function e(a){var b=d(a);g.users[b].followed_by_user=!g.users[b].followed_by_user}function f(){a.getUsers(b.search().username)}var g=this;g.users=a.users,g.followUser=function(b){a.followUser(b),e(b)},g.isCurrentUser=function(a){return c.currentUser.id===a},g.unfollowUser=function(b){a.unfollowUser(b),e(b)},f()};a.$inject=["UserFactory","$location","CurrentUserFactory"],angular.module("frontendApp").controller("usersController",a)}(),function(){function a(a,b,c){function d(){e.user={},e.serverErrors=!1}var e=this;e.user=a.user,e.createUser=function(b){a.createUser(b).then(function(){d(),f()},function(a){e.serverErrors=!0})},e.closeWarningMessage=function(){e.serverErrors=!e.serverErrors},e.cancel=function(){d()};var f=function(){b.getCurrentUser(),c.getMoreNotifications(1),c.watchForNewNotifications()}}angular.module("MainController").controller("SignUpFormCtrl",a),a.$inject=["UserFactory","CurrentUserFactory","NotificationFactory"]}(),function(){function a(a,b,c,d){var e=this;e.credentials={},e.serverErrors=!1,e.login=function(c){b.login(c).then(function(b){e.credentials={},f(),a.path("")},function(){e.serverErrors=!0})},e.closeWarningMessage=function(){e.serverErrors=!e.serverErrors};var f=function(){c.getCurrentUser(),d.getMoreNotifications(1),d.watchForNewNotifications()}}angular.module("MainController").controller("LoginFormCtrl",a),a.$inject=["$location","AuthService","CurrentUserFactory","NotificationFactory"]}(),angular.module("MainDirective",[]),function(){function a(){return{restrict:"E",templateUrl:"views/login-form.html",controller:"LoginFormCtrl",controllerAs:"LoginFormCtrl",bindToController:!0,scope:{credentials:"&"}}}angular.module("MainDirective").directive("glLoginForm",a)}(),function(){function a(){return{restrict:"E",templateUrl:"views/sign-up-form.html",controller:"SignUpFormCtrl",controllerAs:"SignUpFormCtrl",bindToController:!0}}angular.module("MainDirective").directive("glSignUpForm",a)}(),function(){function a(){return{restrict:"E",templateUrl:"views/picture-list.html",controller:"FeedCtrl",controllerAs:"FeedCtrl",bindToController:!0}}angular.module("MainDirective").directive("glPictureList",a)}(),function(){function a(){return{restrict:"E",templateUrl:"views/picture-show.html",controller:"PictureCtrl",controllerAs:"PictureCtrl",bindToController:!0}}angular.module("MainDirective").directive("glPictureShow",a)}(),function(){function a(){return{restrict:"E",templateUrl:"views/picture-cloud.html",controller:"PictureCloudCtrl",controllerAs:"PictureCloudCtrl",bindToController:!0}}angular.module("MainDirective").directive("glPictureCloud",a)}(),function(){function a(){return{restrict:"E",templateUrl:"views/picture-form.html",controller:"PictureFormCtrl",controllerAs:"PictureFormCtrl",bindToController:!0}}angular.module("MainDirective").directive("glPictureForm",a)}(),function(){function a(){return{restrict:"E",templateUrl:"views/navbar.html",controller:"NavbarCtrl",controllerAs:"NavbarCtrl",bindToController:!0}}angular.module("MainDirective").directive("glNavBar",a)}(),function(){function a(){return{restrict:"E",templateUrl:"views/user-show.html",controller:"UserCtrl",controllerAs:"UserCtrl",bindToController:!0}}angular.module("MainDirective").directive("glUserShow",a)}(),function(){function a(){return{restrict:"E",templateUrl:"views/user-list.html",controller:"UserCtrl",controllerAs:"UserCtrl",bindToController:!0}}angular.module("MainDirective").directive("glUserList",a)}(),function(){function a(a){return function(b,c){function d(a,b){return Math.floor(Math.random()*(b-a+1)+a)}function e(a){l=a.pageY,k=a.pageX,c.css({top:l+"px",left:k+"px"})}function f(){$(document).off("mousemove",e),$(document).off("mouseup",f)}var g=$(window).width(),h=$(window).height(),i=d(0,g),j=d(0,h),k=0,l=0;c.css({top:j,left:i,height:h/5+"px",width:h/5+"px"}),c.on("dblclick",function(d){b.$apply(function(){a.path("/pictures/"+c.data("id"))})}),c.on("mousedown",function(a){a.preventDefault(),$(document).on("mousemove",e),$(document).on("mouseup",f)})}}angular.module("MainDirective").directive("glCloudPicture",a),a.$inject=["$location"]}(),function(){angular.module("MainDirective").directive("processingCanvas",[function(){return{restrict:"A",controller:"PictureFormCtrl",controllerAs:"PictureFormCtrl",link:function(a,b,c){Processing.loadSketchFromSources($("#image-preview")[0],["../glitch-machine.pde"]);a.$watch("PictureFormCtrl.picture.image",function(b,c){b!=c&&(a.PictureFormCtrl.recipes=[],a.PictureFormCtrl.uploadImage())})}}}])}(),function(){angular.module("MainDirective").directive("fileInputModel",[function(){return{scope:{fileInputModel:"="},link:function(a,b,c){b.bind("change",function(b){var c=new FileReader;c.onload=function(b){a.$apply(function(){a.fileInputModel=b.target.result})},c.readAsDataURL(b.target.files[0])})}}}])}(),function(){angular.module("MainDirective").directive("particleCloud",[function(){return{restrict:"E",link:function(a,b,c){function d(){for(l=window.innerHeight,m=window.innerWidth,w=m/2,x=l/2,n=75,o=w/x,p=1,q=5e3,y=q/3,z=0,A=1e-8,i=new THREE.PerspectiveCamera(n,o,p,q),i.position.z=y,h=new THREE.Scene,h.fog=new THREE.FogExp2(z,A),k=document.createElement("div"),k.setAttribute("id","background"),document.body.appendChild(k),r=new THREE.Geometry,s=1e3,t=0;s>t;t++){var a=new THREE.Vector3;a.x=4e3*Math.random()-2e3,a.y=4e3*Math.random()-2e3,a.z=4e3*Math.random()-2e3,r.vertices.push(a)}for(B=[[16737792,25],[414463,20],[16737792,15],[414463,10],[16737792,5]],C=B.length,t=0;C>t;t++)v=B[t][1],E[t]=new THREE.PointCloudMaterial({size:v}),D=new THREE.PointCloud(r,E[t]),D.rotation.x=6*Math.random(),D.rotation.y=6*Math.random(),D.rotation.z=6*Math.random(),h.add(D);j=new THREE.WebGLRenderer,j.setPixelRatio(window.devicePixelRatio),j.setSize(m,l),k.appendChild(j.domElement),window.addEventListener("resize",g,!1)}function e(){requestAnimationFrame(e),f()}function f(){var a=5e-5*Date.now();for(i.position.x+=.05*(F-i.position.x),i.position.y+=.05*(-G-i.position.y),i.lookAt(h.position),t=0;t<h.children.length;t++){var b=h.children[t];b instanceof THREE.PointCloud&&(b.rotation.y=a*(4>t?t+3:-(t+3)))}for(t=0;t<E.length;t++)u=B[t][0],E[t].color.setHex(u);j.render(h,i)}function g(){w=window.innerWidth/2,x=window.innerHeight/2,i.aspect=window.innerWidth/window.innerHeight,i.updateProjectionMatrix(),j.setSize(window.innerWidth,window.innerHeight)}var h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,k,E=[],F=0,G=0;d(),e()}}}])}(),function(){angular.module("MainDirective").directive("pulsingNav",[function(){return{restrict:"A",link:function(a,b){function c(){b.css({"background-color":"#0652ff"}).animate({opacity:.2},1200,"linear").animate({opacity:1},1200,"linear",c)}c(b)}}}])}(),function(){function a(){return{restrict:"A",link:function(a,b){b.on("click",function(a){$(this).unbind()})}}}angular.module("MainDirective").directive("glDropdownNoClose",a)}(),function(){function a(){return{restrict:"E",templateUrl:"views/comment.html"}}angular.module("MainDirective").directive("glComment",a)}(),function(){angular.module("MainDirective").directive("glScrollForever",[function(){return{restrict:"A",link:function(a,b,c,d){function e(){var a=document;return Math.max(a.body.scrollHeight,a.documentElement.scrollHeight,a.body.offsetHeight,a.documentElement.offsetHeight,a.body.clientHeight,a.documentElement.clientHeight)}$(window).scroll(function(){$(window).scrollTop()+$(window).height()>e()-100&&(a.FeedCtrl.feed.length%14==0?a.FeedCtrl.getMoreFeed():$(window).unbind())})}}}])}();