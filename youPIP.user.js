// ==UserScript==
// @name         YouPIP - YouTube Picture-in-Picture Auto Toggle
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Watch YouTube videos in Picture-in-Picture mode while browsing other sites and revert back when returning to the original tab, only if the video is playing.
// @author       @Sudo_Overflow
// @match        https://www.youtube.com/watch*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let video;

    const enterPictureInPicture = async () => {
        if (!video || video.paused) return;
        try {
            await video.requestPictureInPicture();
        } catch (error) {
            console.error('Failed to enter Picture-in-Picture mode:', error);
        }
    };

    const exitPictureInPicture = async () => {
        if (!document.pictureInPictureElement) return;
        try {
            await document.exitPictureInPicture();
        } catch (error) {
            console.error('Failed to exit Picture-in-Picture mode:', error);
        }
    };

    const onPageVisibilityChange = () => {
        if (document.hidden) {
            enterPictureInPicture();
        } else {
            exitPictureInPicture();
        }
    };

    const init = () => {
        video = document.querySelector('video');

        if (!video) {
            setTimeout(init, 1000);
            return;
        }

        document.addEventListener('visibilitychange', onPageVisibilityChange);
    };

    init();
})();
