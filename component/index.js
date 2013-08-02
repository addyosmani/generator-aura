'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');

module.exports = ComponentGenerator;

function ComponentGenerator() {
  yeoman.generators.Base.apply(this, arguments);
  this.sourceRoot(path.join(path.dirname(__dirname), 'templates'));
  this.argument('name', { type: String, required: true });
}

util.inherits(ComponentGenerator, yeoman.generators.Base);

ComponentGenerator.prototype.createAuraComponentFiles = function createAuraComponentFiles() {
  this.template('aura_components/main.js', 'app/aura_components/' + this.name + '/main.js');
  // TODO: generate test
};
