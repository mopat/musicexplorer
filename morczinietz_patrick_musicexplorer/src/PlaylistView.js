MusicExplorer.PlaylistView = (function(){
	var that = {},
	$el = null,
	tpl = null,
	currentPlayingID = null,
	startID = null,
	nextID = null,
	numLi = null,
	$nextSong = null,
	playtypeSelection = null,

	init = function(){
		$el = $("#playlist");
		$el.on("click", "li", onPlaylistItemClick);
		tpl = _.template($("#playlist-item-tpl").html());
	},

	addTrack = function(streamURL, title){
		$elArray = $el.find("li");
		numLi = $elArray.length+1;
		var item = tpl({
			streamurl: streamURL,
			listid: numLi,
			songtitle: title
		});
		$el.append(item);
	},

	onPlaylistItemClick = function(event){
		$("ul#playlist li").removeClass("active");
		$(event.currentTarget).closest("li").addClass("active");
		$(that).trigger("onPlaylistItemClicked", [$(event.currentTarget).closest("li").attr("data-streamurl")]);
		startID = parseInt($(event.currentTarget).closest("li").attr("data-list-id"));
		currentPlayingID = startID;
	},

	playNextPlaylistSong = function(){
		if(playtypeSelection == "shuffle"){
			var randomNumber = Math.floor((Math.random()*numLi)+1);
			if(randomNumber === nextID){
				randomNumber = Math.floor((Math.random()*numLi)+1);
			}
			nextID = randomNumber;
		}
		else{
			nextID = currentPlayingID+1;
			if(nextID > numLi){
				nextID = 1;
				currentPlayingID = 1;
			}
		}	
		
		$("ul#playlist li").removeClass("active");	
		$nextSong = $("li[data-list-id = " + nextID + "]");
		$nextSong.addClass("active");
		$(that).trigger("onPlayNextPlaylistSong", [$nextSong.attr("data-streamurl")]);
		currentPlayingID = parseInt($nextSong.attr("data-list-id"));
	},

	setSelection = function(selection){
		playtypeSelection = selection;
	};

	that.setSelection = setSelection;
	that.addTrack = addTrack;
	that.playNextPlaylistSong = playNextPlaylistSong;
	that.init = init;

	return that;

}());