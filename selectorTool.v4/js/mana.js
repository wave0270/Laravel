function startActivity(action, urls, titles, pos) {
	try {
		DBJavaScriptConnInterface.startActivity(action, urls, titles, pos);
	} catch (err) {
		console.log(err);
	}	
}

function navigate(direction, webTag, url) {
	try {
		DBJavaScriptConnInterface.navigate(direction, webTag, url);	
	} catch (err) {
		console.log(err);
	}
}

function preload(webTag, url) {	
	try {
		DBJavaScriptConnInterface.preload(webTag, url);	
	} catch (err) {
		console.log(err);
	}
}

/*
function addRegex(pattern, target) {	
	try {
		DBJavaScriptConnInterface.addRegex(pattern, target);	
	} catch (err) {
		console.log(err);
	}
}
*/

function createShortcut() {
	try {
		DBJavaScriptConnInterface.createShortcut();
	} catch (err) {
		console.log(err);
	}

}

function toast(text, isShort) {
	try {
		DBJavaScriptConnInterface.toast(text, isShort);
	} catch (err) {
		console.log(err);
	}
}

function resolve(absolute, relative) {
	try {
		return DBJavaScriptConnInterface.resolve(absolute, relative);
	} catch (err) {
		console.log(err);
	}	
}
/*
 * void listDb(String path)
 * path: absolute path to folder that contains .db file

function listDb(path) {
	try {
		return JSON.parse(DBJavaScriptConnInterface.listDb(path));
	} catch (err) {
		console.log(err);
	}
}
 */
function startTransactionNative(path) {
	try {
		return DBJavaScriptConnInterface.startTransactionNative(path);
	} catch (err) {
		console.log(err);
	}
}

function execSQLNative(sql) {
	try {
	return DBJavaScriptConnInterface.execSQLNative(sql);
	} catch (err) {
		console.log(err);
	}

}

function endTransactionNative() {
	try {
		return DBJavaScriptConnInterface.endTransactionNative(path);
	} catch (err) {
		console.log(err);
	}	
}

function execCommand(cmd) {
	try {
		return DBJavaScriptConnInterface.execCommand(cmd);
	} catch (err) {
		console.log(err);
	}
}

function getVolume() {
	try {
		return DBJavaScriptConnInterface.getVolume();
	} catch (err) {
		console.log(err);
	}
}

function setVolume(vol) {
	try {
		DBJavaScriptConnInterface.setVolume(vol != null? JSON.stringify(vol) : null);
	} catch (err) {
		console.log(err);
	}
}

function play(uri) {
	try {
		DBJavaScriptConnInterface.play(uri);
	} catch (err) {
		console.log(err);
	}
}

function pause() {
	try {
		DBJavaScriptConnInterface.pause();
	} catch (err) {
		console.log(err);
	}	
}

function resume() {
	try {
		DBJavaScriptConnInterface.resume();
	} catch (err) {
		console.log(err);
	}
}

function stop() {
	try {
		DBJavaScriptConnInterface.stop();
	} catch (err) {
		console.log(err);
	}
}

function toggle() {
	try {
		DBJavaScriptConnInterface.toggle();
	} catch (err) {
		console.log(err);
	}
}

function getSystemInfo(varName) {
	try {
		return DBJavaScriptConnInterface.getSystemInfo(varName);
	} catch (err) {
		console.log(err);
	}
}

function vibrate(pattern) {
	try {
		return DBJavaScriptConnInterface.vibrate(pattern != null ? JSON.stringify(pattern): null);
	} catch (err) {
		console.log(err);
	}	
}

function getGpsInfo(callback) {
	try {
	return DBJavaScriptConnInterface.getGpsInfo(callback);
	} catch (err) {
		console.log(err);
	}
}
//function getMenuTag(dir){
//	return DBJavaScriptConnInterface.getMenuTag(dir);
//}
function executeJs(webviewId, script) {
	try {
		return DBJavaScriptConnInterface.executeJs(webviewId, script);
	} catch (err) {
		console.log(err);
	}
}

function suspendApp() {
	try {
		DBJavaScriptConnInterface.suspendApp();
	} catch (err) {
		console.log(err);
	}
}

function md5(str) {
	try {
		return DBJavaScriptConnInterface.md5(str);
	} catch (err) {
		console.log(err);
	}
}

function sendSMS(jRecipient, msg) {
	try {
		DBJavaScriptConnInterface.sendSMS(jRecipient != null ? JSON.stringify(jRecipient): null, msg);
	} catch (err) {
		console.log(err);
	}
}

function sendSMSIntent(jRecipient, msg) {
	try {
		DBJavaScriptConnInterface.sendSMSIntent(jRecipient != null ? JSON.stringify(jRecipient): null, msg);
	} catch (err) {
		console.log(err);
	}
}

function sendEmail(jRecipient, title, msg) {
	try {
		DBJavaScriptConnInterface.sendEmail(jRecipient != null ? JSON.stringify(jRecipient): null, title, msg);
	} catch (err) {
		console.log(err);
	}
}

function takePhoto(path) {
	try {
		DBJavaScriptConnInterface.takePhoto(path);
	} catch (err) {
		console.log(err);
	}
}

function startRecordAudio(path) {
	try {
		DBJavaScriptConnInterface.startRecordAudio(path);
	} catch (err) {
		console.log(err);
	}
}

function endRecordAudio(){
	try {
		DBJavaScriptConnInterface.endRecordAudio();
	} catch (err) {
		console.log(err);
	}
}

function executeLua(script, callback) {
	try {
		DBJavaScriptConnInterface.executeLua(script, callback);
	} catch (err) {
		console.log(err);
	}
}

function triggerAd(tag, adFrom, isShow) {
	try {
		DBJavaScriptConnInterface.triggerAd(JSON.stringify(tag), JSON.stringify(adFrom),  isShow);
	} catch (err) {
		console.log(err);
	}
}

function symbolicLink(target, source) {
	try {
		DBJavaScriptConnInterface.symbolicLink(target, source);
	} catch (err) {
		console.log(err);
	}
}

function endActivity() {
	try {
		DBJavaScriptConnInterface.endActivity();
	} catch (err) {
		console.log(err);
	}
}

function endActivityWithConfirm() {
	try {
		DBJavaScriptConnInterface.endActivityWithConfirm();
	} catch (err) {
		console.log(err);
	}
}

// -----------------------------------------------------------------------------
String.format = function() {
	var theString = arguments[0];
	for (var i = 1; i < arguments.length; i++) {
		var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
		theString = theString.replace(regEx, arguments[i]);
	}
	return theString;
};

var parseQueryString = function(queryString) {
	if (queryString == undefined) queryString = window.location.search; 
    var params = {}, queries, temp, i, l;
    queries = queryString.substring(1).split("&"); // Split into key/value pairs
    for (i = 0, l = queries.length; i < l; i++) { // Convert the array of strings into an object
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }
    return params;
};

/*
 * Hàm lấy folder path của url hiện tại.
 */
function getCurrentUrlFolder() {
	var url = window.location.pathname + "";
	url = url.substring(0, url.lastIndexOf("/") + 1);
	url = window.location.origin + url;
	return url;
}

/*
 * Hàm kiểm tra xem có dùng được Mana Framework hay không?
 */
function isFrameworkAvailable() {
	/*
	try {
		if (DBJavaScriptConnInterface !== undefined) return true;
	} catch(err) {}
	return false;
	*/
	if (typeof DBJavaScriptConnInterface == 'undefined') return false;
	return true;
}
/*
console.log("ManaFramework inited!");
$(function() {
	FastClick.attach(document.body);
	console.log("fastclick inited!");
});*/

