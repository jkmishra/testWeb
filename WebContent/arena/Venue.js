//load("/opt/cms/xsl/arena/AppList.js");
//load("/opt/cms/xsl/arena/Menu.js");
//load("/opt/cms/xsl/arena/VenueSlimList.js");
//load("/opt/cms/xsl/arena/PerformerSlimList.js");

var Venue = Utils.extend(Item,{
	init: function(data, config){
		Venue.parent.init.apply(this,arguments);
		
		var ifDefinedGetProperty = function(item, property){
			return Utils.isDefined(item)?item.getProperty(property):null
		};
		
		var toBoolean = function(value){
			return (Utils.isDefined(value) && typeof value === 'string' && "Y" == value.toUpperCase())?true:false;
		}
		var fieldList = this.getItem("field").adaptTo(ItemList);
		var rawMenu = ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"menu"}), "subItemList.item");
		var rawAppList = ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"partnerApps"}), "subItemList.item");
		var relatedVenues = ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"relatedVenues"}), "subItemList.item");
		var residentVenues = ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"residentVenues"}), "subItemList.item");
		var parentVenues = ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"parentVenues"}), "subItemList.item");
		var homePerformers= ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"homePerformers"}), "subItemList.item");
		var headerImg= ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"headerImage"}), "subItemList.item");
		var appList = new AppList(rawAppList, this.getConfig());
		var menu = new Menu(rawMenu, this.getConfig());
		var relatedVenueSlimList = new VenueSlimList(relatedVenues, this.getConfig());
		var parentVenueSlimList = new VenueSlimList(parentVenues, this.getConfig());
		var residentVenueSlimList = new VenueSlimList(residentVenues, this.getConfig());
		var performerSlimList = new PerformerSlimList(homePerformers, this.getConfig());
		var photoList=new Photo(headerImg,this.getConfig(),"headerImage");
		
		this.item = {
			"venueID": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"venueID"}), "$"),
			"overrideName": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"overrideName"}), "$"),
			"drivingDirectionsLatLong": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"drivingDirectionsLatLong"}), "$"),
			"checkInLatLong": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"checkInLatLong"}), "$"),
			"appEnabled": toBoolean(ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"appEnabled"}), "$")),
			"caption": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"caption"}), "$"),
			"primaryColor": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"primaryColor"}), "$"),
			"primaryTextColor": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"primaryTextColor"}), "$"),
			"headerImage": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"headerImage"}), "$"),
			"mapThumbnail": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"mapThumbnail"}), "$"),
			"listImage": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"listImage"}), "$"),
			"thumbnailImage": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"thumbnailImage"}), "$"),
			"thumbnailCaption":ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"thumbnailCaption"}), "$"),
			"sponsorshipImage": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"sponsorshipImage"}), "$"),
			"sponsorURL": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"sponsorURL"}), "$"),
			"lite": toBoolean(ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"lite"}), "$")),
			"highlightsAvailable": toBoolean(ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"highlightsAvailable"}), "$")),
			"websiteURL": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"websiteURL"}), "$"),
			"snapchat": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"snapchat"}), "$"),
			"facebook": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"facebook"}), "$"),
			"twitter": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"twitter"}), "$"),
			"instagram": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"instagram"}), "$"),
			"hashtags": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"hashtags"}), "$"),
			"eventsAvailable": toBoolean(ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"eventsAvailable"}), "$")),
			"eventsText": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"eventsText"}), "$"),
			"scheduleOverrideURL": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"scheduleOverrideURL"}), "$"),
			"scheduleOverrideText": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"scheduleOverrideText"}), "$"),
			"relatedApps":appList,
			"relatedVenues": relatedVenueSlimList,
			"parentVenues": parentVenueSlimList,
			"residentVenues": residentVenueSlimList,
			"homePerformers": performerSlimList,
			"menu": menu
		};
}});

var transform = function(jsonString, config){
	var json = jsonString;
	var configuration = typeof config === 'string'?JSON.parse(config):config;
	var venue = new Venue(json.list[0].venue[0].item, configuration);
	return venue.toString();
}
