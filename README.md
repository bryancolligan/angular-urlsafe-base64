# angular-urlsafe-base64
Angular implementation that matches Python's base64.urlsafe_b64encode and base64.urlsafe_b64decode


## Installation

### Bower

```
bower install angular-urlsafe-base64
```



## Usage

```javascript
angular
    .module('myApp', ['angular-urlsafe-base64'])
    .controller('myController', [
    
        '$base64', '$scope', 
        function($base64, $scope) {
        
            $scope.encoded = $base64.encode('a string');
            $scope.urlsafe_encoded = $base64.url_safeencode('a string');
            $scope.decoded = $base64.decode('YSBzdHJpbmc=');
            $scope.urlsafe_decoded = $base64.urlsafe_decode('YSBzdHJpbmc=');
    }]);
```

### Unicode

You can encode unicode strings using base64 as described [here](https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_.22Unicode_Problem.22).

```javascript
angular
    .module('myApp', ['angular-urlsafe-base64'])
    .controller('myUnicodeController', [
    
        '$base64', '$scope', 
        function($base64, $scope) {
        
            $scope.encoded = $base64.encode(unescape(encodeURIComponent('✓ a string')));
            $scope.decoded = decodeURIComponent(escape($base64.decode('4pyTIGEgc3RyaW5n')));
    }]);
```


