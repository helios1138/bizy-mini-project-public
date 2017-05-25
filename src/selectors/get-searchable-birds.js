import { createSelector } from 'reselect'

const getBirds = state => state.birds
const getStoredLimit = () => 20

function transformListToPrefixMap(list, limit) {
  const result = {}

  list.forEach(item => {
    let
      prefix = '',
      itemLowerCase = item.toLowerCase()

    itemLowerCase.split('').forEach(character => {
      prefix += character

      if (result[prefix] === undefined) {
        result[prefix] = []
      }

      if (result[prefix].length < limit) {
        result[prefix].push(item)
      }
    })

  })

  return result
}

function optimizeSuggestions(prefixMap, limit) {
  const reducer = (result, prefix) => {
    if (prefixMap[prefix].length === limit) {
      result[prefix] = prefixMap[prefix]
    }

    return result
  }

  return Object
    .keys(prefixMap)
    .reduce(reducer, {})
}

export const getSearchableBirds = createSelector(
  [getBirds, getStoredLimit],
  (birds, storedLimit) => {
    birds.sort()

    return optimizeSuggestions(
      transformListToPrefixMap(birds, storedLimit),
      storedLimit
    )
  }
)
