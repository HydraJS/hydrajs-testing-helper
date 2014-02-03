# hydrajs-testing-helper

Is a testing extension helper that add some helper methods to make easy test all Hydra modules.

## Updated to version 1.4.1

[![Build Status](https://travis-ci.org/HydraJS/hydrajs-testing-helper.png)](https://travis-ci.org/HydraJS/hydrajs-testing-helper)

[Changelog](https://raw.github.com/HydraJS/hydrajs-testing-helper/master/changelog.txt)

## Install

Install with [Bower](http://bower.io)

bower install hydrajs-testing-helper

Install with [Component](http://component.io)

component install hydrajs-testing-helper

Install with [NPM](http://npmjs.org)

npm install hydrajs-testing-helper

### Use in browser

Insert in your html code:

<script type="text/javascript" src="hydra.js"></script
<script type="text/javascript" src="hydrajs-testing-helper.js"></script>

### Use with requirejs

Insert in your code:

define(['hydrajs-testing-helper'], function () {
// code here.
});


### Common usage

hydrajs-testing-helper extends Hydra.js library adding new methods.

#### Hydra.setTestFramework

*This method is needed to set which test framework we will use. If the test framework is not set the other methods will not work.*

Hydra.setTestFramework( oTestFramework );

#### Hydra.module.getModule

This method returns a instance of the module is useful to use it when you want a module to be accessible in your tests.

Hydra.module.getModule( sModuleId, sIdInstance, function( oMod ) {
    oModule = oMod;
});

#### Hydra.module.test

This method returns a module that will not wrap any method allowing you to test it and get the errors.

*With callback:*

var oModule = null;
Hydra.module.test( 'moduleId', function(oMod) {
oModule = oMod;
});

*Without callback:*

var oModule = Hydra.module.test( 'moduleId' );

This method allow you to mock all your dependencies defined when the module is registered:
##### How to mock dependencies

*Automatic:*

var oModule = Hydra.module.test( sModuleId );

Using only the id of the module, the method will check for the dependencies defined when the module was registered and it will resolve them but returning the objects after being mocked.

*Using an array:*

var oModule = Hydra.module.test( sModuleId, [ dependency1, dependency2 ]);

You should add an array with the mocked objects in the same order that were defined when the module was registered.

*Using an object:*

var oModule = Hydra.module.test( sModuleId, { dep1: dependency1, dep2: dependency2 });

You should add an object with the mocked objects and the keys should be the same that were defined when the module was registered.



## API
### Hydra
#### setTestFramework - Params [Object - framework test]
This method expects an object [Jasmine, jstestdriver...]

### Hydra.module
#### getModule - Params [String - identifier of Module, String - identifier of Instance]
#### test - Params [String - identifier of Module, [Function, Object or Array]]

*Tip: You can see how it can be used in the [Hydra's test file](https://github.com/HydraJS/HydraJS/blob/master/test/Hydra.js)*

# License
hydrajs-testing-helper is licensed under MIT license. (see LICENSE file)