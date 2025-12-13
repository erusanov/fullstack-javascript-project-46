#!/usr/bin/env node

import { Command } from 'commander'
import genDiff from '../src/genDiff.js'

const program = new Command()

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepathA>')
  .argument('<filepathB>')
  .option('-f, --format [type]', 'output format')
  .action((filepathA, filepathB) => {
    console.log(genDiff(filepathA, filepathB))
  })

program.parse(process.argv)
