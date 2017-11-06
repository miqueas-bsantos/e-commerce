angular.module('bringmybeer').controller('HomeUserController', ['$scope', 'SessionService', '$state', '$rootScope', 'productService', 'alertService','userService', '$rootScope', 
	function($scope, SessionService, $state, $rootScope, productService, alertService, userService, $rootScope){
	$scope.disable = true;
	
	$scope.logout = function(){
		SessionService.logout();
	}

	$scope.goTo = function(name){
		$state.go(name);
	}

	$scope.open = function(){
		$('nav.side-navbar').toggleClass("open")
	}	

	$scope.close = function(){
		$('nav.side-navbar').removeClass("open")
	}
	

	$scope.updateUser = function(user){
		if($scope.disable){
			$scope.disable = !$scope.disable;
			return;
		}
		console.log(user);
		$scope.disable = !$scope.disable;
	}


	$scope.updateAddress = function(address){
		//still workin on it
	}

	$scope.getAddress = function(ad){
		productService.getAddres(ad.zipcode)
					  .then(function(address){
					  	index = $rootScope.user.address.indexOf(ad);
					  	$rootScope.user.address[index].street = address.logradouro;
					  	$rootScope.user.address[index].complement = address.complemento;
					  	$rootScope.user.address[index].neighborhood = address.bairro;
					  	$rootScope.user.address[index].city = address.localidade;
					  	$rootScope.user.address[index].state = address.uf;
					  	console.log($rootScope.user.address[index], address);
					  }).catch(function(error){
					  	alertService.setMessage(7000, error.message, error.title);
					  	console.log(error);
					  });
	}


	$scope.searchOrders = function(){
		userService.getOrders()
			.then(function(orders){
				$rootScope.orders = orders;
				// console.log($scope.orders);
			}).catch(function(error){
				alertService.setMessage(7000, error.message, error.title);
			});
	}

	$scope.openList = function(list, event){
		$scope.list = list;
		var _class = (event.currentTarget.className).replace(" ", " .").split(" ");
		$('.lines').removeClass("bg-dark");
		$(_class[1]).addClass("bg-dark");
	}

	if($rootScope.orders.length === 0){
		$scope.searchOrders();
	}

	$scope.totalList = function(list){
		var total = 0;
		list.forEach(function(product){
			total += product.price * product.quantity;
		});

		return total;
	}

	$scope.cleanList = function(){
		$scope.list = [];
		$('.lines').removeClass("bg-dark");
	}
}])
