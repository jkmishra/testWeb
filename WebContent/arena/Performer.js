//load("/opt/cms/xsl/arena/AppList.js");
//load("/opt/cms/xsl/arena/Menu.js");
//load("/opt/cms/xsl/arena/VenueSlimList.js");
//load("/opt/cms/xsl/arena/PerformerSlimList.js");

 Performer = Utils.extend(Item,{
	init: function(data, config){
		Performer.parent.init.apply(this,arguments);
		
		var ifDefinedGetProperty = function(item, property){
			return Utils.isDefined(item)?item.getProperty(property):null
		};
		
		var toBoolean = function(value){
			return (Utils.isDefined(value) && typeof value === 'string' && "Y" == value.toUpperCase())?true:false;
		}
		var fieldList = this.getItem("field").adaptTo(ItemList);
		var rawMenu = ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"menu"}), "subItemList.item");
        var rawAppList = ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"relatedApps"}), "subItemList.item");
		var relatedVenues = ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"relatedVenues"}), "subItemList.item");
		var homeVenues = ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"homeVenues"}), "subItemList.item");
		var relatedPerformers= ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"relatedPerformers"}), "subItemList.item");
	    var appList = new AppList(rawAppList, this.getConfig());
		var menu = new Menu(rawMenu, this.getConfig());
		var relatedVenueSlimList = new VenueSlimList(relatedVenues, this.getConfig());
		var homeVenueSlimList =  new VenueSlimList(homeVenues, this.getConfig());	
		var relatedPerformerSlimList = new PerformerSlimList(relatedPerformers, this.getConfig());
		
		this.item = {
			"performerID": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"performerID"}), "$"),
			"overrideName": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"overrideName"}), "$"),
			"appEnabled": toBoolean(ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"appEnabled"}), "$")),
			"caption": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"caption"}), "$"),
			"primaryColor": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"primaryColor"}), "$"),
			"primaryTextColor": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"primaryTextColor"}), "$"),
			"headerImage": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"headerImage"}), "$"),
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
			"ticketsAvailable": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"ticketsAvailable"}), "$"),
			"ticketsWebview": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"ticketsWebview"}), "$"),
			"homeVenues": homeVenueSlimList,
		     "relatedApps":appList,
			"relatedPerformers" : relatedPerformerSlimList,
			"relatedVenues": relatedVenueSlimList,
			"menu": menu
		};

}});

 var transform = function(jsonString, config){
    	var json = JSON.parse(jsonString);
		var configuration = typeof config === 'string'?JSON.parse(config):config;
		var performer = new Performer(json.list[0].performer[0].item, configuration);
		return performer.toString();
	}
