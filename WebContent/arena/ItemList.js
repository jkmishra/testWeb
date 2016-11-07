//load("/opt/cms/xsl/arena/Item.js");

var ItemList = Utils.extend(Item,{
	init: function(data, config){
		data = (data instanceof Array)?data:[data];
		ItemList.parent.init.apply(this,arguments);
		this.item = [];
		var raw = this.getRawItem();
		for(index in raw){
			this.item[index]=new Item(raw[index],this.getConfig());
		}
	},
	getItemAt:function(index){
		if(typeof index === 'undefined' || index == null){
			return null;
		}
		if(this.item instanceof Array && Utils.isNumber(index)){
			//Normal Array
			return (index>=0&&index<this.item.length)?this.item[index]:null;
		}else{
			//Associative Array
			return (typeof this.item[index] !== 'undefined')?this.item[index]:null;
		}
	},
	// filterConfig --> {'key':'key name','value':'value corresponding to key'}
	getFilteredList:function(filterConfig){
		var isArrayList = (this.item instanceof Array)?true:false;
		var filteredList = isArrayList?[]:{};
		var index = isArrayList ? 0 : '';
		if(typeof filterConfig !== 'object' || Utils.isEmptyString(filterConfig.key) || Utils.isEmptyString(filterConfig.value)){
			return this.item;
		}
		for(key in this.item){
			var item = this.getItemAt(key);
			if(Utils.isDefined(item)){
				var prop = item.getProperty(filterConfig.key);
				if(Utils.isDefined(prop) && prop == filterConfig.value){
					var filteredListKey = isArrayList ? (index++) : key;
					filteredList[filteredListKey] = item;
				}
			}
		}
		return filteredList;		
	},
	getFirstFilteredItem: function(filterConfig){
		// this needs to be optimized to loop through list only till it don't get first match.
		var filteredList = this.getFilteredList(filterConfig);
		var item = null;
		if(Utils.isDefined(filteredList)){
			for(key in filteredList){
				item = filteredList[key];
				break; // breaking after fatching first item.
			}
		}
		return item;
	}
});

