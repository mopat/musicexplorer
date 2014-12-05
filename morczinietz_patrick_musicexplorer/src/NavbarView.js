MusicExplorer.NavbarView = (function(){
	var that = {},
	$searchInput = null,
	$searchButton = null,
	$playtypeSelection = null,

	init = function(){
		$searchInput = $("#search-input");
		$searchButton = $("#search-button");	
		$playtypeSelection = $('#playtype-selection');
		
		$playtypeSelection.on("change", onSelectionChanged);	
		$searchButton.on("click", onSearchButtonClicked); 	
	},

	onSearchButtonClicked = function(event){
		$searchButton.addClass("disabled");
		$searchButton.text("Suche...");
		$(that).trigger("searchButtonClicked", [$searchInput.val()]);
	},

	setSearchButton = function(){	
		$searchButton.removeClass("disabled");
		$searchButton.text("Suchen");
	},

	onSelectionChanged = function(event){
		var optionSelected = $("option:selected", this);
	    var valueSelected = this.value;
  		$(that).trigger("selectionChanged", [valueSelected]);    
	};

	that.setSearchButton = setSearchButton;
	that.init = init;

	return that;
}());