module.exports = (duduApp) => {


	duduApp.directive('focus' , ['$rootScope' ,function($rootScope) {

		return {

			link: function(scope, ele, attr) {

				ele.on('focus', function() {

					$rootScope.navAbsolute = true;
				})

				ele.on('blur', function() {

					$rootScope.navAbsolute = false;
				})
			}
		}
	}])

}