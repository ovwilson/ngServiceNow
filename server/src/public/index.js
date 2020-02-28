let requestBody = "";

let client = new XMLHttpRequest();
client.open("get", "http://localhost:3000/table");

client.onreadystatechange = function () {
	if (this.readyState == this.DONE) {
		document.getElementById("response").innerHTML = this.response;
	}
};

const send = () => client.send(requestBody);

// angular.module('Snow',['ngRoute','ngResource'])
// .controller('AppsOptsCtrl',function($scope,$http){
//     $scope.title = 'ngServiceNow';
//     $http.get('test').then(function(response){
//         console.log(response);
//     })
// })