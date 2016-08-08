'use strict';

console.log("OUTSIDE: alloy Service");

//angular.module("main")
app.service('alloyService', function ($http) {

    console.log("INSIDE: alloy Service");


    this.getHomeBrew = function (callback) {
        console.log("success from getHomeBrew");

        $http({
            url: '/homebrew',
            method: "GET"
        })

        .then(callback);

    };

    this.postHomeBrew = function (params, callback) {
        console.log("success from postHomeBrew");

        $http({
            url: '/homebrew',
            method: "POST",
            data: params
        })

        .then(callback);

    };

    this.delHomeBrew = function (id, callback) {
        console.log("success from delHomeBrew");

        $http({
            url: '/homebrew/' + id,
            method: "DELETE",
            data: {
                test: id
            }
        })

        .then(callback);

    };

    this.getSpecificHomeBrew = function (id, callback) {
        console.log("success from getSpecificHomeBrew");

        $http({
            url: '/homebrew/' + id,
            method: "GET",

        })

        .then(callback);

    };

    this.updateHomeBrew = function (id, callback) {
        console.log("success from getSpecificHomeBrew");

        $http({
            url: '/homebrew/' + id,
            method: "GET",

        })

        .then(callback);

    };

    this.putHomeBrew = function (id, contact, callback) {
        console.log("success from getSpecificHomeBrew");

        $http({
            url: '/homebrew/' + id,
            method: "PUT",
            data: contact
        })

        .then(callback);

    };

});