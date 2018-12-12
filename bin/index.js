#!/usr/bin/env node
'use strict';
const program = require('commander'),
    chalk = require("chalk"),
    pkg = require('../package.json'),
    path = require('path'),
    fs = require('fs');

function copyFile(templatePath, filename) {
    fs.copyFileSync(path.resolve(__dirname, templatePath),
        path.resolve(filename));
    console.log(chalk.green(`${filename} created`));
}

function createDirectory(directory) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }
}

program
    .version(pkg.version)
    .command('service <service> [dir]')
    .alias('s')
    .action((name, directory = "src/services") => {
        let filename = `${directory}/${name}.service.js`;
        createDirectory(directory);
        if (fs.existsSync(filename)) {
            console.log(chalk.red(`${filename} already exists`));
            return;
        }
        copyFile('../templates/bootstrap.service.js', filename);
    });

program
    .version(pkg.version)
    .command('enum <enum> [dir]')
    .alias('e')
    .action((name, directory = "src/enums") => {
        let filename = `${directory}/${name}.enum.js`;
        createDirectory(directory);
        if (fs.existsSync(filename)) {
            console.log(chalk.red(`${filename} already exists`));
            return;
        }
        copyFile('../templates/bootstrap.enum.js', filename);
    });

program.parse(process.argv);

// if program was called with no arguments, show help.
if (program.args.length === 0) program.help();