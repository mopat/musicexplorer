MusicExplorer.TracklistView = (function(){
	var that = {},
	$el = null,
	tpl = null,
	$rowContainer = null,

	init = function(){
		$el = $("#results-list");
		$el.on("click", ".play-button",  onPlayClick);
		$el.on("click", ".stop-button", onStopClick);
		$el.on("click", ".add-playlist-button", onAddClick);
		$rowContainer = $("<div class='row'></div>");
		
		tpl = _.template($("#track-item-tpl").html());	
	},

	renderTracks = function(retrievedTracks){
		$el.empty();

		for (var i = 0; i < retrievedTracks.length; i++){

			var currentTrack = retrievedTracks[i];
  				 var item = tpl({
  				 id: currentTrack.id,
  				 streamurl: currentTrack.stream_url,
  				 songtitleval: currentTrack.title,
  				 artwork: currentTrack.artwork_url,
  				 useravatar: currentTrack.user.avatar_url,
  				 permalinkurl: currentTrack.permalink_url,
   				 songtitle: currentTrack.title,
  				 description: currentTrack.description	 
            });
  			$rowContainer.append(item);
  			if((i+1) % 3===0 || ((retrievedTracks.length - i) === 1) || (retrievedTracks.length - i) === 0){
  				$el.append($rowContainer);
  				$rowContainer = $("<div class='row'></div>");
  			}
  		}	
	},

	onPlayClick = function(event){
		if($(event.currentTarget).closest("li").attr("data-streamurl").length == 0){
			window.alert("No Stream-URL found");
		}
		else
		$(that).trigger("onPlayClicked", [$(event.currentTarget).closest("li").attr("data-streamurl")]);
	}, 

	onStopClick = function(event){
		$(that).trigger("onStopClicked", [$(event.currentTarget).closest("li").attr("data-streamurl")]);
	},

	onAddClick = function(event){
		if($(event.currentTarget).closest("li").attr("data-streamurl").length == 0){
			window.alert("No Stream-URL found");
		}
		else{
			$(event.currentTarget).closest("button").addClass("disabled");
			$(event.currentTarget).closest("button").text("Hinzugefügt!");
			$(that).trigger("onAddClicked", [$(event.currentTarget).closest("li").attr("data-streamurl"), $(event.currentTarget).closest("li").attr("data-songtitleval")]);
		}
	};

	that.renderTracks = renderTracks;
	that.init = init;

	return that;
}());