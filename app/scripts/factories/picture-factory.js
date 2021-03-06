'use strict';

(function(){

    angular
        .module('frontendApp')
        .factory('PictureFactory', PictureFactory);

    PictureFactory.$inject = ['$http', '$window', '$location', 'appSettings'];

    function PictureFactory($http, $window,  $location, appSettings) {
        var picture = {};
        var pictures = [];
        var feed = [];


        function setPicture(newPicture) {
            angular.copy(newPicture, picture);
        };

        function getFeed(page) {
            return $http.get(appSettings.apiUrl + "?page=" + page)
                .then(function(response) {
                    angular.copy(response.data.pictures, feed);
            });
        };

        function getMoreFeed(page) {
            return $http.get(appSettings.apiUrl + "?page=" + page);
        };

        function getPicture(id) {
            return $http.get(appSettings.apiUrl + '/pictures/' + id)
                .then(function(response) {
                    angular.copy(response.data.picture, picture);
            });
        };

        function getPictures(id) {
            return $http.get(appSettings.apiUrl + '/pictures')
                .then(function(response) {
                    angular.copy(response.data.pictures, pictures);
            });
        };

        function deletePicture(id){
            return $http.delete(appSettings.apiUrl + '/pictures/' + id).then(function(reponse){
                $location.path('/new-picture');
            });
        };

        function createPicture(picture) {
            var picture = { picture: picture };
            return $http.post(appSettings.apiUrl + '/pictures', picture).then(function(response){
                angular.copy(response.data.picture, picture);
            });
        };

        function findPictureIndexById(id) {
            for (var i = 0; i < pictures.length; i++) {
                if (pictures[i].id === id) {
                    return i;
                }
            };
        };

        return {
            picture: picture,
            pictures: pictures,
            getFeed: getFeed,
            feed: feed,
            deletePicture: deletePicture,
            setPicture: setPicture,
            createPicture: createPicture,
            getPictures: getPictures,
            getMoreFeed: getMoreFeed,
            getPicture: getPicture
        };
    };

})();
