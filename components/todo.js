import React from 'react';
import { 
  View, Text, StyleSheet, 
  TouchableNativeFeedback 
} from 'react-native';

class Todo extends React.Component {
  render() {
    return (
      <TouchableNativeFeedback
        onPress={() => {
            this
              .props
              .navigation
              .navigate('TodoDetails', { 
                todo: this.props.todo
              })
        }}
      >
        <View style={styles.container}>
          <Text style={styles.text}>
            {this.props.todo.text}
          </Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 7.5,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowOffset: { width: 8, height: 8 },
    shadowRadius: 5,
    elevation: 7,
  },
  text: {

  }
})

export default Todo;
