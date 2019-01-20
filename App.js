import React, {Component} from 'react';
import { 
  createStackNavigator, createAppContainer
} from 'react-navigation';
import { 
  StyleSheet, ScrollView, View, Text ,
  PermissionsAndroid
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
      id: 1, text: 'fazer o app bonitao o/',
    };
    const todo2 = {
      id: 2, text: 'fazer o app maaais bonitao',
    };
    const todo3 = {
      id: 3, text: 'lanchar',
    };
    this.state = {
      idCount: 3,
      todos: [todo1, todo2, todo3],
    }
    this.requestMapsPermission();
  }

  async requestMapsPermission() {
    try {
      const isGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Todo app location access',
          'message': 'We need your location to know here you created a todo'
        }
      )
      this.setState({
        geolocationPermissionGranted: isGranted,
      })
    } catch (err) {
      return;
    }
  }  

  async setTodoLocation(id, coords) {
    const { latitude, longitude } = coords;
    const { todoList } = this.state;
    todoList.find(todo => todo.id === id).location = coords;
    this.setState({
      todoList: todoList
    });
  }

  addTodo(text) {
    const id = this.state.idCount + 1;
    this.setState({
      todos: [{ id: id, text: text }].concat(this.state.todos),
      idCount: id
    });

    if (this.state.geolocationPermissionGranted) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.setTodoLocation(id, pos.coords)
      }, null, { enableHighAccuracy: true })
    }
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
