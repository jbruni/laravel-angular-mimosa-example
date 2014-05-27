/*
 * Homepage Background Module
 * 
 * http://www.aurumdesign.com/
 * http://css-tricks.com/perfect-full-page-background-image/
 */

define(['jquery'], function($) {

    var win     = $(window),
        iWidth  = 2122,
        iHeight = 1415,
        iRatio  = iHeight / iWidth;

    function resizeImage() {
        var wWidth  = win.width(),
            wHeight = win.height(),
            wRatio  = wHeight / wWidth,
            nWidth, nHeight;

        if (iRatio > wRatio) {
            nHeight = (wWidth / iWidth) * iHeight;
            nWidth = wWidth;
        } else {
            nWidth = (wHeight / iHeight) * iWidth;
            nHeight = wHeight;
        }

        var nTop = 0 - ((nHeight - wHeight) / 2);
        var nLeft =  0 - ((nWidth - wWidth) / 2);

        $('#background-holder img').css({height: nHeight, width: nWidth}).css({top: nTop, left: nLeft}).show();
        $('#homepage h2').css('font-size', 44 * (nWidth / iWidth)  + 'pt');
        $('#homepage h3').css('font-size', 24 * (nWidth / iWidth)  + 'pt');
    }

    function init() {
        resizeImage();
        $(window).resize(resizeImage);
    }

    $(init);

});
