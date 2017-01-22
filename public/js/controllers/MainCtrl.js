angular.module('MainCtrl', [])

 .service("contacts", function($http){
	 this.getContacts = function(searchDate,location) {
		 console.log("searchDate",searchDate);
		 var searchParam = {"searchDate": searchDate, "location": location};
      return $http({
			method: 'POST',
			url: '/test',
			data: searchParam
		}).then(function successCallback(response) {
			// this callback will be called asynchronously
			// when the response is available
			console.log("service respoonse",response.data.test);
			//$scope.tester = response.data.test;
			return response;
			
		}, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			console.log(response);

		});
    }
 })
.controller('MainController', function($scope, contacts) {

	$scope.weather = {};
      // calling our submit function.
        $scope.submitForm = function() {
			console.log($scope.weather);
			var loaction = $scope.weather.location;
			var searchDate = "current";
			contacts.getContacts(searchDate,loaction)
			.then(function(response) {
				console.log("ttt",response);
				
				// $scope.location = response.data.name;
				// $scope.country = response.data.sys.country;
				$scope.weather = response.data.current;
				$scope.weatherPre = response.data.previous;
			}, function() {
			$scope.error = 'unable to get the ponies';
			});
		};

 
	

});