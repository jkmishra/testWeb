//load("/opt/cms/xsl/arena/ItemList.js");

var AdInfo = Utils.extend(Item,{
	init: function(data, config){
		AdInfo.parent.init.apply(this,arguments);
		
		var ifDefinedGetProperty = function(item, property){
			return Utils.isDefined(item)?item.getProperty(property):null
		};

		var fieldList = this.getItem("field").adaptTo(ItemList);
		
		this.item = {
			"adType": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"adType"}), "$"),
			"adProvider":ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"adProvider"}), "$"),
			"adBackgroundColor":ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"adBackgroundColor"}), "$")
		};
}});
