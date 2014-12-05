MusicExplorer.MainController = (function() {
	var that = {},
	mainModel = null,
	trackListView = null,
	playlistView = null,
	navbarView = null,

	init = function() {
		mainModel = MusicExplorer.MainModel;
		trackListView = MusicExplorer.TracklistView;
		navbarView = MusicExplorer.NavbarView;
		playlistView = MusicExplorer.PlaylistView;

		mainModel.init();
		trackListView.init();
		navbarView.init();
		playlistView.init();


		$(navbarView).on("searchButtonClicked", onSearchButtonClicked);
		$(navbarView).on("selectionChanged", onSelectionChanged);
		$(mainModel).on("onSearchComplete", onSearchComplete);
		$(trackListView).on("onPlayClicked", onPlayClicked);
		$(trackListView).on("onStopClicked", onStopClicked);
		$(trackListView).on("onAddClicked", onAddClicked);
		$(playlistView).on("onPlaylistItemClicked" , onPlaylistItemClicked);
		$(mainModel).on("onPlaylistSongCompleted", onPlaylistSongCompleted);
		$(playlistView).on("onPlayNextPlaylistSong", onPlayNextPlaylistSong);
		$("#search-form").on("submit", onSearchFormSubmit);
	},

	onSearchFormSubmit = function(event){
		event.preventDefault();
	},

	onSearchButtonClicked = function(event, searchVal){
		mainModel.searchTracks(searchVal);
	},

	onSearchComplete = function(event, retrievedTracks){
		navbarView.setSearchButton();
		trackListView.renderTracks(retrievedTracks);
	}, 

	onPlayClicked = function(event, streamURL){
		mainModel.playClickedTrack(streamURL);
	},

	onStopClicked = function(event, streamURL){
		mainModel.stopPlayingTrack(streamURL);
	},

	onAddClicked = function(event, streamURL, title){
		playlistView.addTrack(streamURL, title);
	},

	onPlaylistItemClicked = function(event, streamURL){
		mainModel.playPlaylistTracks(streamURL);
	},

	onPlaylistSongCompleted = function(event){
		playlistView.playNextPlaylistSong();
	}, 

	onPlayNextPlaylistSong = function(event, streamURL){
		mainModel.playPlaylistTracks(streamURL);
	},

	onSelectionChanged = function(event, selection){
		playlistView.setSelection(selection);
	};

	that.init = init;

	return that;
}());