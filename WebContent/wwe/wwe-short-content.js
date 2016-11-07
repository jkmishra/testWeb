var platform = null;

function transform(input, params) {
    load("/opt/cms/xsl/wwe/wwe-common.js");
    var inputJson = JSON.parse(input);
    var output = {};
    platform = params["platform"];
    output = processDataForShort(inputWWE, params);
    return output;
}

function processDataForShort(input, params) {
    var result = null;
    var finalResult = {};
    if (input != null) {
	if (input.hasOwnProperty('list')) {
	    list = input.list[0];
	    if (list.hasOwnProperty('short')) {
		var data = list.short[0].item;
		result = getShortContentData(data, params, '');
		finalResult = result;
	    }
	}
    }
    return JSON.stringify(finalResult, undefined, 2);
}

function getShortContentData(itemList, params) {
    var platform = null;
    if (typeof params != 'undefined') {
	platform = params["platform"];
    }
    var arr = [];
    var list = {
	"type" : "",
	"state" : "",
	"contentId" : "",
	"userDate" : "",
	"headline" : "",
	"blurb" : "",
	"url" : "",
	"seo-headline" : "",
	"thumbnails" : {}
    };
    var isPhoto = false;
    var itemListForThumbnails;
    if (itemList && itemList.hasOwnProperty('@id')) {
	list.contentId = itemList["@id"];
    }
    if (itemList && itemList.hasOwnProperty("@state")) {
	list.state = itemList["@state"];
    }
    if (itemList && itemList.hasOwnProperty('itemType')) {
	list.type = itemList.itemType["@key"];
    }
    if (itemList && itemList.hasOwnProperty("@userDate")) {
	list.userDate = itemList["@userDate"];
    }   
    if(itemList && itemList.hasOwnProperty('itemTag')){
	for(var i in itemList.itemTag){
	    var tag=itemList.itemTag[i];
	    if(tag && tag["@type"] &&tag["@type"]=="title"){
		 list["seo-headline"] = tag["@displayName"];
	    }
	 }
     }    
    if (itemList && itemList.hasOwnProperty('field')) {
	for ( var j in itemList.field) {
	    if (itemList.field[j]["@key"] == "headline") {
		list.headline = itemList.field[j].$
	    } else if (itemList.field[j]["@key"] == "blurb") {
		list.blurb = itemList.field[j].$
	    } else if (itemList.field[j]["@key"] == "thumbnails") {
		itemListForThumbnails = itemList.field[j];
	    } else if (itemList.field[j]["@key"] == "photos") {
		isPhoto = true;
		var thumbnails = {};
		var subItemPhotoList = itemList.field[j].subItemList.item;
		for ( var p in subItemPhotoList.field) {
		    if (subItemPhotoList.field[p]["@subTypeKey"] == "photo") {
			getphotoThumbNail(subItemPhotoList, list, params);
		    }
		}
	    }
	}
    }
    if (itemListForThumbnails && !isPhoto) {
	getThumbnails(itemListForThumbnails, list);
    }    
    removeExtraThumbNail(list);
    return list;
}

function getThumbnails(itemList,list) {
	var thumbnails = {};
	var thumbnailList = itemList.subItemList.item;
	if (!Array.isArray(thumbnailList)) {
	    var item = [];
	    item.push(thumbnailList)
	} else {
	    item = thumbnailList
	}
	var obj = {};
	for ( var i in item) {
	    var value = {
		"type" : "",
		"width" : "",
		"height" : "",
		"src" : ""
	    };
	    var thumbnailType, location;
	    for ( var thumbnail in item[i].field) {
		if (item[i].field[thumbnail]["@key"] == "thumbnail-type") {
		    thumbnailType = thumbnail;
		} else if (item[i].field[thumbnail]["@key"] == "location") {
		    location = thumbnail;
		}
	    }
	    var getData = {};
	    value.type = item[i].field[thumbnailType].$
	    value.src = item[i].field[location].$
	    // calling function to get width and height by passing type
	    getData = new ImageTypeDimensionMap()
		    .getWidthHeightByType(value.type);
	    value.width = getData["width"];
	    value.height = getData["height"];
	    if (value.width && value.height ) {
		obj[value.width + 'x' + value.height] = value;
	    }
	}		
	list.thumbnails = obj;
}


// this is required to put on thumbnail of type 60 or 62
function removeExtraThumbNail(list) {
    if (list && list.thumbnails) {
	var data = list.thumbnails;
	for ( var th in data) {
	    if (data.hasOwnProperty(th)) {
		var arrData = data[th];
		if (arrData && !(arrData.type == 60 || arrData.type == 62)) {
		    delete data[th];
		}
	    }
	}
    }
    list.thumbnails = data;
}
