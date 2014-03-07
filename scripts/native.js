/*
 * native.js
 */


tm.native = tm.native || {};

tm.native.isNative = (function() {
    var flag = /piyokawa/i.test(navigator.userAgent);

    return function() {
    	return flag;
    }
})();

