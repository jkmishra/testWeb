//load("/opt/cms/xsl/arena/ItemList.js");
//load("/opt/cms/xsl/arena/PerformerSlim.js");

var PerformerSlimList = Utils.extend(ItemList,{
	init: function(data, config){
		PerformerSlimList.parent.init.apply(this,arguments);
		this.item = [];
		var raw = this.getRawItem();
		for(index in raw){
			this.item[index]=new PerformerSlim(raw[index],this.getConfig());
		}
}});
