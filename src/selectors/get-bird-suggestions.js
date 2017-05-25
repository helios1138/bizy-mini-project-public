import { createSelector } from 'reselect'
import _ from 'lodash'
import Levenshtein from 'levenshtein'

import { getSearchableBirds } from './get-searchable-birds'

const getInputValue = state => state.input.value
const getSuggestionLimit = () => 5

function findSuggestions(value, source) {
  let
    suggestionList = [],
    word = ''

  value.split('').forEach(char => {
    word += char
    if (source[word]) {
      suggestionList = source[word]
    }
  })

  return suggestionList
}

function simpleSearch(value, suggestions, limit) {
  return suggestions
    .filter(item => item.slice(0, value.length).toLowerCase() === value)
    .slice(0, limit)
}

function getSuggestionPrefix(suggestion, value) {
  return suggestion.toLowerCase().slice(0, value.length)
}

function addPossibleSuggestions(suggestions, value, limit) {
  return _
    .chain(suggestions)
    .map(suggestion => ({
      string: suggestion,
      distance: +new Levenshtein(
        getSuggestionPrefix(suggestion, value),
        value
      )
    }))
    .sortBy('distance')
    .filter(suggestion => suggestion.distance > 0)
    .slice(0, limit)
    .map(suggestion => suggestion.string)
    .value()
}

function search(value, source, limit) {
  let result

  if (source[value]) {
    result = source[value].slice(0, limit)
  }
  else {
    let suggestions = findSuggestions(value, source)

    result = simpleSearch(value, suggestions, limit)

    if (result.length < limit) {
      result = result.concat(
        addPossibleSuggestions(
          suggestions,
          value,
          limit - result.length
        )
      )
    }
  }

  return result
}

export const getBirdSuggestions = createSelector(
  [getInputValue, getSearchableBirds, getSuggestionLimit],
  (value, source, limit) => search(value.toLowerCase(), source, limit)
)
