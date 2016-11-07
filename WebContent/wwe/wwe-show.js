var platform = null;
function transform(input, params) {
  //  load("/opt/cms/xsl/wwe/wwe-asset.js");
   // load("/opt/cms/xsl/wwe/wwe-common.js");
    //var inputJson = JSON.parse(input);
    var output = {};
    platform = params["platform"];
    // calling function for processing of show
    output = processDataForShow(inputShow, params);
    return output;
}

function processDataForShow(input, params) {

    var result = {
	"type" : "",
	"contentId" : "",
	"show_name" : "",
	"show_name_key" : "",
	"headline" : "",
	"bigblurb" : "",
	"genre":"",
	"thumbnails" : {},
	"list" : []
    };

    if (input != null) {
		if (input.hasOwnProperty('list')) {
	
		    var itemShow = {};
	
		    for (var index = 0; index < input.list.length; index++) {
				if (input.list[index].hasOwnProperty('show')) {
				    itemShow = input.list[index].show[0];
				}
		    }
	
		    if (itemShow.hasOwnProperty('item')) {
				for ( var i in input.list) {
				    if (input.list[i].hasOwnProperty('show')) {
						list = input.list[i];
						for ( var i in list.show) {
						    if (list.show[i].hasOwnProperty('item')) {
			
							var item = list.show[i].item;
							/* get show data for homepage & show JSON */
							result = getShowData(item, result, params,true);
			
						    }
						}
				    } else if (input.list[i].hasOwnProperty('asset')) {
						var assetList = input.list[i];
						var itemList;
						var assetListObject = assetList.asset;
						if (!Array.isArray(assetListObject)) {
						    var itemList = [];
						    itemList.push(assetListObject)
						} else {
						    itemList = assetListObject
						}
						var arr = [];
						for ( var i in itemList) {
						    list = getAssetData(itemList[i].item,params);
						    arr.push(list);
						    result.list[i] = arr[i];
						}
						sortEpisodeNumber(result.list, false);
				    }
				}
		    }
		}
    }
    var finalResult = {};
    finalResult = result;
    return JSON.stringify(finalResult, undefined, 2);
}
/* return processed show data */
function getShowData(item, result, params,isAllSearchRequired) {
    if (item.hasOwnProperty("@id")) {
		result.contentId = item["@id"];
    }   
    if (item && item.hasOwnProperty('@lastBetaPublish')) {    	
	result.publishId = getPublishId(item["@lastBetaPublish"]);    	
    }
    if (platform == "search" && item.hasOwnProperty("@state")) {
		result.state = item["@state"];
    }
    if (item.hasOwnProperty("field")) {
		for ( var j in item["field"]) {
	
		    if (item.field[j]["@key"] == "title") {
		    	result.headline = item.field[j].$
		    }else if (item.field[j]["@key"] == "bigblurb"){
		    	result.bigblurb = item.field[j].$;
		    }
	
		    if (item.field[j]["@key"] == "photos") {
				var subItemPhotoList = item.field[j].subItemList.item;
		
				for ( var p in subItemPhotoList.field) {
				    if (subItemPhotoList.field[p]["@subTypeKey"] == "photo") {
						var subItemPhotoList = item.field[j].subItemList.item;
						getphotoThumbNail(subItemPhotoList, result, params);
				    }
				}
		    }
		}
    }
    if (item.hasOwnProperty("itemType")) {
    	result.type = item.itemType["@key"];
    }

    if (item.hasOwnProperty("itemTag")) {
		var tagObj = {};
		var arr = [];
		var itemTagObject = item.itemTag
		if (!Array.isArray(itemTagObject)) {
		    var itemTagObjectList = [];
		    itemTagObjectList.push(itemTagObject)
		} else {
		    itemTagObjectList = itemTagObject;
		}
		var year = [];
		for ( var t in itemTagObjectList) {
		    if (itemTagObjectList[t]["@type"] == "show_name") {
				result.show_name = itemTagObjectList[t]["@displayName"];
				result.show_name_key = itemTagObjectList[t]["@value"];
		    }
		    if (itemTagObjectList[t]["@type"] == "year"){
		    	year.push(itemTagObjectList[t]["@value"]);
		    	result.year = year ;
		    }
		    if (itemTagObjectList[t]["@type"] == "genre") {
				result.genre = itemTagObjectList[t]["@value"];
		    }
		}
		//Sort years
		sortData(result.year);
    }
    if(platform=='search' && isAllSearchRequired ){
	result.platforms = getAllPlatformJsRef(params,result.contentId ,result.type,result.show_name_key);
    }
    return result;
}

//sorting the data
function sortData(data) {
    if(data!=null){
		data.sort(function(a, b) {
			return a - b
		});
    }
}