(function(angular) {
    'use strict';

    angular.module('angular-urlsafe-base64', [])
        .factory('$base64', function () {

            var PADCHAR = '=';

            var ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
            var URLSAFE_ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
            var BETA = ALPHA;

            function getbyte64(s, i) {
                    var idx = BETA.indexOf(s.charAt(i));
                    if (idx == -1) {
                        console.log(s.charAt(i));
                        throw "Cannot decode base64";
                    }
                    return idx;
            }

            function urlsafe_decode(s) {
                BETA = URLSAFE_ALPHA;
                return decode(s);
            }

            function decode(s) {
                // convert to string
                s = "" + s;
                var pads, i, b10;
                var imax = s.length;
                if (imax == 0) {
                    return s;
                }

                if (imax % 4 != 0) {
                    for(var i=1; (imax % 4)>= i; i++ ){
                        s = s + "=";
                        imax++;
                    }
                }


                pads = 0;
                if (s.charAt(imax - 1) == PADCHAR) {
                    pads = 1;
                    if (s.charAt(imax - 2) == PADCHAR) {
                        pads = 2;
                    }
                    // either way, we want to ignore this last block
                    imax -= 4;
                }

                var x = [];
                for (i = 0; i < imax; i += 4) {
                    b10 = (getbyte64(s, i) << 18) | (getbyte64(s, i + 1) << 12) |
                    (getbyte64(s, i + 2) << 6) | getbyte64(s, i + 3);
                    x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff, b10 & 0xff));
                }

                switch (pads) {
                    case 1:
                        b10 = (getbyte64(s, i) << 18) | (getbyte64(s, i + 1) << 12) | (getbyte64(s, i + 2) << 6);
                        x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff));
                        break;
                    case 2:
                        b10 = (getbyte64(s, i) << 18) | (getbyte64(s, i + 1) << 12);
                        x.push(String.fromCharCode(b10 >> 16));
                        break;
                }
                return x.join('');
            }

            function getbyte(s, i) {
                var x = s.charCodeAt(i);
                if (x > 255) {
                    throw "INVALID_CHARACTER_ERR: DOM Exception 5";
                }
                return x;
            }

            function urlsafe_encode(s) {
                BETA = URLSAFE_ALPHA;
                return encode(s);
            }

            function encode(s) {
                if (arguments.length != 1) {
                    throw "SyntaxError: Not enough arguments";
                }

                var i, b10;
                var x = [];

                // convert to string
                s = "" + s;

                var imax = s.length - s.length % 3;

                if (s.length == 0) {
                    return s;
                }
                for (i = 0; i < imax; i += 3) {
                    b10 = (getbyte(s, i) << 16) | (getbyte(s, i + 1) << 8) | getbyte(s, i + 2);
                    x.push(BETA.charAt(b10 >> 18));
                    x.push(BETA.charAt((b10 >> 12) & 0x3F));
                    x.push(BETA.charAt((b10 >> 6) & 0x3f));
                    x.push(BETA.charAt(b10 & 0x3f));
                }
                switch (s.length - imax) {
                    case 1:
                        b10 = getbyte(s, i) << 16;
                        x.push(BETA.charAt(b10 >> 18) + BETA.charAt((b10 >> 12) & 0x3F) +
                        PADCHAR + PADCHAR);
                        break;
                    case 2:
                        b10 = (getbyte(s, i) << 16) | (getbyte(s, i + 1) << 8);
                        x.push(BETA.charAt(b10 >> 18) + BETA.charAt((b10 >> 12) & 0x3F) +
                        BETA.charAt((b10 >> 6) & 0x3f) + PADCHAR);
                        break;
                }
                return x.join('');
            }

            return {
                encode: encode,
                urlsafe_encode: urlsafe_encode,
                decode: decode,
                urlsafe_decode: urlsafe_decode
            };
        });
})(angular);
