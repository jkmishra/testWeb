//load("/opt/cms/xsl/arena/ItemList.js");
//load("/opt/cms/xsl/arena/MenuItem.js");

var MenuItemList = Utils.extend(ItemList,{
	init: function(data, config){
		MenuItemList.parent.init.apply(this,arguments);
		this.item = [];
		var raw = this.getRawItem();
		for(index in raw){
			this.item[index]=new MenuItem(raw[index],this.getConfig());
		}
}});
