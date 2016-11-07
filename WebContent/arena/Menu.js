//load("/opt/cms/xsl/arena/AdInfo.js");
//load("/opt/cms/xsl/arena/ItemList.js");
//load("/opt/cms/xsl/arena/MenuItemList.js");

var Menu = Utils.extend(Item,{
	init: function(data, config){
		Menu.parent.init.apply(this,arguments);
		
		var ifDefinedGetProperty = function(item, property){
			return Utils.isDefined(item)?item.getProperty(property):null
		};
		
		var getAdverttisementValue = function(advertisementList,key){
			for(var adIndex= 0; adIndex<advertisementList.length;adIndex++ ){
				if(advertisementList[adIndex]["@key"]==key){
					return advertisementList[adIndex]["@key"];
				}
			}
			
		}
		var fieldList = this.getItem("field").adaptTo(ItemList);
		var rawMenuItems = ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"menuItem"}), "subItemList.item");
		var rawadvItem = ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"advertisment"}), "subItemList.item");

		this.item = {
			"displayName":ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"displayName"}), "$"),
			"adInfo": new AdInfo(rawadvItem, this.getConfig()),
			"menuLayout":ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"menuLayout"}), "$"),
			"menuItems": new MenuItemList(rawMenuItems,this.getConfig())
		};
}});
