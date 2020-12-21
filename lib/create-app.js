'use strict';

const chalk = require('chalk');
const { program } = require('commander');
const dns = require('dns');
const envinfo = require('envinfo');
const execSync = require('child_process').execSync;
const fs = require('fs-extra');
const hyperquest = require('hyperquest');
const inquirer = require('inquirer');
const os = require('os');
const path = require('path');
const semver = require('semver');
const spawn = require('cross-spawn');
const tmp = require('tmp');
const unpack = require('tar-pack').unpack;
const url = require('url');
const validateProjectName = require('validate-npm-package-name');

program
  .command('create <app-name>')
  .description('Create new app')
  .option('-t, --type [value]')
  .action((name, args) => {
    console.log(name);
    console.log(args.type)
  })

program.parse(process.argv);
