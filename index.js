'use strict';

const Composer = require('composer');
const argv = require('minimist')(process.argv.slice(2));
const tasks = require('./lib/tasks');

/**
 * This is using https://github.com/doowb/composer as a way to
 * simplify loading and running tasks from the ./lib/tasks folder.
 *
 * Each task is expected to be a function that will be executed
 * using the `await` keyword to allow waiting on a returned promise.
 *
 * The tasks are separated into individual functions to allow reuse
 * and composability.
 */

const composer = new Composer();
const keys = Object.keys(tasks);

for (let key of keys) {
  composer.task(key, async () => {
    const results = await tasks[key](argv);
    console.log(results);
  });
}

/**
 * This executes tasks specified as command line arguments (parsed by minimist).
 * If no tasks are specified, the `default` task is used. If the specified
 * task does not exist, an error is thrown.
 *
 * Multiple tasks may be passed and will be executed in series. Minimist will also
 * parse command line options to be added to the options object that is passed to
 * all tasks. See the example below of running a task with options.
 *
 * ```sh
 * $ node index.js my-task --my-option my-value --my-boolean-option
 * // options object passed to 'my-task'
 * // { 'my-option': 'my-value', 'my-boolean-option': true }
 * ```
 */

composer.build(argv._.length ? argv._ : ['default'])
  .catch(console.error);
