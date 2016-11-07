//load("/opt/cms/xsl/arena/Utils.js");

var Item = function(data, config){
	this.init(data, config);
};

Item.prototype = {
	init: function(data, config){
		if(typeof data === 'undefined' && data == null){
			return null;
		}
		if(typeof config === 'undefined' && config == null){
			return null;
		}
		var itemData = typeof data!='undefined'?data:null;
		var itemConfig = config;
		Object.defineProperty(this,"config",{get:function(){return itemConfig}});
		Object.defineProperty(this,"rawItem",{get:function(){return itemData}});
		Object.defineProperty(this,"constantMap",{get:function(){return itemData}});
		this.item = data;
	},
	adaptTo: function(clazz){
		return new clazz(this.getRawItem(),this.getConfig());
	},
	getConfig:function(){
		return this.config;
	},
	getConstantMap: function(){
		return this.constantMap;
	},
	getRawItem: function(){
		return this.rawItem;
	},
	getItem: function(path){
		// return item at specified path in rawItem.
		var itemAtPath = Utils.jsonPathToValue(this.getRawItem(), path);
		return typeof itemAtPath != 'undefined'?new Item(itemAtPath, this.getConfig()):null;
	},
	getProperty: function(path){
		// return property at specified json path in rawItem.
		var value = Utils.jsonPathToValue(this.getRawItem(), path);
		return typeof value != 'undefined'?value:null;
	},
	getBaseType: function(){
		var item  = this.item;
		if(item != null){
			if(item.constructor==String){
				return("string");
			}else if(item.constructor==Number){
				return("number");
			}else if(item.constructor==Boolean){
				return("boolean");
			}else if(item.constructor==Array){
				return("array");
			}else if(item.constructor==Function){
				return("function");
			}else if(item.constructor==Object){
				return("object");
			}else{
				return("undefined");
			}
		}else{
			return("null");
		}
	},
	toJSON: function(){
		return this.item;
	},
	toString: function(){
		return JSON.stringify(this);
	}
};

