require.config({
  paths: {
    aura: 'bower_components/aura/lib',
    jquery: 'bower_components/jquery/jquery',
    underscore: 'bower_components/underscore/underscore'
  }
});

require(['aura/aura'], function (Aura) {
  'use strict';

  var app = new Aura({
    /* Aurajs default components location were moved
     * to ./aura_components.
     * Override this to ./widgets */
    sources: { default: 'widgets' }
  });

  /*
  Add your extensions here.
  app.use('extensions/sample');
  */
  app.start({ components: 'body' });
});
