//load("/opt/cms/xsl/arena/ItemList.js");
//load("/opt/cms/xsl/arena/App.js");

var AppList = Utils.extend(ItemList,{
	init: function(data, config){
		AppList.parent.init.apply(this,arguments);
		this.item = [];
		var raw = this.getRawItem();
		for(index in raw){
			this.item[index]=new App(raw[index],this.getConfig());
		}
}});
