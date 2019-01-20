import React, {Component} from 'react';
import { 
  createStackNavigator, createAppContainer
} from 'react-navigation';
import { 
  StyleSheet, ScrollView, View, Text 
} from 'react-native';
import TodoList from './components/todo-list';
import AddTodo from './components/add-todo';

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: '#1564bf',
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
}

class TodoDetails extends Component {
  static navigationOptions = {
    ...defaultNavigationOptions,
    title: 'Todo'
  }

  render() {
    return (
      <View>
        <Text>
          {this.props.navigation.getParam('text')}
        </Text>
      </View>
    )
  }
}

class Home extends Component {
  static navigationOptions = {
    ...defaultNavigationOptions,
    title: 'Todo App',
  };

  constructor(props) {
    super(props);

    const todo1 = {
      text: 'fazer o app bonitao o/',
    };
    const todo2 = {
      text: 'fazer o app maaais bonitao',
    };
    const todo3 = {
      text: 'lanchar',
    };
    this.state = {
      todos: [todo1, todo2, todo3],
    }
  }

  addTodo(text) {
    this.setState({
      todos: [{ text: text }].concat(this.state.todos)
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
        >
          <AddTodo add={text => this.addTodo(text)}/>
          <TodoList 
            todoList={this.state.todos}
            navigation={this.props.navigation}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  scrollView: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  TodoDetails: { screen: TodoDetails }
})

export default createAppContainer(AppNavigator);
