var GET_pages_init = function() {
  var url = "http://pagesmanagement.azurewebsites.net/api/ResponsivePages";
  $.ajaxSetup({ cache: false });
  $.getJSON( url, function() { } )
	.done(function( data ) {
	  pages = data;
	  window.location.hash = '#/list_pages';
	})
	.fail(function() {
	  console.log( "error" );
	})
	.always(function() {
	  console.log( "complete" );
	});							
}











