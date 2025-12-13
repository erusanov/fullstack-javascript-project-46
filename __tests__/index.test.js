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
  const fileA = getFixturePath('file1.json')
  const fileB = getFixturePath('file2.json')
  const expected = readFile('expected_flat.txt').trim()
  const result = genDiff(fileA, fileB)

  expect(normalizeEOL(result)).toEqual(normalizeEOL(expected))
})

test('gendiff flat yml', () => {
  const fileA = getFixturePath('file1.yml')
  const fileB = getFixturePath('file2.yml')
  const expected = readFile('expected_flat.txt').trim()
  const result = genDiff(fileA, fileB)

  expect(normalizeEOL(result)).toEqual(normalizeEOL(expected))
})

test('gendiff structured json', () => {
  const fileA = getFixturePath('nestedFile1.json')
  const fileB = getFixturePath('nestedFile2.json')
  const expected = readFile('expected_stylish.txt').trim()
  const result = genDiff(fileA, fileB)

  expect(normalizeEOL(result)).toEqual(normalizeEOL(expected))
})

test('gendiff structured yml', () => {
  const fileA = getFixturePath('nestedFile1.yml')
  const fileB = getFixturePath('nestedFile2.yml')
  const expected = readFile('expected_stylish.txt').trim()
  const result = genDiff(fileA, fileB)

  expect(normalizeEOL(result)).toEqual(normalizeEOL(expected))
})

test('gendiff plain format', () => {
  const fileA = getFixturePath('nestedFile1.json')
  const fileB = getFixturePath('nestedFile2.json')
  const expected = readFile('expected_plain.txt').trim()
  const result = genDiff(fileA, fileB, 'plain')

  expect(normalizeEOL(result)).toEqual(normalizeEOL(expected))
})

test('gendiff json format', () => {
  const fileA = getFixturePath('nestedFile1.json')
  const fileB = getFixturePath('nestedFile2.json')
  const expected = readFile('expected_json.txt').trim()
  const result = genDiff(fileA, fileB, 'json')

  expect(normalizeEOL(result)).toEqual(normalizeEOL(expected))
})
