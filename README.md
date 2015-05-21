# angular-urlsafe-base64
Angular implementation that matches Python's base64.urlsafe_b64encode and base64.urlsafe_b64decode


## Installation

### Bower

```
bower install angular-base64
```

**NB:** The `ngBase64` bower package is deprecated due to camel casing issues on case-sensitive file systems.

```html
<script src="bower_components/angular-base64/angular-base64.js"></script>
```

## Usage

```javascript
angular
    .module('myApp', ['base64'])
    .controller('myController', [
    
        '$base64', '$scope', 
        function($base64, $scope) {
        
            $scope.encoded = $base64.encode('a string');
            $scope.decoded = $base64.decode('YSBzdHJpbmc=');
    }]);
```

### Unicode

You can encode unicode strings using base64 as described [here](https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_.22Unicode_Problem.22).

```javascript
angular
    .module('myApp', ['base64'])
    .controller('myUnicodeController', [
    
        '$base64', '$scope', 
        function($base64, $scope) {
        
            $scope.encoded = $base64.encode(unescape(encodeURIComponent('✓ a string')));
            $scope.decoded = decodeURIComponent(escape($base64.decode('4pyTIGEgc3RyaW5n')));
    }]);
```

### *URL Safety*

If you want to transmit a base64 encoded string in a url you must make it "URL safe" by encoding it with `encodeURIComponent`.

```javascript
var base64EncodedString = $base64.encode('a string');
var urlSafeBase64EncodedString = encodeURIComponent(base64EncodedString);
```

To decode the above string use `decodeURIComponent`, then `decode`.

```javascript
var base64EncodedString = decodeURIComponent('YSBzdHJpbmc%3D');
var decodedString = $base64.decode(base64EncodedString);
```
