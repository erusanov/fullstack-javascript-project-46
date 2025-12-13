import lodash from 'lodash'

const { isObject } = lodash

const stylish = (tree) => {
  const iter = (currentNode, depth) => {
    const replacer = ' '
    const spacesCount = 4
    const indentSize = depth * spacesCount
    const currentIndent = replacer.repeat(indentSize)
    const signIndent = replacer.repeat(indentSize - 2)

    const stringify = (data, stringifyDepth) => {
      if (!isObject(data)) {
        return `${data}`
      }

      const lineIndent = replacer.repeat(stringifyDepth * spacesCount)
      const bracketIndent = replacer.repeat((stringifyDepth - 1) * spacesCount)

      const lines = Object.entries(data)
        .map(([key, val]) => `${lineIndent}${key}: ${stringify(val, stringifyDepth + 1)}`)

      return `{\n${lines.join('\n')}\n${bracketIndent}}`
    }

    switch (currentNode.type) {
      case 'nested': {
        const lines = currentNode.children.map(child => iter(child, depth + 1))

        return `${currentIndent}${currentNode.key}: {\n${lines.join('\n')}\n${currentIndent}}`
      }
      case 'added':
        return `${signIndent}+ ${currentNode.key}: ${stringify(currentNode.value, depth + 1)}`
      case 'deleted':
        return `${signIndent}- ${currentNode.key}: ${stringify(currentNode.value, depth + 1)}`
      case 'changed': {
        const line1 = `${signIndent}- ${currentNode.key}: ${stringify(currentNode.valueA, depth + 1)}`
        const line2 = `${signIndent}+ ${currentNode.key}: ${stringify(currentNode.valueB, depth + 1)}`

        return `${line1}\n${line2}`
      }
      case 'unchanged':
        return `${currentIndent}${currentNode.key}: ${stringify(currentNode.value, depth + 1)}`
      default:
        throw new Error(`Unknown type: ${currentNode.type}`)
    }
  }

  const resultLines = tree.map(node => iter(node, 1))

  return `{\n${resultLines.join('\n')}\n}`
}

export default stylish
