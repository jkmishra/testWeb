//load("/opt/cms/xsl/arena/ItemList.js");
//load("/opt/cms/xsl/arena/Photo.js");

var App = Utils.extend(Item,{
	init: function(data, config){
		App.parent.init.apply(this,arguments);
		
		var ifDefinedGetProperty = function(item, property){
			return Utils.isDefined(item)?item.getProperty(property):null
		};

		var toBoolean = function(value){
			return (Utils.isDefined(value) && typeof value === 'string' && "Y" == value.toUpperCase())?true:false;
		};

		var fieldList = this.getItem("field").adaptTo(ItemList);
		
		this.item = {
			"appName":ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"appName"}), "$"),
			"appIcon":new Photo(null,null, this.getConfig()),
			"appURLiOS":ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"appURLiOS"}), "$"),
			"appiOSPackage":ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"appiOSPackage"}), "$"),
			"appURLAndroid":ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"appURLAndroid"}), "$"),
			"appAndroidPackage":ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"appAndroidPackage"}), "$"),
			"appIntent":ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"appIntent"}), "$"),
			"primary":toBoolean(ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"primary"}), "$"))
		 };
}});
