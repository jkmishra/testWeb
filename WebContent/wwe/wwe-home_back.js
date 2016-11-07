var platform = null;
// Does tag hbtax = Feature_home_single list exists for home page list
var isFeatureListExistsForHome = false;
function transform(input, params) {	
	//load("/opt/cms/xsl/wwe/wwe-asset.js");
	//load("/opt/cms/xsl/wwe/wwe-show.js");
	//load("/opt/cms/xsl/wwe/wwe-common.js");
	//load("/opt/cms/xsl/wwe/wwe-collection.js");
	//var inputJson = JSON.parse(inputWWE);
	var output = {};
	platform = params["platform"];
	output = processDataForHomePage(inputWWE, params);
	return output;
}

function processDataForHomePage(input, params) {
        	if (typeof params != 'undefined') {
        	    platform = 'atv';
        	}
        	platform = 'atv';
        	var filters = {
        			"parentalControls" : [ {"type" : "wwe-asset"} ]
        	};
        	var schedule ={
        			"ref" : "",
        			"type" : "live",
        			"count" : 7
        	};
        	var currentMedia ={
        		"ref": "", 
        		"type": "live" 
        	};
        	var finallist = [];
        	var finalResult = {};
        	//1.  Put filters as first element
        	finalResult['filters'] = filters ;
        	finalResult['featuredVideo'] = {} ;
        	finalResult['currentMedia'] = currentMedia ;
        	finalResult['schedule'] = schedule ;
        	
        	if (input != null) {
        	    if (input.hasOwnProperty('list')) {
	        		var inputList = input.list[0];
	        		if (inputList.hasOwnProperty('home')) {	        		   
	        		    var homepageList = inputList.home;
	        		    // Process all list for home page
	        		    for ( var i in homepageList) {
	        		    	var isResult =false;
	            			var isFeatureHomeList = false;
		        			var platformValue = null;
		        			var result = {
		        				"type" : "",
		        				"contentId" : "",
		        				"items" : []
		        			}
		        			if (homepageList[i].item.hasOwnProperty("@id")) {
		        			    result["contentId"] = homepageList[i].item["@id"];
		        			}
		        			if (homepageList[i].item.hasOwnProperty("itemType")) {
		        			    result["type"] = homepageList[i].item.itemType["@key"];
		        			}
		        			// start processing list data on the basis of tags
		        			if (homepageList[i].item.hasOwnProperty("itemTag")) {
		        				var itemTagArray = getItemTagArray(homepageList, i);
		        				// set homepage tags
		        				isFeatureHomeList=getHomePageTags(itemTagArray);
		        				
		        			    for ( var platformIndex in itemTagArray) {
			        				// processing only for platform tag on the list
			        				if (itemTagArray[platformIndex]["@type"] == 'platform'){
			        				    platformValue = itemTagArray[platformIndex]["@value"]
			        				}
			        				if (itemTagArray[platformIndex]["@type"] == 'title'){
			        				    title = itemTagArray[platformIndex]["@displayName"]
			        				    var titleKey = itemTagArray[platformIndex]["@value"]
			        				    result["title"] = title;
			        				}
			        				
		        			    	// if tag hbtax is  Feature_home_single list ( featured home list)	
			        				if (isFeatureHomeList) {
			        					// 2. Put featured video and schedule
			        					getFeaturedVideoData(homepageList, finalResult,params, i);
			        				}else { 
				        				// matching platform tag or process for all tags
				        				// to check if platform tag is available or not
		        			    		if (platformValue == platform || (platformValue == null && (platformIndex == itemTagArray.length - 1))) {
		        			    				isResult = true;
			        			    			if (homepageList[i].item.hasOwnProperty("field")) {
			        			    				var homepageListField = homepageList[i].item.field;
			        			    				if (!Array.isArray(homepageListField)) {
			        			    					var homepageListFieldArray = [];
			        			    					homepageListFieldArray.push(homepageListField)
			        			    				} 
			        			    				else {
			        			    					homepageListFieldArray = homepageListField
			        			    				}
			        			    				for ( var j in homepageListFieldArray) {
			        			    					// check if list data have primitive
			        			    					// list and key alias-list then
			        			    					// only processing data for home page
			        			    					if (homepageListFieldArray[j]["@primitive"] == 'List' && homepageListFieldArray[j]["@key"] != 'alias-list') {
			        			    						var subListItem = homepageListFieldArray[j].subItemList.item;
			        			    						// if sublistItem data is not then explicitly make to array for looping
			        			    						if (!Array.isArray(subListItem)) {
			        			    							var subListItemArray = [];
			        			    							subListItemArray.push(subListItem)
			        			    						} else {
			        			    							subListItemArray = subListItem
			        			    						}
			        			    						for ( var j in subListItemArray) {
			        			    							getHomePageData(subListItemArray[j],result,params,j,platform,title,titleKey);
			        			    						}
			        			    					}
			        			    				}
			        			    			}
			        						}
			        					}
		        			    	}
		        				}
		        			// adding all data in a list for home page
		        			if(isResult){
			    			finalResult[titleKey] = result;
							platformValue = "";	
						  }	
	        		    }
	        		  }
        	       }
        	}   
        	// if hbtax = 'feature_home_single' doesn't exist on any list
        	if(!isFeatureListExistsForHome){
        		delete  finalResult['featuredVideo'];
        	}
        	return JSON.stringify(finalResult, undefined, 2);
}

