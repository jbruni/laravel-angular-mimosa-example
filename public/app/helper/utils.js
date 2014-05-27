/*
 * Miscellaneous utilities module
 * 
 * - Some helper functions
 */

define(['require'], function(require) {
    var helper = {};

    helper.serverTimeOffset = 0;

    helper.preload = function (urls) {
        function noop() {}
        for(var img, num = 0, max = urls.length; num < max; num++) {
            img = new Image();
            img.onload = noop;
            img.src = require.toUrl(urls[num]);
        }
    };

    helper.makeDate = function(dateString) {
        var regex = /(\d{2})\/(\d{2})\/(\d{4})/;
        var dateArray = regex.exec(dateString); 
        return new Date(
            (+dateArray[3]),
            (+dateArray[2])-1, // Careful, month starts at 0!
            (+dateArray[1])
        );
    };

    helper.formatDate = function(date) {
        return (date.getDate() + 100 + '').substr(1) + '/' + (date.getMonth() + 101 + '').substr(1) + '/' + date.getFullYear();
    };

    helper.addDays = function(date, daysToAdd) {
        var string = (typeof date != 'object');
        if (string) date = helper.makeDate(date);
        date.setUTCDate(date.getUTCDate() + daysToAdd);
        return (string ? helper.formatDate(date) : date);
    };

    helper.today = function() {
        return helper.formatDate(helper.now());
    };

    helper.now = function() {
        var date = new Date();
        date.setTime(date.getTime() + helper.serverTimeOffset);
        return date;
    };

    helper.tomorrow = function() {
        var date = helper.now();
        return helper.addDays(date, 1);
    };

    helper.setServerTime = function(serverTime) {
        var time = new Date();
        helper.serverTimeOffset = (serverTime * 1) - (time.valueOf() * 1);
    };

    helper.depoisDasOito = function() {
        return helper.now().getHours() >= 20;
    };

    // https://github.com/kvz/phpjs/blob/master/functions/strings/number_format.js
    helper.number_format = function number_format (number, decimals, dec_point, thousands_sep) {
        number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function (n, prec) {
                var k = Math.pow(10, prec);
                return '' + Math.round(n * k) / k;
            };
        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    };

    return helper;
});
