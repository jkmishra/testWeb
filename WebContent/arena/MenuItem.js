//load("/opt/cms/xsl/arena/ItemList.js");

var MenuItem = Utils.extend(Item,{
	init: function(data, config){
		MenuItem.parent.init.apply(this,arguments);
		
		var ifDefinedGetProperty = function(item, property){
			return Utils.isDefined(item)?item.getProperty(property):null
		};
		
	
		var toBoolean = function(value){
			return (Utils.isDefined(value) && typeof value === 'string' && "Y" == value.toUpperCase())?true:false;
		};
		
		var fieldList = this.getItem("field").adaptTo(ItemList);
		var menufieldList = fieldList.item;
		
		var getKey = function(menufieldList,key){
			for (var int = 0; int <menufieldList.length; int++) {
				if(menufieldList[int].item["@key"]==key){
				if(menufieldList[int].item.$){
					return menufieldList[int].item.$;
				}
				else if(menufieldList[int].item.subItemList.item.field)
					return menufieldList[int].item.subItemList.item.field;
				}
				else {
					null;
				}
			}
		}
		
		
		this.item = {
				"displayName":ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"displayName"}), "$"),
				"displayNameColor": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"displayNameColor"}), "$"),
				"displayText": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"displayText"}), "$"),
				"displayTextColor": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"displayTextColor"}), "$"),
				"linkURL": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"linkURL"}), "$"),
				"displayImage": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"displayImage"}), "$"),
				"dataTier": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"dataTier"}), "$"),
				"webviewControl": toBoolean(ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"webviewControl"}), "$")),
				"header": toBoolean(ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"header"}), "$")),
				"checkedInOnly": toBoolean(ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"checkedInOnly"}), "$")),
				"locationGate": toBoolean(ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"locationGate"}), "$")),
				"autoDismiss": toBoolean(ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"autoDismiss"}), "$")),
				"checkedInStatus": toBoolean(ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"checkedInStatus"}), "$")),
				"shareURL": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"shareURL"}), "$"),
				"shareText": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"shareText"}), "$"),
				"webviewHeaderText": ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"webviewHeaderText"}), "$"),
				"loginRequired": toBoolean(ifDefinedGetProperty(fieldList.getFirstFilteredItem({"key":"@key","value":"loginRequired"}), "$"))
		};
}});
