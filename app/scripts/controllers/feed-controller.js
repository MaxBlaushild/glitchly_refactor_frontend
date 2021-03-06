'use strict';

(function(){

  angular.module('MainController').controller('FeedCtrl', FeedCtrl);

  FeedCtrl.$inject = ['PictureFactory', 'LikeFactory'];

  function FeedCtrl(PictureFactory, LikeFactory){
    var vm = this;
    vm.feed = PictureFactory.feed;
    vm.page = 1;

    function switchLikeStatus(id){
      for (var i = 0; i < vm.feed.length; i++) {
        if (vm.feed[i].id === id) {
            vm.feed[i].liked_by_user = !vm.feed[i].liked_by_user;
        }
      }
    }

    vm.toggleLike = function(id, likedByUser){
      (likedByUser ? LikeFactory.unlike(id) : LikeFactory.like(id)).then(function(response){
        switchLikeStatus(id);
      });
    }

    vm.getMoreFeed = function(){
      vm.page++;
      PictureFactory.getMoreFeed(vm.page).then(function(response) {
        response.data.pictures.forEach(function(picture){
            vm.feed.push(picture);
        });
      });
    }

    function init(){
      PictureFactory.getFeed(vm.page);
    }

    init();

  }

})();
