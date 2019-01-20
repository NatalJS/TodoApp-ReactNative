import React from 'react';
import { View, StyleSheet } from 'react-native';
import Todo from './todo';

class TodoList extends React.Component {
  render() {
    const todosToRender = 
      this.props.todoList.map((todo) => {
        return (
          <Todo 
            navigation={this.props.navigation}
            todo={todo} 
          />
        );
      });

    return (
      <View style={styles.container}>
        {todosToRender}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15
  }
})


export default TodoList;
