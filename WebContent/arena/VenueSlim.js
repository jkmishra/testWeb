//load("/opt/cms/xsl/arena/Item.js");

var VenueSlim = Utils.extend(Item,{
	init: function(data, config){
		VenueSlim.parent.init.apply(this,arguments);
		
		var ifDefinedGetProperty = function(item, property){
			return Utils.isDefined(item)?item.getProperty(property):null
		}
		var raw = this.getRawItem();
		var fieldList = this.getItem("field").adaptTo(ItemList);
		
		this.item = {
			"venueID": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"venueID"}), "$")
		};
}});
