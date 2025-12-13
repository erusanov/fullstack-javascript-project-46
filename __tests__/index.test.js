import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'fs'
import genDiff from '../src/genDiff.js'
import { test, expect } from '@jest/globals'

const file = fileURLToPath(import.meta.url)
const catalog = dirname(file)
const normalizeEOL = str => str.replace(/\r\n?/g, '\n')
const getFixturePath = filename => path.join(catalog, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

test('gendiff flat json', () => {
  const flatJsonFilePathA = getFixturePath('file1.json')
  const flatJsonFilePathB = getFixturePath('file2.json')
  const flatExpected = readFile('expected_flat.txt').trim()
  const flatJsonResult = genDiff(flatJsonFilePathA, flatJsonFilePathB)

  expect(normalizeEOL(flatJsonResult)).toEqual(normalizeEOL(flatExpected))
})

test('gendiff flat yml', () => {
  const flatYmlFilePathA = getFixturePath('file1.yml')
  const flatYmlFilePathB = getFixturePath('file2.yml')
  const flatExpected = readFile('expected_flat.txt').trim()
  const flatYmlResult = genDiff(flatYmlFilePathA, flatYmlFilePathB)

  expect(normalizeEOL(flatYmlResult)).toEqual(normalizeEOL(flatExpected))
})

test('gendiff structured json', () => {
  const structuredJsonFilePathA = getFixturePath('nestedFile1.json')
  const structuredJsonFilePathB = getFixturePath('nestedFile2.json')
  const structuredExpected = readFile('expected_stylish.txt').trim()
  const structuredJsonResult = genDiff(structuredJsonFilePathA, structuredJsonFilePathB)

  expect(normalizeEOL(structuredJsonResult)).toEqual(normalizeEOL(structuredExpected))
})

test('gendiff structured yml', () => {
  const structuredYmlFilePathA = getFixturePath('nestedFile1.yml')
  const structuredYmlFilePathB = getFixturePath('nestedFile2.yml')
  const structuredExpected = readFile('expected_stylish.txt').trim()
  const structuredYmlResult = genDiff(structuredYmlFilePathA, structuredYmlFilePathB)

  expect(normalizeEOL(structuredYmlResult)).toEqual(normalizeEOL(structuredExpected))
})
