import './autocomplete.css'

import React from 'react'
import { connect } from 'react-redux'

import { app } from '../actions/app'
import { getBirdSuggestions } from '../selectors/get-bird-suggestions'

class Autocomplete extends React.Component {
  get suggestionsVisible() {
    return (
      this.props.suggestions.length > 0 &&
      this.props.suggestions[0].toLowerCase() !== this.props.inputValue.toLowerCase()
    )
  }

  onChange = ({ target: { value } }) => {
    this.props.setInputValue(value)
  }

  onSuggestionSelected = suggestion => {
    this.props.setInputValue(suggestion)
  }

  onKeyDown = e => {
    if (e.key === 'Tab') {
      e.preventDefault()
      this.selectFirstSuggestion()
    }
    else if (e.key === 'Enter') {
      e.preventDefault()
      this.props.setInputValue('')
    }
  }

  inputRef = ref => {
    if (ref) {
      ref.focus()
    }
  }

  selectFirstSuggestion() {
    if (this.props.suggestions.length > 0) {
      this.onSuggestionSelected(this.props.suggestions[0])
    }
  }

  render() {
    return (
      <div className="autocomplete">
        <input type="text"
               className="input"
               onChange={this.onChange}
               onKeyDown={this.onKeyDown}
               value={this.props.inputValue}
               ref={this.inputRef} />

        {this.suggestionsVisible > 0 && (
          <ul className="suggestions">

            {this.props.suggestions.map((suggestion, i) => (
              <li key={i}
                  className="item"
                  onClick={() => this.onSuggestionSelected(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

Autocomplete = connect(
  state => ({
    inputValue: state.input.value,
    suggestions: getBirdSuggestions(state)
  }),
  {
    setInputValue: app.input.set
  }
)(Autocomplete)

export { Autocomplete }
