'use strict';

const Composer = require('composer');
const argv = require('minimist')(process.argv.slice(2));
const tasks = require('./lib/tasks');

const composer = new Composer();
const keys = Object.keys(tasks);

for (let key of keys) {
  composer.task(key, async () => {
    const results = await tasks[key](argv);
    console.log(results);
  });
}

composer.build(argv._.length ? argv._ : ['default']);
