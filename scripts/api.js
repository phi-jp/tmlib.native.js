/*
 * api.js
 */

;(function() {

    var PROTOCOL = "tmlib";

    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    window.addEventListener("DOMContentLoaded", function() {
        document.body.appendChild(iframe);
    });

    // ネイティブAPI実行キュー
    var request_queue = [];
    var listner_queue = {};
    var listner_counter = 0;

    tm.native.api = {
        loop: function() {
            if (request_queue.length == 0) return ;
            
            var request = request_queue.shift();
            
            if (tm.native.isNative()) {
                var uri = tm.native.api.toScheme(request.method, request.param);
                iframe.contentWindow.location = uri;
                console.log(uri);
            }
            else {
                if (request.param.callback) {
                    request.param.callback({
                        request: request,
                    });
                }
            }
        },

        exec: function(method, param) {
            request_queue.push({
                method: method,
                param: param,
            });
            return this;
        },

        toScheme: function(method, param) {
            if (param) {
                // check callback
                if (param.callback) {
                    param.callback = this.setCallback(param.callback);
                }
                else {
                    delete param.callback;
                }

                var paramUri = tm.util.QueryString.stringify(param);
                var uri = "{0}://{1}?{2}".format(PROTOCOL, method, paramUri);
            }
            else {
                var uri = "{0}://{1}".format(PROTOCOL, method);
            }

            return uri;
        },













        // old

        closeView: function() {
            this.exec("closeView");
        },

        playSound: function(name, param) {
            param = param || {};

            param.name = name;
            param.callback = this.setCallback(param.callback);

            this.exec("playSound?" + tm.util.QueryString.stringify(param));
        },

        /**
         * サウンドを停止する
         */
        stopSound: function() {
            this.exec("stopSound");
        },
        playMusic: function(name, param) {
            param = param || {};

            param.name = name;
            param.callback = this.setCallback(param.callback);

            this.exec("playMusic?" + tm.util.QueryString.stringify(param));
        },
        /**
         * 音楽を停止する
         */
        stopMusic: function() {
            this.exec("stopMusic");
        },
        /**
         * 
         */
        sendScore: function(id, score, callback) {

            if (tm.native.isNative()) {
                var param = {
                    id: id,
                    score: score,
                    callback: callback,
                };
                param.callback = this.setCallback(param.callback);
                this.exec("sendScore?" + tm.util.QueryString.stringify(param));
            }
            else {
                callback && callback();
            }
        },
        /**
         * 
         */
        getRanking: function(id, callback) {

            if (tm.native.isNative()) {
                var param = {
                    id: id,
                    callback: callback,
                };
                param.callback = this.setCallback(param.callback);
                this.exec("getSelfRanking?" + tm.util.QueryString.stringify(param));
            }
            else {
                callback && callback(512);
            }
        },
        /**
         * 
         */
        viewRanking: function(id) {
            var param = {
                id: id,
            };
            this.exec("viewRanking?" + tm.util.QueryString.stringify(param));
        },
        /**
         * 
         * text ... 
         * hashtags ... 
         * via ... 
         * url ... 
         */
        sendTwitter: function(params) {
            params.text = params.text || "";
            params.via = params.via || "";
            params.hashtags = params.hashtags || "";

            if (params.hashtags) {
                var tagsArr = params.hashtags.split(',');
                var tags = [];
                tagsArr.each(function(elm) {
                    tags.push("#" + elm);
                });
                params.hashtags = tags.join(' ');
            }
            else {
                params.hashtags = "";
            }

            var finalText = "{text} via @{via} {hashtags}".format(params);
            var param = {
                text: finalText,
                url: params.url || '',
            };

            this.exec("twitter?" + tm.util.QueryString.stringify(param));
        },
        sendFacebook: function(param) {
            param.text = param.text || "";
            param.url = param.url || "";

            this.exec("facebook?" + tm.util.QueryString.stringify(param));
        },
        sendLine: function(param) {
            param.text = param.text || "";
            param.url = param.url || "";

            this.exec("line?" + tm.util.QueryString.stringify(param));
        },

        getLanguage: function(callback) {
            if (tm.native.isNative()) {
                callback = this.setCallback(callback);
                var param = {
                    callback: callback,
                };
                this.exec( "getLanguage?" + tm.util.QueryString.stringify(param) );
            }
            else {
                callback && callback("en"); // or ja
            }
        },

        setCallback: function(callback) {
            if (!callback) return null;

            var name = 'index' + listner_counter++;
            listner_queue[name] = callback;

            return name;
        },

        execCallback: function(name, arg) {
            listner_queue[name](arg);
            return this;
        },

        deleteCallback: function(name) {
            delete listner_queue[name];
            return this;
        },
    };

    // ネイティブAPI実行インターバル（0.1秒単位）
    setInterval(tm.native.api.loop, 50);

})();
