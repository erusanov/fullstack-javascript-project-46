import lodash from 'lodash'
import parseFiles from './parseFiles.js'
import format from './formatters/index.js'

const { isObject, union, sortBy, has } = lodash

const buildTree = (dataA, dataB) => {
  const keysA = Object.keys(dataA)
  const keysB = Object.keys(dataB)
  const sortedKeys = sortBy(union(keysA, keysB))

  return sortedKeys.map((key) => {
    const valueA = dataA[key]
    const valueB = dataB[key]

    if (!has(dataA, key)) {
      return {
        key,
        type: 'added',
        value: valueB,
      }
    }

    if (!has(dataB, key)) {
      return {
        key,
        type: 'deleted',
        value: valueA,
      }
    }

    if (isObject(valueA) && isObject(valueB)) {
      return {
        key,
        type: 'nested',
        children: buildTree(valueA, valueB),
      }
    }

    if (valueA !== valueB) {
      return {
        key,
        type: 'changed',
        valueA,
        valueB,
      }
    }

    return {
      key,
      type: 'unchanged',
      value: valueA,
    }
  })
}

const genDiff = (filepathA, filepathB, formatName = 'stylish') => {
  const { dataA, dataB } = parseFiles(filepathA, filepathB)

  const tree = buildTree(dataA, dataB)
  const formatter = format(formatName)

  return formatter(tree)
}

export default genDiff
