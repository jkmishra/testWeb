platform = null;

function transform(input, params) {
  //  load("/opt/cms/xsl/wwe/wwe-common.js");
  //  load("/opt/cms/xsl/wwe/wwe-asset.js");
  //  var inputJson = JSON.parse(input);
    var output = {};
    platform = params["platform"];
    output = getCollectionData(inputWWECollection, params);
    platform='search';
    return output;
}

function getCollectionData(input, params) {
    var result = {
	"type" : "",
	"contentId" : "",
	"headline" : "",
	"bigblurb" : "",
	"thumbnails" : {},
	"list" : []
    };
    if (input != null) {
		// list collection data process
		if (input.hasOwnProperty('list')) {
		    list = input.list[0];
		    if (list.hasOwnProperty('collection')) {
			var data = list.collection[0].item;
			processCollection(data, result, params,true);
	
		    }
		    processField(data.field, result, params);
		} else {
		    // direct collection data process in case of home
		    processCollection(input, result, params);
		    processFieldForHomePage(input.field, result, params);
		    // returning script object for home page
		    var finalResult = {};
		    finalResult = result;
		    return result;
		}
    }
    // returning json object
    var finalResult = {};
    finalResult = result;
    return JSON.stringify(finalResult, undefined, 2);
}

// processing data for field in collection
function processFieldForHomePage(fields, result, params) {
    var list = [];
    for ( var i in fields) {
		if (fields[i]["@key"] == "list") {
		    var subItemListItem = fields[i].subItemList.item;
		    if (!Array.isArray(subItemListItem)) {
				var subItemListItem = [];
				subItemListItem.push(fields[i].subItemList.item);
		    }
		    var arr = [];
		    for ( var j in subItemListItem) {
				// start fetching assets reference
				if (subItemListItem[j] && subItemListItem[j].itemType['@key'] == 'wwe-asset') {
				    list = getAssetReference(subItemListItem[j], params);
				    arr.push(list);
				    result.list[j] = arr[j];				   
				} 
		    }
		}
    }
    return result;
}

//processing data for field in collection
function processField(fields, result, params) {
    var list = [];
    for ( var i in fields) {
		if (fields[i]["@key"] == "list") {
		    var subItemListItem = fields[i].subItemList.item;
		    if (!Array.isArray(subItemListItem)) {
				var subItemListItem = [];
				subItemListItem.push(fields[i].subItemList.item);
		    }
		    var arr = [];
		    for ( var j in subItemListItem) {
				// start fetching assets reference
				if (subItemListItem[j] && subItemListItem[j].itemType['@key'] == 'wwe-asset') {
				    list = getAssetData(subItemListItem[j], params,false);
				    arr.push(list);
				    result.list[j] = arr[j];				   
				} 
		    }
		}
    }
    return result;
}


// processing data for collection
function processCollection(itemValue, result, params,isAllSearchRequired) {
    var key = itemValue.itemType["@key"];
    if (key == 'collection-wwe') {
    	result.type = 'wwe-collection';
    }
    platform='search';
    result.contentId = itemValue["@id"];
    if (itemValue && itemValue.hasOwnProperty('@lastBetaPublish')) {    	
	result.publishId = getPublishId(itemValue["@lastBetaPublish"]);    	
    }
    if (platform == "search" && itemValue && itemValue.hasOwnProperty("@state")) {
    	result.state = itemValue["@state"];    	
    }
    if (platform == "search" && isAllSearchRequired ) { 
    	result.platforms = getAllPlatformJsRef(params);
    }
    for ( var i in itemValue.field) {
		if (itemValue.field[i]["@key"] == "title") {
		    result.headline = itemValue.field[i].$
		} else if (itemValue.field[i]["@key"] == "blurb") {
		    result.bigblurb = itemValue.field[i].$
		}
		// collection case
		if (itemValue.field[i]["@key"] == "photos") {
		    var subItemPhotoList = itemValue.field[i].subItemList.item;
		    // processing photo thumbnails
		    getphotoThumbNail(subItemPhotoList, result, params);
		}
    }
    return result;
}
