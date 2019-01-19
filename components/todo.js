import React from 'react';
import { View, Text } from 'react-native';

class Todo extends React.Component {
  render() {
    return (
      <View>
        <Text>
          {this.props.text}
        </Text>
      </View>
    )
  }
}

export default Todo;
