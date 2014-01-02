# hydrajs-testing-helper

Is a testing extension helper that add some helper methods to make easy test all Hydra modules.

## Updated to version 1.0.0

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

    define(['hydrajs-testing-helper'], function ( testingHelper ) {
        // code here.
    });

### Common usage

hydrajs-testing-helper extends Hydra.js library adding new methods.

## Hydra.setTestFramework

*This method is needed to set which test framework we will use. If the test framework is not set the other methods will not work.*

	Hydra.setTestFramework( oTestFramework );

## Hydra.module.getModule

This method returns a instance of the module is useful to use it when you want a module to be accessible in your tests.

	Hydra.module.getModule( sModuleId, sIdInstance );

## Hydra.module.test

This method returns a module that will not wrap any method allowing you to test it and get the errors.

	Hydra.module.test( sModuleId, function (oModule) {
		//Here you will have the not wrapped module to be used in your test
	});

If you need to manage dependencies in a module you can use Hydra.module.test in this way:

    var oModule = Hydra.module.test( sModuleId, [ dependency1, dependency2 ]);

TIP: You could set a variable where save the oModule in this way.

	var oModule = null;
	Hydra.module.test( 'moduleId', function(oMod) {
		oModule = oMod;
	});

## API
### Hydra
#### setTestFramework - Params [Object - framework test]
This method expects an object [Jasmine, jstestdriver...]

### Hydra.module
#### getModule - Params [String - identifier of Module, String - identifier of Instance]
#### test - Params [String - identifier of Module, [Function or Array]]

*Tip: You can see how it can be used in the [Hydra's test file](https://github.com/HydraJS/HydraJS/blob/master/test/Hydra.js)*

# License
hydrajs-testing-helper is licensed under MIT license. (see LICENSE file)