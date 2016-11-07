//load("/opt/cms/xsl/arena/ItemList.js");
//load("/opt/cms/xsl/arena/VenueSlim.js");

var VenueSlimList = Utils.extend(ItemList,{
	init: function(data, config){
		VenueSlimList.parent.init.apply(this,arguments);
		this.item = [];
		var raw = this.getRawItem();
		for(index in raw){
			this.item[index]=new VenueSlim(raw[index],this.getConfig());
		}
}});
