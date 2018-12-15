#!/usr/bin/env node

(function () {

  const { vChandas } = require('vchandas');
  const chalk = require('chalk');

  const options = require('yargs')
    .usage('Usage: $0 -s [string]')
    .options({
      'i': {
        alias: 'ignore-last-laghu',
        default: false,
        describe: 'Ignore Last Laghu in Pāda',
        type: 'boolean'
      },
      's': {
        alias: 'string',
        demand: true,
        describe: 'String to analyze for chandas',
        type: 'string'
      },
    })
    .help('h')
    .alias('h', 'help')
    .argv;

  const log = console.log; // eslint-disable-line no-console

  const handleOutput = chandasDetails => {

    if (chandasDetails) {

      log(chalk.yellow.bold('Syllables:'), '\n', chandasDetails.syllables);
      log(chalk.yellow.bold('Matras:'), '\n', chandasDetails.matras);
      log(chalk.yellow.bold('Ganas:'), '\n', chandasDetails.ganasKey);

      if (chandasDetails.chandas) {

        log(chalk.yellow.bold('Chandas type:'), '\n', chandasDetails.chandas.type);
        log(chalk.yellow.bold('Chandas name:'), '\n', chandasDetails.chandas.name);
        log(chalk.yellow.bold('Chandas definition:'), '\n', chandasDetails.chandas.definition);

        chandasDetails.chandas.examples.forEach((example, index) => {

          log(chalk `{yellow.bold Example ${index + 1}:}`, '\n', example);

        });

      } else {

        log(chalk.yellow.bold('Chandas:\n'), chalk.red('Not found!'));

      }

    }

  };

  if (options.string) {

    const vc = vChandas();

    const chandasDetails = vc(options.string, options.ignoreLastLaghu);

    handleOutput(chandasDetails);

  }

})();
