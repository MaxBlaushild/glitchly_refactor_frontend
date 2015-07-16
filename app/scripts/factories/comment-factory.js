(function IFFEE(){

'use strict';

function CommentFactory($http) {
  var comment = {};
  var comments = [];

  var createComment = function(body, pictureId){
    var comment = { comment: {
      body: body
    }};

    return $http.post('http://localhost:3000/pictures/' + pictureId + '/comments', comment).success(function(response){
      angular.copy(response.comment, comment);
    });
  };

  return {
    comment: comment,
    comments: comments,
    createComment: createComment
  };

};

angular.module('frontendApp').factory('CommentFactory', CommentFactory);

CommentFactory.$inject = ['$http'];

})();
