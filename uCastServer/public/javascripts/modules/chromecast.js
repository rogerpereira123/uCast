﻿define(["jquery" , "cast_sender"] , function ($, castsender ) {
    var castapp = function (onCastApiInitialized) {
        this.session;
        var currentMediaUrl = "";
        var __me = this;
        this.currentMedia = {};
        var timer;
        this.onSessionDestroyed = function () { 
            
        };
        this.setMediaUrl = function (url) { 
            if (url) currentMediaUrl = url;
        };
        this.initializeCastApi = function () {
            
            var sessionRequest = new chrome.cast.SessionRequest(chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
            
            var apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);
            chrome.cast.initialize(apiConfig, onInitSuccess, onError);
        };
        if (!chrome.cast || !chrome.cast.isAvailable) {
            setTimeout(this.initializeCastApi, 1000);
        }
        this.requestSession = function (onSessionSuccess, onLaunchError) {
            
            chrome.cast.requestSession(function (e) {
                onRequestSessionSuccess(e);
                if (onSessionSuccess) onSessionSuccess();
            }, onLaunchError);
        };
        var onRequestSessionSuccess = function (e) {
            __me.session = e;
            __me.session.addUpdateListener(sessionUpdateListener);
            if (__me.session.media.length != 0) {
                onMediaDiscovered('requestSession', this.session.media[0]);
            }
           // session.addMediaListener(onMediaDiscovered);
            
        };
        var sessionUpdateListener = function(isAlive) {
            if (!isAlive) {
                __me.session = null;
                console.log("Session ended");
                if (__me.onSessionDestroyed) __me.onSessionDestroyed();
            }
        };
        /*var onLaunchError = function (e) { 
            console.log("There was an error launching cast extension: " + e.code);
        };*/
        var getMetaDataFromTags = function (tags) {
            var metadata = new chrome.cast.media.MusicTrackMediaMetadata();
            metadata.metadataType = chrome.cast.media.MetadataType.MUSIC_TRACK;
            metadata.albumName = tags.album;
            metadata.artist = tags.artist;
            metadata.releaseDate = tags.year;
            metadata.title = tags.title;
             
            return metadata;
        };
        this.uCast = function (url, contentType, onSuccess, onError , options) {
            __me.setMediaUrl(url);
           
            console.log("Media Url: " + currentMediaUrl);
            var mediaInfo = new chrome.cast.media.MediaInfo(currentMediaUrl , contentType);
            if (options.MetaDataTags) mediaInfo.metadata = getMetaDataFromTags(options.MetaDataTags);    
            var request = new chrome.cast.media.LoadRequest(mediaInfo);
            request.autoplay = true;
            request.currentTime = 0;
            if (!this.session) {
                console.log("There is no session..");
                return;
            }
            this.session.loadMedia(request, function (media) { onMediaDiscovered("loadMedia" , media, onSuccess , onError); }, function (e) { 
                onMediaError(e);
                if (onError) onError();
                });
            
        };
        var onMediaDiscovered = function(how, media, onSuccess, onError) {
            __me.currentMedia = media;
            __me.currentMedia.play(null , function () {
                mediaCommandSuccess();
                if (onSuccess) onSuccess();
            } , function (e) {
                mediaCommandError(e);
                if (onError) onError();
            });
        }
        this.stopMedia = function (onSuccess , onError) {
            if (!this.currentMedia) return;
            this.currentMedia.stop(null, onSuccess, onError);
        };
        this.pauseMedia = function (onSuccess, onError) {
            if (!this.currentMedia) return;
            this.currentMedia.pause(null, onSuccess, onError);
        };
        this.playMedia = function (onSuccess, onError) {
            if (!this.currentMedia) return;
            this.currentMedia.play(null, onSuccess, onError);
        };
        var mediaCommandSuccess = function () { 

            console.log("media play command success");
        };
        var mediaCommandError = function () { 
            console.log("media play error");
        };
        var onMediaError = function (e) { 
            console.log("Media Error:" + e.code);
        };
        var sessionListener = function (e) {
            console.log("Got session: Id: " + e.sessionId );
            __me.session = e;
            __me.session.addUpdateListener(sessionUpdateListener);
            if (__me.session.media.length != 0) {
                onMediaDiscovered('sessionListener', __me.session.media[0]);
            }
           // session.addMediaListener(onMediaDiscovered);

        };
        var receiverListener = function (e) {
            if (e === chrome.cast.ReceiverAvailability.AVAILABLE) {
                console.log("chromecast device found!");
            }

        };
        var onInitSuccess = function (e) {
            console.log("app initialized!!");
            if (onCastApiInitialized) onCastApiInitialized();
            
        };
        var onError = function (e) {
            console.log("Initialization error: "); 
        };
    };
    
    
    return castapp;
});