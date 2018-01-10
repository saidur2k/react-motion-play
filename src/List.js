import React, { Component } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import ListForm from './ListForm'
export default class List extends Component {
  constructor (props) {
    super(props)

    // Start with some dummy data so that we don't have to add stuff each time.
    this.state = {
      todos: [
        {id: 1, todo: 'Take out trash', complete: false},
        {id: 2, todo: 'Walk the dog', complete: true},
        {id: 3, todo: 'Walk the cat', complete: true},
        {id: 4, todo: 'Walk the penguine', complete: true}
      ],
      newTodo: ''
    }
  }

  textChange (todo) {
    this.setState({newTodo: todo})
  }

  add (event) {
    event.preventDefault()
    if (this.state.newTodo) {
      let newId = this.state.todos.reduce((newId, e) => {
        if (e.id >= newId) return e.id + 1
        return newId
      }, 0)
      this.setState({
        todos: [...this.state.todos, {todo: this.state.newTodo, complete: false, id: newId}],
        newTodo: ''
      })
    }
  }

  remove (todo) {
    this.setState({todos: this.state.todos.filter(e => e !== todo)})
  }

  getDefaultStyles () {
    return this.state.todos.map((todo) => {
      return {
        style: {height: 0, opacity: 0},
        data: todo,
        key: todo.id + 'key'
      }
    })
  }

  getStyles () {
    return this.state.todos.map((todo) => {
      return {
        style: {height: spring(100, {stiffness: 100, dampening: 50}), opacity: spring(1)},
        data: todo,
        key: todo.id + 'key'
      }
    })
  }

  willEnter () {
    return {height: 0, opacity: 0}
  }

  willLeave () {
    return {height: spring(0), opacity: spring(0)}
  }

  listAll () {
    return (
      <TransitionMotion
        defaultStyles={this.getDefaultStyles()}
        styles={this.getStyles()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
        >
        {
          currentStyles => (
            <div className='List'>
              {currentStyles.map((e) => {
                return (
                  <div key={e.key} style={e.style} className='motionItem'>
                    {e.data.todo}
                    <span className='delete' onClick={() => this.remove(e.data)}>X</span>
                  </div>
                )
              })}
            </div>
          )
        }
      </TransitionMotion>
    )
  }

  render () {
    return (
      <div>
        <h1>My things to do</h1>
        <ListForm textChange={this.textChange.bind(this)} add={this.add.bind(this)} newTodo={this.state.newTodo} />
        {this.listAll()}
      </div>
    )
  }
}