function getHomePageData(subListItemArray,result,params,index,platform,title,titleKey){
    var itemTypeValue = subListItemArray.itemType["@key"]
    // start processing for show
    if (itemTypeValue == "wwe-show") {
		var show = {
			"type" : "",
			"contentId" : "",
			"show_name" : "",
			"show_name_key" : "",
			"headline" : "",
			"bigblurb" : "",
			"thumbnails" : {},
		};
		var resultShowList = getShowData(subListItemArray,show,params);
		result.items[index] = resultShowList;
    }
    // start processing for asset
    if (itemTypeValue == "wwe-asset") {
		var assetList = getAssetReference(subListItemArray,params);
		result.items[index] = assetList;
    }
    // start processing for collection
    if (itemTypeValue == "collection-wwe") {
		var collectionList = getCollectionData(subListItemArray,params);
		result.items[index] = collectionList;
    }
    if(platform=='atv' && titleKey=='wweOnNow'){	
	var shortContent = getShortContentData(subListItemArray,params,title);
	result.items[index] = shortContent;
    }
}


function getFeaturedVideoData(homepageList, finalResult, params, indx) {
	var homepageListField = homepageList[indx].item.field;
	if (!Array.isArray(homepageListField)) {
		var homepageListFieldArray = [];
		homepageListFieldArray.push(homepageListField)
	} 
	else {
		homepageListFieldArray = homepageListField
	}
	var subItemList;
	if(homepageListFieldArray !=null){
		for(var item in homepageListFieldArray){
			if(homepageListFieldArray[item]["@key"]=="list"){
				subItemList = homepageListFieldArray[item].subItemList ;
			}
		}
	}
	// assuming that there is only one item list as asset
	if(subItemList!=null ){
		var subListItem = subItemList.item;
		if (!Array.isArray(subListItem)) {
			var subListItemArray = [];
			subListItemArray.push(subListItem)
		}else {
			subListItemArray = subListItem
		}
	}
	var featuredVideo={};
	if(typeof subListItemArray!='undefined' && subListItemArray[0]!=null){
		var itemTypeValue = subListItemArray[0].itemType["@key"]
		if (itemTypeValue == "wwe-asset") {
			var assetList = getAssetReference(subListItemArray[0], params);
			featuredVideo = assetList;
			delete assetList["bookmarks"];
		}
	}
	finalResult['featuredVideo'] = featuredVideo;
}

function getItemTagArray(homepageList, indx) {
	var itemTagValue = homepageList[indx].item.itemTag;
	if (!Array.isArray(itemTagValue)) {
		var itemTagArray = [];
		itemTagArray.push(itemTagValue);
	}
	else {
		itemTagArray = itemTagValue;
	}
	return itemTagArray;
}

String.prototype.toCamelCase = function() {
    return this.replace(/^([A-Z])|[\s-_)(](\w)/g, function(match, p1, p2, offset) {
        if (p2) return p2.toUpperCase();
        return p1.toLowerCase();        
    });
};


// sets Type of platfom
// sets type of list is hbtax = 'feature_home_single' 
function getHomePageTags(itemTagArray) {
	var isFeatureHomeList;
    var isPlatformTagExists = false;
          for ( var platformIndex in itemTagArray) {
                      // processing only for hbtax tag on the list
                      if (itemTagArray[platformIndex]["@type"] == 'hbtax'){
                            if(itemTagArray[platformIndex]["@value"] == 'feature_home_single'){
                            	isFeatureHomeList = true;
                            	isFeatureListExistsForHome = true;
                            }
                      }
          }
          return isFeatureHomeList;
    }

