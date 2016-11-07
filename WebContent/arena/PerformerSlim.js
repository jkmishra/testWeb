//load("/opt/cms/xsl/arena/Item.js");

var PerformerSlim = Utils.extend(Item,{
	init: function(data, config){
		PerformerSlim.parent.init.apply(this,arguments);
		
		var ifDefinedGetProperty = function(item, property){
			return Utils.isDefined(item)?item.getProperty(property):null
		}
		var raw = this.getRawItem();
		var fieldList = this.getItem("field").adaptTo(ItemList);
		
		this.item = {
			"performerID": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"performerID"}), "$")
		};
}});
