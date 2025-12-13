import fs from 'fs'
import path from 'path'

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  const data = fs.readFileSync(absolutePath, 'utf-8')

  return JSON.parse(data)
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
