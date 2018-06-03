/**
 * 
 */
function test(){
	//$.get("SearchServlet", function(responseText) {
	//	$("#demo").text(responseText);
	//});
	
	let media = "&entity=audiobook"
	let limit = "&limit = 15";
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	       // Typical action to be performed when the document is ready:
	    	var obj = JSON.parse(this.responseText);
	    	//var str = JSON.stringify(this, null, 10); 
	   
	    	document.getElementById("demo").innerHTML = this.responseText;
	    	      //obj.results.collectionName;
	    	
	    }
	};
	xhr.open("GET", "https://itunes.apple.com/search?term=rye&country=us&entity=audiobook&limit = 15", true);
	xhr.send();
}

$(document).ready(function() {
	$("#searchText").keydown(function (e){
		if (e.which==13){
			//alert("Enter Key Pressed");
			$(".results").empty();
			var text = $("#searchText").val();
			searchBooks(text);
		}
	});
	$("#searchButton").click(function(){
		$(".results").empty();
		var text = $("#searchText").val();
		searchBooks(text);
	});
	
	function searchBooks(text){
		$.get("SearchServlet", {parameter : text}, function(responseText){
			response = $.parseJSON(responseText);
			if(response.results.length==0){
				$(".results").append("No results.");
			}else{
				outputResults(response);
			}
		});
	}
	
	function outputResults(response){
		for(var i=0; i<response.results.length; i++){
			var resultItems = '<div class="item">' +
									"<img src = '" + response.results[i].artworkUrl100 + "'>" + "</br>" +
									'<a href="' + response.results[i].collectionViewUrl + '">iTunes</a>'  + 
									'<div class="bookName">\
										<h2>' + response.results[i].collectionName + '</h2>\
										<p>(' + response.results[i].primaryGenreName + ")</p>\
									</div>" + 
									"<h4>" + response.results[i].artistName + "</h4>" + 
									"<p>" + response.results[i].description + "</p>" + 
									"<p>Price: $" +  response.results[i].collectionPrice + "</p>" + 
								"</div>"
			$(".results").append(resultItems);
		}
	}
});