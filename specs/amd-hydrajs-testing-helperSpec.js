define( ['hydrajs-testing-helper'], function(){

  describe( 'Hydra setTestFramework', function () {

    it( 'should check that setTestFramework exist in Hydra.js', function () {
      expect( Hydra.setTestFramework ).toBeDefined();
    } );

    it( 'should check that setTestFramework expects one argument', function () {
      expect( Hydra.setTestFramework.length ).toEqual( 1 );
    } );

  } );

  describe( 'Hydra getModule', function () {

    beforeEach( function () {
    } );

    afterEach( function () {
      Hydra.setTestFramework(null);
    } );

    it( 'should throw an error if the module to get the instance has not been registered', function () {
      expect( function () {
        Hydra.setTestFramework( jasmine );
        Hydra.module.getModule( 'test', 'test2', function ( oModule ) {});
      } ).toThrow();
    } );


    it( 'should check that Hydra.module.getInstance is called if the framework of test has been set', function () {
      var oMod, oStub = sinon.stub(), flag = false;
      runs( function () {
        Hydra.setTestFramework( jasmine );
        Hydra.module.register( 'test', function () {
          return {
            init: function () {
              oStub();
            }
          };
        } );
      });

      waitsFor( function () {
        Hydra.module.getModule( 'test', 'test2', function ( oModule ) {
          flag = true;
          oMod = oModule;
        } );
        return flag;
      }, 'It is waiting to resolve the module', 1000);

      runs( function () {
        oMod.init();
        expect( oStub.callCount ).toEqual( 1 );
      });
    } );
  } );

  describe( 'Hydra module test', function () {

    var sModuleId = 'test'
      , fpCallback = sinon.stub()
      , fpDestroyStub = sinon.stub()
      , fpModuleCreator = function () {
        return {
          init: function () {},
          handleAction: function () {},
          destroy: fpDestroyStub
        };
      };
    beforeEach( function () {
      Hydra.setTestFramework( jasmine );
      Hydra.module.register( sModuleId, fpModuleCreator );
    } );

    afterEach( function () {
      Hydra.module.remove( sModuleId );
      Hydra.setTestFramework( null );
    } );

    it( 'should call the callback', function () {
      Hydra.module.test( sModuleId, fpCallback, function () {
        expect( fpCallback.callCount ).toEqual( 1 );
      } );
    } );

    it( 'should return the module if test does not get a callback', function () {
      Hydra.module.test( sModuleId, undefined, function ( oModule ) {
        expect( oModule.init ).toBeDefined();
        expect( typeof oModule.init ).toEqual( 'function' );
      } );

    } );

  } );
} );
