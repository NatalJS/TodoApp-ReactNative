import React from 'react';
import { 
    View, TextInput, Button, StyleSheet
} from 'react-native';

class AddTodo extends React.Component {
  constructor() {
    super();
    this.state = {
      text: ''
    }
  }
  
  onTextInput(text) {
    this.setState({
      text: text
    })
  }

  addTodo() {
    this.props.add(this.state.text);
    this.setState({
      text: ''
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          style={styles.input}
          value={this.state.text}
          onChangeText={text => this.onTextInput(text)}
        />
        <Button 
          disabled={!this.state.text}
          style={styles.button}
          onPress={() => this.addTodo()}
          title="add"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    backgroundColor: '#5e91f2',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    marginRight: 10,
  }
})

export default AddTodo;
