MusicExplorer.MainModel = (function() {
	var that = {},

	init = function() {
        SC.initialize({
            client_id: "41a1b051f38f500beda7c100744fa45a"
        });
	},

	searchTracks = function(query){
        SC.get('/tracks', {q: query, filter: 'streamable'}, function (tracks) {
            console.log(tracks);
            if (tracks.length === 0)
                window.alert("No Results found for " + query);
            else {
                $(that).trigger("onSearchComplete", [tracks]);

            }
        });
	},


	playClickedTrack = function(streamURL){
		SC.stream(streamURL, {
			onfinish: function(){ 
			}}, 
			function(sound){
				soundManager.stopAll();
				sound.play();
			});
	},

	playPlaylistTracks = function(streamURL){
		SC.stream(streamURL, {
			onfinish: function(){ 
				$(that).trigger("onPlaylistSongCompleted");
				}}, 
			function(sound){
				soundManager.stopAll();
				sound.play();
		});
	},

	stopPlayingTrack = function(streamURL){
		SC.stream(streamURL, function(sound){
		  soundManager.stopAll();
		});			
	};

	that.playPlaylistTracks = playPlaylistTracks;
	that.playClickedTrack = playClickedTrack;
	that.stopPlayingTrack = stopPlayingTrack;
	that.searchTracks = searchTracks;
	that.init = init;

	return that;
}());