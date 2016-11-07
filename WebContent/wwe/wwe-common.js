//map type to image dimension 
var imageDimensionToType = [];

function getAllPlatformJsRef(params){
    var platformsJsRef = {};
    if (params != 'undefined' && params["platforms"]) {    	
	var platformOptions = params["platforms"];
	for( var i in platformOptions) {
	    var key = platformOptions[i];		
	    platformsJsRef[key] = "https://s3.amazonaws.com/cms-wwe-app-content-"+ params["env"] +"/"+params["outputkey"].replace('search-v1.json',key+".json");		
	}
    }
	return platformsJsRef;
}

//getting thumbnails from photo
function getphotoThumbNail(subItemPhotoList, result,params) {
        for ( var p in subItemPhotoList.field) {
                if (subItemPhotoList.field[p]["@subTypeKey"] == "photo") {
                	getDimensionToImageMap();
                        var photosListItem = subItemPhotoList.field[p].subItemList.item
                        for ( var m in photosListItem) {

                                if (photosListItem[m].hasOwnProperty("field")) {
                                        var value = {
                                                "type" : "",
                                                "width" : "",
                                                "height" : "",
                                                "src" : ""
                                        };

                                        for ( var z in photosListItem[m].field)

                                        {
                                                if (photosListItem[m].field[z]["@key"] == "height") {
                                                        value.height = photosListItem[m].field[z].$;
                                                } else if (photosListItem[m].field[z]["@key"] == "width") {
                                                        value.width = photosListItem[m].field[z].$;
                                                } else if (photosListItem[m].field[z]["@key"] == "image-location") {
                                                        var prefixURL = getSourceURL(params);
                                                        value.src = prefixURL + photosListItem[m].field[z].$;
                                                } 
                                        }
                                        value.type = new ImageTypeDimensionMap().getTypeByWidthHeight(value.width, value.height);
                                        if ( value.width!=null && value.height!=null &&value.type!="") {
                                            // getting type from reverse mapping                                            
                                            result.thumbnails[value.width + 'x' + value.height] = value;
                                        }
                                }
                        }

                }
        }
}

//getting a map type to image dimension
function getDimensionToImageMap(){
  //dynamically create reverse mapping from  type to dimension.
    var map = new ImageTypeDimensionMap().imageTypeToDimensionMapping;	
    for (key in  map) {                   
         imageDimensionToType[map[key]] = key;
    }
}

//getting a map image dimension to type 
function ImageTypeDimensionMap() {
    //mapping type to image dimension.
    this.imageTypeToDimensionMapping = {
    	'0'	: '430x242',
        '1' : '167x94',
        '2' : '215x121',
        '3' : '305x229',
        '4' : '167x125',
        '5' : '215x161',
        '6' : '305x171',
        '7' : '124x70',
        '8' : '120x88',
        '9' : '120x90',
        '10' : '236x132',
        '11' : '576x324',
        '12' : '400x300',
        '13' : '720x840',
        '14' : '68x30',
        '15' : '89x37',
        '16' : '163x74',
        '17' : '184x53',
        '18' : '184x153',
        '19' : '184x135',
        '22' : '265x150',
        '23' : '176x96',
        '24' : '264x148',
        '25' : '480x270',
        '26' : '64x36',
        '27' : '720x349',
        '28' : '100x55',
        '29' : '144x80',
        '30' : '135x77',
        '31' : '270x154',
        '32' : '209x118',
        '33' : '256x144',
        '34' : '96x72',
        '35' : '400x224',
        '36' : '235x270',
        '37' : '160x90',
        '38' : '96x54',
        '39' : '76x88',
        '40' : '248x138',
        '41' : '240x174',
        '42' : '190x146',
        '43' : '640x360',
        '44' : '320x180',
        '45' : '1280x720',
        '46' : '960x720',
        '47' : '430x142',
        '48' : '960x540',
        '49' : '496x276',
        '50' : '418x236',
        '51' : '352x192',
        '52' : '288x160',
        '53' : '990x557',
        '54' : '450x170',
        '55' : '140x94',
        '56' : '143x81',
        '57' : '266x150',
        '58' : '466x290',
        '59' : '504x283',
        '60' : '514x194',
        '61' : '600x337',
        '62' : '699x436',
        '63' : '771x282',
        '64' : '818x460',
        '65' : '446x254',
        '66' : '1567x704',
        '67' : '1920x1080',
        '68' : '185x94',
        '69' : '373x210',
        '70' : '300x169',
        '71' : '220x124',
        '101' : '296x167',
        '111' : '444x250',
        '121' : '592x334',
        '131' : '888x250',
        '141' : '1184x668',
        '10000' : '768x300',
        '10400' : '704x397'
    };
    // dynamically create reverse mapping from dimension to type.
    var imageDimensionToTypeMapping = function() {
        var map = {};
        return map;
    }();
    this.getWidthHeightByType = function(type) {
        var dimension = this.imageTypeToDimensionMapping[type];
        var dim = typeof dimension != 'undefined' ? dimension
                .split('x') : undefined;
        return (typeof dim != 'undefined' && dim.length == 2) ? {
            'width' : dim[0],
            'height' : dim[1]
        } : {};
    },
    this.getTypeByWidthHeight = function(width, height) {
        // dynamically create reverse mapping from dimension to type.
        var dim = width + 'x' + height;
        var type = imageDimensionToType[dim];
        return (typeof type != 'undefined' && type.length > 0) ? type : "";
    }
}

//sorting on basis of episode number
function sortEpisodeNumber(data) {
    if(data!=null){
		data.sort(function(a, b) {
			return b.episode_number - a.episode_number
		});
    }
}

//getting a Prefix source url for photo thumbnails.
function getSourceURL(params) {
    var url;
    var qaURL = '://qanetwork.wwe.com'
    var prodURL = '://network.wwe.com'
    env = params["env"];
    var prefix = 'http';
    if (env == 'qa') {
        url = qaURL;
    }
    else {
        url = prodURL;
    }
    return prefix + url
}

function getPublishId(currentTime){
    var searchVersion="";
    if(currentTime!=null || currentTime != ""){
	var currentDate=new Date(currentTime);
	searchVersion= currentDate.toISOString().replace(/[^a-zA-Z0-9]/g, "")
    }
    return searchVersion;
}