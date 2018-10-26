#!/usr/bin/env node
'use strict';
const program = require('commander'),
    chalk = require("chalk"),
    pkg = require('../package.json'),
    path = require('path'),
    fs = require('fs');

program
    .version(pkg.version)
    .command('service <service> [dir]')
    .option('-n, --name', "Service Name")
    .option('-d, --dir', 'Directory Name')
    .alias('s')
    .action((service, dir) => {
        let filename = `${service}.service.js`;
        let dirName = "src/services/";
        if (dir) {
            dirName = dir + '/';
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
        }

        if (fs.existsSync(dirName + filename)) {
            console.log(chalk.red(`${filename} already exists`));
            return;
        }

        fs.copyFileSync(path.resolve(__dirname, '../templates/bootstrap.service.js'),
            path.resolve(dirName + filename));
        console.log(chalk.green(`${filename} created`));

    });

program.parse(process.argv);

// if program was called with no arguments, show help.
if (program.args.length === 0) program.help();