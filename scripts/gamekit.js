/*
 * api.js
 */

;(function() {

    tm.native.gamekit = {

        authenticate: function(callback) {
        	tm.native.api.exec('authenticate', {
        		callback: callback,
        	});
        	return this;
        },

        sendScore: function(id, score, callback) {
        	tm.native.api.exec('sendScore', {
        		id: id,
        		score: score,
        		callback: callback,
        	});
        	return this;
        },

        showRanking: function(id, callback) {
        	tm.native.api.exec('showRanking', {
        		id: id,
        		callback: callback,
        	});
        	return this;
        },

    };

})();
