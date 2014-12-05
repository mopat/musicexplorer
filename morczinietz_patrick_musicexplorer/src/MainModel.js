MusicExplorer.MainModel = (function() {
	var that = {},
        client_id = "41a1b051f38f500beda7c100744fa45a",

	init = function() {
        SC.initialize({
            client_id: "41a1b051f38f500beda7c100744fa45a"
        });
	},

	searchTracks = function(query){
        ajaxQuery(query);
        function ajaxQuery(query) {
             $.ajax({
                url: getScUrl(query),
                data: {
                    format: 'json'
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("ERROR " + errorThrown + " at" + XMLHttpRequest);
                },
                dataType: 'json',
                success: function (data) {
                    if (data.length != 0) {
                        $(that).trigger("onSearchComplete", [data]);
                        console.log("QUERY " , query);

                    }
                },
                type: 'GET'
            });
        }

	},

        getScUrl = function (query) {
            return "https://api.soundcloud.com/tracks?&q=" + query + "&client_id=" + client_id + "&limit=" + "20";
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