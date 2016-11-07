var platform = null;

function transform(input, params) {
    //load("/opt/cms/xsl/wwe/wwe-common.js");
    //var inputJson = JSON.parse(input);
    var output = {};
    platform = params["platform"];
    output = processDataForAsset(inputWWE, params);
    return output;
}

function processDataForAsset(input, params) {
    function processDataForAsset(input, params) {
	    var result = null;
	    var finalResult = {};
	    if (input != null) {
			if (input.hasOwnProperty('list')) {
			    list = input.list[0];
			    if (list.hasOwnProperty('asset')) {
					var data = list.asset[0].item;
					result = getAssetData(data, params,true);
					finalResult = result;
			    }
			}
	    }
	    return JSON.stringify(finalResult, undefined, 2);
	}

	function getAssetData(itemList, params,isAllSearchRefRequired) {
	    var platform = null;
	    if (typeof params != 'undefined') {
	    	platform = params["platform"];
	    }
	    var arr = [];
	    var list = {
			"type" : "",
			"contentId" : "",
			"publishId" : "",		
			"show_name" : "",
			"show_name_key" : "",
			"headline" : "",
			"bigblurb" : "",
			"tv_rating" : "",
			"air_date" : "",
			"episode_number" : "",
			"season" : "",
			"episode" : "",
			"duration" : "",
			"out_point" : "",
			"media_playback_id" : "",
			"closed_captioned" : "",
			"genre" : "",
			"franchise" : "",
			"advisory_rating" : "",
			"advisory_slate" : "",
			"calendar_event_id" : "",
			"thumbnails" : {}
	    };

	    var isPhoto = false;
	    var itemListForThumbnails;
	    if (itemList && itemList.hasOwnProperty('@id')) {
	    	list.contentId = itemList["@id"];
	    }
	    if (typeof params != 'undefined' && params["currentTime"]!=null) {
		list.publishId =params["currentTime"]; ///params["currentTime"];//getPublishId(params["currentTime"]);
	    }   
	    if (platform == "search" && itemList && itemList.hasOwnProperty("@state")) {
	    	list.state = itemList["@state"];
	    }
	    if (itemList && itemList.hasOwnProperty('itemType')) {
	    	list.type = itemList.itemType["@key"];
	    }
	    if (itemList && itemList.hasOwnProperty('field')) {
			for ( var j in itemList.field) {
			    if (itemList.field[j]["@key"] == "duration") {
			    	list.duration = itemList.field[j].$
			    } else if (itemList.field[j]["@key"] == "headline") {
			    	list.headline = itemList.field[j].$
			    } else if (itemList.field[j]["@key"] == "bigblurb") {
			    	list.bigblurb = itemList.field[j].$
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
	    	getThumbnails(itemListForThumbnails,list);
	    }
	    if (itemList && itemList.hasOwnProperty('itemTag')) {
			var array = [];
			var tagObj = {};
			for ( var i in itemList.itemTag) {
			    if (itemList.itemTag[i]["@type"] == "tv_rating") {
			    	list.tv_rating = itemList.itemTag[i]["@value"]
			    } else if (itemList.itemTag[i]["@type"] == "show_name") {
					list.show_name = itemList.itemTag[i]["@displayName"]
					list.show_name_key = itemList.itemTag[i]["@value"]
			    } else if (itemList.itemTag[i]["@type"] == "air_date") {
			    	list.air_date = itemList.itemTag[i]["@value"]
			    } else if (itemList.itemTag[i]["@type"] == "episode_number") {
					list.episode_number = itemList.itemTag[i]["@value"]
					list.season = itemList.itemTag[i]["@value"].substring(0, 2)
					list.episode = itemList.itemTag[i]["@value"].substring(2, 4)
			    } else if (itemList.itemTag[i]["@type"] == "duration") {
			    	list.duration = itemList.itemTag[i]["@value"]
			    } else if (itemList.itemTag[i]["@type"] == "out_point") {
			    	list.out_point = itemList.itemTag[i]["@value"]
			    } else if (itemList.itemTag[i]["@type"] == "media_playback_id") {
			    	list.media_playback_id = itemList.itemTag[i]["@value"]
			    } else if (itemList.itemTag[i]["@type"] == "closed_captioned") {
			    	list.closed_captioned = itemList.itemTag[i]["@value"]
			    } else if (itemList.itemTag[i]["@type"] == "advisory_rating") {
			    	list.advisory_rating = list.advisory_rating + itemList.itemTag[i]["@value"]
			    } else if (itemList.itemTag[i]["@type"] == "advisory_slate") {
					if (itemList.itemTag[i]["@value"] == 'A') {
					    list.advisory_rating = list.advisory_rating + itemList.itemTag[i]["@value"]
					}
					list.advisory_slate = itemList.itemTag[i]["@value"];
			    } else if (itemList.itemTag[i]["@type"] == "franchise") {
			    	list.franchise = itemList.itemTag[i]["@value"];
			    } else if (itemList.itemTag[i]["@type"] == "genre") {
			    	list.genre = itemList.itemTag[i]["@value"]
			    } else if (itemList.itemTag[i]["@type"] == "calendar_event_id") {
			    	list.calendar_event_id = itemList.itemTag[i]["@value"]
			    }
			    
			    if (platform == 'search') {
					if (tagObj.hasOwnProperty(itemList.itemTag[i]["@type"])) {
					    var value = tagObj[itemList.itemTag[i]["@type"]]
					    value.push(itemList.itemTag[i]["@value"]);
					    tagObj[itemList.itemTag[i]["@type"]] = value;
					} else {
					    tagObj[itemList.itemTag[i]["@type"]] = new Array(
						    itemList.itemTag[i]["@value"]);
					}
					list.itemTags = tagObj;				
			    }
			}
		
			list.advisory_rating = list.advisory_rating.split('').sort().join('');
			if (list.advisory_slate == "") {
			    list.advisory_slate = 'A';
			}
	    }

	    if (itemList && platform == 'search') {
		if (itemList.hasOwnProperty('@createdOn')) {
		    list.createdOn = itemList["@createdOn"];
		}
		if (itemList.hasOwnProperty('@lastSave')) {
		    list.lastSave = itemList["@lastSave"];
		}
		if (itemList.hasOwnProperty('@userDate')) {
		    list.userDate = itemList["@userDate"];
		}
		if(isAllSearchRefRequired || params!='undefined'){
		    list.platforms = getAllPlatformJsRef(params);
		}
	    }    
	    return list;
	}


	// method to get asset reference its used for Individual collection and show
	// Publishing and also for home page
	function getAssetReference(item,params) {
	    var platform = null;
	    if (typeof params != 'undefined') {
	    	platform = params["platform"];
	    }
	    var refData = {
			"ref" : "",
			"type" : "wwe-asset",
			"bookmarks" : false
	    };   
	   if (item && item.hasOwnProperty('@id') && platform && item.itemType['@key']=='wwe-asset') {     
		refData.ref = "wwe-asset/v1/contentId/" + item["@id"] + "/"+platform+"-v1.json";
	   }
	   return refData;
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
		    if (value.width && value.height) {
		    	obj[value.width + 'x' + value.height] = value;
		    }
		}
		list.thumbnails = obj;
	}