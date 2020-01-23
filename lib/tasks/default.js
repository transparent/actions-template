'use strict';

/**
 * Default task that will be run if no task is specified on the command line.
 *
 * ```sh
 * $ node index.js
 * ```
 *
 * @param {Object} `options` Options from the command line arguments, parsed using minimist.
 * @api public
 */

module.exports = async options => {
  console.log('Running the default task with the following options:');
  console.log('Options are parsed from the command line arguments using minimist.');
  console.log();
  console.log(options);
  console.log();
};
