var myApp = angular.module('myApp', ['firebase']);

myApp.controller('ProductsCtrl', ['$scope','$firebaseArray', function($scope, $firebaseArray) {

            var myProducts = new Firebase ('https://shining-heat-464.firebaseio.com/users');

            $scope.products = $firebaseArray(myProducts);

            $scope.showForm = function (){
                    $scope.addFormShow = true;
                    $scope.editFormShow = false;
                    clearForm();
            }

            $scope.hideForm = function (){
                    $scope.addFormShow = false;
            }
            function clearForm (){
                $scope.productName = '';
                $scope.productCode = '';
                $scope.description = '';
            }

            $scope.addFormSubmit = function (){
                $scope.products.$add({
                    productName: $scope.productName,
                    productCode: $scope.productCode,
                    description: $scope.description
                });

                clearForm();
            }

            $scope.showProduct = function (product){
                $scope.editFormShow = true;
                $scope.addFormShow = false;
                $scope.productName = product.productName;
                $scope.productCode = product.productCode;
                $scope.description = product.description;
                $scope.id = product.$id;
            }

            $scope.editFormSubmit = function (){
                var id = $scope.id;
                var record = $scope.products.$getRecord(id);
                record.productName = $scope.productName;
                record.productCode = $scope.productCode;
                record.description = $scope.description;

                $scope.product.$save(record);
            }

            $scope.deleteProduct = function (product){
                $scope.products.$remove(product);
            }




}]);
