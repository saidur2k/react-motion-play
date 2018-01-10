import React, { Component } from 'react'
export default class ListForm extends Component {
  onChangeHandler (input) {
    return this.props.textChange(input.target.value)
  }

  render () {
    return (
      <form onSubmit={(event) => this.props.add(event)}>
        <input type='text' onChange={this.onChangeHandler.bind(this)} value={this.props.newTodo} />
        <button type='submit'>New Todo</button>
      </form>
    )
  }
}
