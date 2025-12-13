import lodash from 'lodash'

const { isObject, isString } = lodash

const formatValue = (value) => {
  if (isObject(value)) {
    return '[complex value]'
  }

  if (isString(value)) {
    return `'${value}'`
  }

  return value
}

const plain = (tree) => {
  const iter = (node, path) => {
    const currentPath = path ? `${path}.${node.key}` : node.key

    switch (node.type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${formatValue(node.value)}`
      case 'deleted':
        return `Property '${currentPath}' was removed`
      case 'changed':
        return `Property '${currentPath}' was updated. From ${formatValue(node.valueA)} to ${formatValue(node.valueB)}`
      case 'nested':
        return node.children.flatMap((child) => iter(child, currentPath)).filter(Boolean).join('\n')
      case 'unchanged':
        return null
      default:
        throw new Error(`Unknown node type: ${node.type}`)
    }
  }

  return tree.flatMap((node) => iter(node, '')).filter(Boolean).join('\n')
}

export default plain
