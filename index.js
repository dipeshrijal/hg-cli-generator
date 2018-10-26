#!/usr/bin/env node
'use strict';
/**
 * Require dependencies
 *
 */
const program = require('commander'),
    chalk = require("chalk"),
    exec = require('child_process').exec,
    pkg = require('./package.json'),
    path = require('path'),
    fs = require('fs');
const {prompt} = require('inquirer');


const QUESTIONS = [
    {
        name: 'service',
        type: 'input',
        message: 'What project template would you like to generate?',
    }
];


/**
 * list function definition
 *
 */
let hello = (directory, options) => {
    const cmd = 'ls';
    let params = [];

    if (options.all) params.push("a");
    if (options.long) params.push("l");
    let parameterizedCommand = params.length
        ? cmd + ' -' + params.join('')
        : cmd;
    if (directory) parameterizedCommand += ' ' + directory;

    let output = (error, stdout, stderr) => {
        if (error) console.log(chalk.red.bold.underline("exec error:") + error);
        if (stdout) console.log(chalk.green.bold.underline("Result:") + stdout);
        if (stderr) console.log(chalk.red("Error: ") + stderr);
    };

    exec(parameterizedCommand, output);

};


program
    .version(pkg.version)
    .command('hello [directory]')
    .option('-a, --all', 'List all')
    .option('-l, --long', 'Long list format')
    .action(hello);

// program
//     .version(pkg.version)
//     .command('service [filename]')
//     .action(() => {
//         prompt(QUESTIONS)
//             .then(({service}) => {
//                 console.log(service);
//                 fs.copyFileSync(path.resolve(__dirname, 'templates/bootstrap.service.js'),
//                     path.resolve(__dirname, `src/services/${service}.service.js`));
//             })
//     });

program
    .version(pkg.version)
    .command('service [filename]')
    .alias('s')
    .action((service) => {
        fs.copyFileSync(path.resolve(__dirname, 'templates/bootstrap.service.js'),
            path.resolve(__dirname, `src/services/${service}.service.js`));
        console.log(chalk.green(`${service}.service.js created`));

    });

program.parse(process.argv);

// if program was called with no arguments, show help.
if (program.args.length === 0) program.help();