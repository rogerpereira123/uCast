﻿define(["jquery" , "cast_sender"] , function ($, castsender) {
    var castapp = function (mediaUrl) {
        var session;
        var currentMediaUrl = (mediaUrl ? mediaUrl : "");
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
            session = e;
            session.addUpdateListener(sessionUpdateListener);
            if (session.media.length != 0) {
                onMediaDiscovered('requestSession', session.media[0]);
            }
           // session.addMediaListener(onMediaDiscovered);
            
        };
        var sessionUpdateListener = function(isAlive) {
            if (!isAlive) {
                session = null;
                console.log("Session ended");
                if (__me.onSessionDestroyed) __me.onSessionDestroyed();
            }
        };
        /*var onLaunchError = function (e) { 
            console.log("There was an error launching cast extension: " + e.code);
        };*/
        this.uCast = function (url, contentType, onSuccess, onError) {
            __me.setMediaUrl(url);
           
            console.log("Media Url: " + currentMediaUrl);
            var mediaInfo = new chrome.cast.media.MediaInfo(currentMediaUrl , contentType);
  
            var request = new chrome.cast.media.LoadRequest(mediaInfo);
            request.autoplay = true;
            request.currentTime = 0;
            if (!session) {
                console.log("There is no session..");
                return;
            }
            session.loadMedia(request, function (media) { onMediaDiscovered("loadMedia" , media, onSuccess , onError); }, function (e) { 
                onMediaError(e);
                if (onError) onError();
                });
            
        };
        var onMediaDiscovered = function(how, media, onSuccess, onError) {
            this.currentMedia = media;
            this.currentMedia.play(null , function () {
                mediaCommandSuccess();
                if (onSuccess) onSuccess();
            } , function (e) {
                mediaCommandError(e);
                if (onError) onError();
            });
        }
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
            session = e;
            session.addUpdateListener(sessionUpdateListener);
            if (session.media.length != 0) {
                onMediaDiscovered('sessionListener', session.media[0]);
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
         
            
        };
        var onError = function (e) {
            console.log("Initialization error: "); 
        };
    };
    
    
    return castapp;
});