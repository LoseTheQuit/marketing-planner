'use strict';

console.log("OUTSIDE: alloy Controller");

app.controller('alloyController', function ($scope, $http, alloyService) {

    console.log("INSIDE: alloy Controller");

    $scope.deselect = function () {

        $scope.event = "";

    }

    $scope.refresh = function () {

        alloyService.getHomeBrew(function (response) {

            console.log("_________________________________");
            console.log("getHomebrew response.DATA: ");
            console.info(response);
            console.log("_________________________________");
            $scope.todo = response;

        });


    }

    $scope.refresh();


    //    $scope.addCustom = function () {
    //
    //        console.log($scope.event)
    //
    //        alloyService.postHomeBrew($scope.event, function (response) {
    //
    //            console.log("_________________________________");
    //            console.log("postHomeBrew SUCCESS");
    //            $scope.refresh();
    //        })
    //
    //    }


    $scope.add = function () {

        console.log($scope.event)

        alloyService.postHomeBrew($scope.event, function (response) {

            console.log("_________________________________");
            console.log("postHomeBrew SUCCESS");
            $scope.refresh();
        })

        $scope.deselect();

    }


    $scope.remove = function (id) {

        console.log(id);

        alloyService.delHomeBrew(id, function (response) {
            console.log('THE ID: ' + id);
            console.log("_________________________________");
            console.log("deleteHomeBrew SUCCESS");
            $scope.refresh();
        })
    }

    $scope.edit = function (id) {

        console.log(id)

        alloyService.getSpecificHomeBrew(id, function (response) {

            console.log("_________________________________");
            console.log("getSpecificHomeBrew SUCCESS");
            console.log(response);
            $scope.event = response.data;
            $scope.refresh();

        })

    }

    $scope.update = function () {

        console.log($scope.event._id);
        console.log($scope.event);

        alloyService.putHomeBrew($scope.event._id, $scope.event, function (response) {

            console.log("_________________________________");
            console.log("updateHomeBrew SUCCESS");
            console.log(response);
            $scope.refresh();

        })

        $scope.deselect();
    }



    /*
    
    THIS IS WHERE I START TO MAKE THE MAGIC HAPPEN!
    
    */

    //    setInterval(function () {
    //
    //        $scope.high = 180;
    //        $scope.lo = -150;
    //        $scope.randomLat = Math.floor((Math.random() * $scope.high) + $scope.lo);
    //        $scope.randomLong = Math.floor((Math.random() * $scope.high) + $scope.lo);
    //
    //        $scope.customeventinates = {
    //            lat: $scope.randomLat,
    //            long: $scope.randomLong
    //        }
    //        console.info('Lat: ' + $scope.randomLat + ' Long: ' + $scope.randomLong);
    //        $scope.customAdd();
    //
    //    }, 10000);

    $scope.customAdd = function () {

        console.log($scope.event)

        alloyService.postHomeBrew($scope.customeventinates, function (response) {

            console.log("_________________________________");
            console.log("postHomeBrew SUCCESS");
            $scope.refresh();
        })

    }


});