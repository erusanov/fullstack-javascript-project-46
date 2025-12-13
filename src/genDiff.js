import lodash from 'lodash'
import parseFiles from './parseFiles.js'

const { union, sortBy, has } = lodash

const wrapBrackets = (content) => {
  return `{
${content}
}`
}

const genDiff = (fileAPath, fileBPath) => {
  const { dataA, dataB } = parseFiles(fileAPath, fileBPath)

  const keysA = Object.keys(dataA)
  const keysB = Object.keys(dataB)
  const sortedKeys = sortBy(union(keysA, keysB))

  const diff = sortedKeys.map((key) => {
    if (!has(dataA, key)) {
      return `  + ${key}: ${dataB[key]}`
    }

    if (!has(dataB, key)) {
      return `  - ${key}: ${dataA[key]}`
    }

    if (dataA[key] !== dataB[key]) {
      return [
        `  - ${key}: ${dataA[key]}`,
        `  + ${key}: ${dataB[key]}`,
      ].join('\n')
    }

    return `    ${key}: ${dataA[key]}`
  })

  return wrapBrackets(diff.join('\n'))
}

export default genDiff
