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
    const todo = this.props.navigation.getParam('todo');
    return (
      <View>
        <Text>
          {todo.text}
        </Text>
        <Text>
          Created at: {todo.location}
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
        geolocationPermissionGranted: isGranted === 'granted',
      })
    } catch (err) {
      console.error(err);
    }
  }  

  async setTodoLocation(id, coords) {
    const { latitude, longitude } = coords;
    console.warn('oi');
    try {
      const response = await fetch(
       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=`
      );
      const data = await response.json();
      
      if (!data.error_message) {
        const address = data.results[0].formatted_address;
        
        const { todos } = this.state;
        todos
          .find(todo => todo.id === id)
          .location = address;
        this.setState({
          todos
        })
      } else {
        throw JSON.stringify(data);
      }
    } catch(e) {
      console.error(e);
    }
  }

  addTodo(text) {
    const id = this.state.idCount + 1;
    this.setState({
      todos: [{ id, text }].concat(this.state.todos),
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
