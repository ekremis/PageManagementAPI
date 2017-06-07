/* Controllers */
var pagemanagementControllers = angular.module('pagemanagementControllers', []);

/* HOME_CONTROLLER */ 
pagemanagementControllers.controller('HomeCtrl', function ($scope) {
													 document.getElementById("greeting").innerHTML = 'Home';
});

/* DOCUMENTATION_CONTROLLER */ 
pagemanagementControllers.controller('DocumentationCtrl', function ($scope) {
													 document.getElementById("greeting").innerHTML = 'Documentation';
});

/* VIEWPAGES_CONTROLLER */ 
pagemanagementControllers.controller('ListCtrl', function ($scope) {		
													 
													 $scope.scope_pages = pages;
													 
													  $scope.GET_pages = function() {
														var url = "http://pagesmanagement.azurewebsites.net/api/ResponsivePages";
														$.ajaxSetup({ cache: false });
														$.getJSON( url, function() { } )
														  .done(function( data ) {
															$scope.scope_pages = data;
															$scope.$apply();	//update scope view
															console.log('GET_pages ran');
															console.log(JSON.stringify($scope.scope_pages));
														  })
														  .fail(function() {
															console.log( "error" );
														  })
														  .always(function() {
															console.log( "complete" );
														  });							
													  }
													  
													 $scope.pageDelete = function(index) {
														 
															var uri_id_parameter = index; // the id of the page to be DELETED is passed as a URI parameter
															var my_url = 'http://pagesmanagement.azurewebsites.net/api/ResponsivePages' + '/' + uri_id_parameter;
															
															$.ajax({
																type: "DELETE",
																url: my_url,
																contentType: "application/json; charset=utf-8",
																dataType: "json",
																success: function(result){console.log(result); $scope.GET_pages();},
																failure: function(errMsg) {
																	console.log(errMsg);		  }
															       });	
																       };
														
													 // EXPAND page's details	
													 $scope.pageMore = function(index) {
																	var selector = '#details' + index;
																	$(selector).removeClass("hideClass");
																	};
																	
													 // HIDE page's details	
													 $scope.pageLess = function(index) {
																	var selector = '#details' + index;
																	$(selector).addClass("hideClass");
																	};		
																	
													 // EXPAND edit page
													 $scope.pageEdit = function(index) {
																	var selector = '#edit' + index;
																	$(selector).removeClass("hideClass");
																	};
																	
													 // UPDATE the page with new values
													 $scope.editOkay = function(index, pageid, pagetitle, pagedescription, pagetype, pageisActive, pagepublishedOn) {
														 
																	var uri_id_parameter = pageid; //the id of the page to be updated is passed as a parameter in the URI
																	var my_url = 'http://pagesmanagement.azurewebsites.net/api/ResponsivePages' + '/' + pageid;
																	
																	var updated_page = {
																	  "id": pageid,
																	  "title": pagetitle,
																	  "description": pagedescription,
																	  "type": pagetype,
																	  "isActive": pageisActive,
																	  "publishedOn": pagepublishedOn };
																	
																	$.ajax({
																		type: "PUT",
																		url: my_url,
																		data: JSON.stringify(updated_page),
																		contentType: "application/json; charset=utf-8",
																		dataType: "json",
																		success: function(data){console.log(JSON.stringify(data)); $scope.GET_pages();},
																		failure: function(errMsg) {
																			console.log(errMsg);        }
																		   });	
														 
																	var selector = '#edit' + index;
																	$(selector).addClass("hideClass");
																	};
													
													 $scope.editCancel = function(index) {
																	var selector = '#edit' + index;
																	$(selector).addClass("hideClass");
																	$scope.GET_pages();
														 }
													 
													 //OBJECT to be filled in for the new page			
													 $scope.newPage = {
																	  "id": 0,
																	  "title": "",
																	  "description": "",
																	  "type": 0,
																	  "isActive": true,
																	  "publishedOn": ""}
																	
													 $scope.expandAddPage = function() {
													     //$scope.newPage.id = $scope.scope_pages.length; 
														 $('#newPage').removeClass("hideClass");};
																	
																	
													 $scope.AddPage = function() {
														 $scope.newPage.publishedOn = '';
														 
														 var d = new Date();
														 var year = d.getFullYear();
														 var month = ("0" + (d.getMonth() + 1)).slice(-2)
														 var day = ("0" + d.getDate()).slice(-2);
														 var hours = ("0" + d.getHours()).slice(-2);
														 var minutes = ("0" + d.getMinutes()).slice(-2);
														 var seconds = ("0" + d.getSeconds()).slice(-2);
														 var milliseconds = d.getMilliseconds();
														 var publishDate = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
														 //console.log(publishDate);
														 
														 var temporaryNewPage = {
																	  "id": $scope.newPage.id,
																	  "title": $scope.newPage.title,
																	  "description": $scope.newPage.description,
																	  "type": $scope.newPage.type,
																	  "isActive": $scope.newPage.isActive,
																	  "publishedOn": publishDate };
														
														$.ajax({
															type: "POST",
															url: "http://pagesmanagement.azurewebsites.net/api/ResponsivePages",
															data: JSON.stringify(temporaryNewPage),
															contentType: "application/json; charset=utf-8",
															dataType: "json",
															success: function(data){console.log(JSON.stringify(data)); $scope.GET_pages();},
															failure: function(errMsg) {
																console.log(errMsg);} });													
																			 
														    //reset the object
															$scope.newPage.id = 0;
															$scope.newPage.title = '';
															$scope.newPage.description = '';
															$scope.newPage.type = 0;
															$scope.newPage.isActive = true;
															$scope.newPage.publishedOn = '';
															$('#newPage').addClass("hideClass");
															
																					}; /*AddPage*/	
																				 
													 $scope.CancelAddPage = function() {
														//reset the forms													
														$scope.newPage.id = 0;
														$scope.newPage.title = '';
														$scope.newPage.description = '';
														$scope.newPage.type = 0;
														$scope.newPage.isActive = true;
														$scope.newPage.publishedOn = '';
														$('#newPage').addClass("hideClass"); 	}; /*CancelAddPage*/
													 
													 $("#greeting").html('View Pages');
																										
																										}); /*ListCtrl*/




