#!/usr/bin/env node

import { Command } from 'commander'
import genDiff from '../src/genDiff.js'

const program = new Command()

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepathA>')
  .argument('<filepathB>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepathA, filepathB) => {
    const options = program.opts()
    console.log(genDiff(filepathA, filepathB, options.format))
  })

program.parse(process.argv)
