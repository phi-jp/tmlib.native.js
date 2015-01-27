/*
 * native.js
 */


tm.native = tm.native || {};

tm.native.isNative = (function() {
    var flag = /tmlib/i.test(navigator.userAgent);

    return function() {
    	return flag;
    }
})();

