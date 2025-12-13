import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const parseData = (data, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(data)
    case '.yml':
    case '.yaml':
      return yaml.load(data)
    default:
      throw new Error(`Unknown format: ${format}`)
  }
}

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  const format = path.extname(absolutePath)
  const data = fs.readFileSync(absolutePath, 'utf-8')

  return parseData(data, format)
}

const parseFiles = (fileAPath, fileBPath) => {
  const dataA = parseFile(fileAPath)
  const dataB = parseFile(fileBPath)

  return {
    dataA,
    dataB,
  }
}

export default parseFiles
