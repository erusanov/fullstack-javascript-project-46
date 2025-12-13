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

test('gendiff flat json files', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.json')
  const expected = normalizeEOL(readFile('expected_flat.txt').trim())

  expect(
    normalizeEOL(
      genDiff(filepath1, filepath2),
    ),
  )
    .toEqual(expected)
})
