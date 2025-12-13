import stylish from './stylish.js'

const formatters = {
  stylish,
}

export default (formatName) => {
  const formatter = formatters[formatName]

  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`)
  }

  return formatter
}
