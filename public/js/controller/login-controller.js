angular.module('bringmybeer').controller('LoginController', ['$scope', 'alertService', '$rootScope', '$state', 'cartService', 'userService', function($scope, alertService, $rootScope, $state, cartService, userService){

	$scope.show = false;

	$scope.showPassword = function(){
		$scope.show = !$scope.show;
	}

	$scope.login = function(user){
		var credentials = {
			email: user.email,
			password: user.password
		}
		userService.getUser(credentials)
			.then(function(currentUser){
				$state.go($rootScope.lastRoute);
			}).catch(function(error){
				alertService.setMessage(4000, error.message, error.title);
			});
	}
}]);