//load("/opt/cms/xsl/arena/ItemList.js");



var Photo = Utils.extend(Item,type,{
	init: function(data, config){
		Photo.parent.init.apply(this,arguments);
		var constantMap={
				  "headerImage": {
				    "web": {
				      "768x432": {
				        "name": "768x432",
				        "width": "768",
				        "height": "432"
				      },
				      "848x704": {
				        "name": "848x704",
				        "width": "848",
				        "height": "704"
				      }
				    },
				    "web2x": {
				      "768x432": {
				        "name": "768x432",
				        "width": "768",
				        "height": "432"
				      },
				      "848x704": {
				        "name": "848x704",
				        "width": "848",
				        "height": "704"
				      }
				    }
				  },
				  "listImage": {
				    "web": {
				      "768x432": {
				        "name": "768x432",
				        "width": "768",
				        "height": "432"
				      },
				      "848x704": {
				        "name": "848x704",
				        "width": "848",
				        "height": "704"
				      }
				    }
				  }
				};

		
		var ifDefinedGetProperty = function(item, property){
			return Utils.isDefined(item)?item.getProperty(property):null
		};

		var toBoolean = function(value){
			return (Utils.isDefined(value) && typeof value === 'string' && "Y" == value.toUpperCase())?true:false;
		};
		var itemTag = this.getItem("itemTag");	
		if(type!='undefined'){
		//var constantMapData =null;// typeof config === 'string'?JSON.parse(constantMap):constantMap;
		var typeMap=constantMap["headerImage"];
		}
		this.item = null;
}});
