var Utils = function(){
	
	var index = -1;
	
	var synthesizeJsonPath = function(path){
		path = path.replace(/(\[)/,'.');
		path = path.replace(/(\/)/,'.');
		return path.replace(/(\])/,'');
	};
	
	
	return {
		extend: function(PClazz, config){
			var Clazz = function(){
				PClazz.apply(this,arguments);
			}
			Clazz.prototype = Object.create(PClazz.prototype);
			Clazz.prototype.constructor = Clazz;
			for(key in config){
				if(config.hasOwnProperty(key)){
					Clazz.prototype[key] = config[key];
				}
			}
			Clazz.parent = PClazz.prototype;
			return Clazz;
		},
		jsonPathToValue: function (jsonData, path) {
			path = synthesizeJsonPath(path);
			// Param validation.
			if (!(jsonData instanceof Object)) {
				print("Utils.jsonPathToValue: Parameter(jsonData) error");
				return null;
			}
			if (typeof (path) === "undefined") {
				print("Utils.jsonPathToValue: Parameter(path) error");
				return null;
			}
			index = index<0 ? 0 : index + 1;

			// Get the path splitted.
			var data = path.split(".");

			// Continue working or not.
			var value = null;
			if (index + 1 === data.length) {
				value = jsonData[data[index]];
			} else {
				value = Utils.jsonPathToValue(jsonData[data[index]], path);
			}
			index = -1;
			return value;
		},
		isEmptyString: function(str){
			if(typeof str === "string" && str.trim() == ""){
				return true;
			}else{
				return false;
			}
		},
		isNumber: function(number){
			return !isNaN(number);
		},
		isDefined: function(obj){
			return (typeof obj !== 'undefined' && obj != null);
		}
	};
	
}();
