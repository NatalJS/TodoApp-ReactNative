import React from 'react';
import { View } from 'react-native';
import Todo from './todo';

class TodoList extends React.Component {
  render() {
    const todosToRender = 
      this.props.todoList.map(function(todo) {
        return <Todo text={todo.text} />
      });

    return (
      <View>
        {todosToRender}
      </View>
    )
  }
}

export default TodoList;
