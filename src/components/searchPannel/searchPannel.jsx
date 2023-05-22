import React from 'react'
import { debounce } from 'lodash'

import './searchPannel.css'

class SearchPannel extends React.Component {
  constructor(props) {
    super(props)
    this.debouncedGetMovies = debounce(this.props.getMovies, 1000)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.debouncedGetMovies(this.props.value, 1)
    }
  }
  render() {
    const { getInputValue, value } = this.props
    return (
      <form id="form" onSubmit={(evt) => evt.preventDefault()}>
        <input
          form="form"
          type="text"
          placeholder="Type to search..."
          onChange={(evt) => getInputValue(evt)}
          value={value}
          className="movies__search"
        />
      </form>
    )
  }
}

export default SearchPannel
