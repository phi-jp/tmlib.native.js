/*
 * nativeaudio.js
 */



;(function() {
    
    if (!tm.native.isNative()) { return ; }

    var loadFunc = function(path) {
        return NativeAudio(path);
    };
    
    tm.asset.Loader.register("wav", loadFunc);
    tm.asset.Loader.register("mp3", loadFunc);
    tm.asset.Loader.register("m4a", loadFunc);
    tm.asset.Loader.register("ogg", loadFunc);
    
    tm.define("NativeAudio", {
        
        superClass: "tm.event.EventDispatcher",
        
        src: "",
        loaded: false,
        loopFlag: false,
        volume: 0.8,
        
        init: function(src) {
            
            this.superInit();
            
            this.loaded = true;
            this._load(src);
        },
        
        _load: function(src) {
            
            var ma = src.match(/(.*)$/);

            this.src = src;
            this.path = ma[1].replace("sounds/", '');
            this.volume = 0.8;
            this.loaded = true;

            this.fire(tm.event.Event("load"));

            return this;
        },
        
        play: function() {
            
            var self = this;
            
            if (this.loopFlag == false) {
                tm.native.api.playSound(this.path, {
                    volume: this.volume,
                    callback: function() {
                        var e = tm.event.Event("ended");
                        self.fire(e);
                    },
                });
            }
            else {
                tm.native.api.playMusic(this.path, {
                    volume: this.volume,
                    callback: function() {
                        var e = tm.event.Event("ended");
                        self.fire(e);
                    },
                });
            }
            
            return this;
        },
        
        stop: function() {
            if (this.loopFlag == false) {
                tm.native.api.stopSound();
            }
            else {
                tm.native.api.stopMusic();
            }
            
            return this;
        },
        
        setLoop: function(flag) {
            this.loopFlag = flag;
            
            return this;
        },
        
        setVolume: function(volume) {
            
            this.volume = volume;
            
            return this;
        },
        
        clone: function() {
            
            var audio = NativeAudio(this.src);
            
            return audio;
        },
    });
    
})();