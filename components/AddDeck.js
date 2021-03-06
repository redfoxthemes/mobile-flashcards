// The view includes a form for creating a new deck - which should just be an input for the title and a 'Create Deck' button.
// Pressing the button correctly creates the deck and routes the user to the Individual Deck view for the new deck.
import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Button, Keyboard } from 'react-native';
import { styles } from './styles';
import { StackNavigator } from 'react-navigation';
import uuidV4 from 'uuid/v4';
import { addDeck, getDeckCompleted } from '../utils/actions';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';

class AddDeck extends Component {
  static navigationOptions = {
    title: 'Add Deck',
  };

      state={
        title: ''
      }


onDeckInputChange = (title) => {
  this.setState({title});
}
addDeck = () => {
  const deck =
    {
    deckId: uuidV4(),
    title: this.state.title,
    cards: []
  }

  // set id for deck object to be saved
  this.props.dispatchAddDeck(deck);
this.props.dispatchGetDeck(deck);

  this.setState({
  title: ''
});
}


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.smallFontText}>What is the title of your new deck?</Text>
        <View style={styles.form}>
          <TextInput style={styles.txtInput} placeholder="Your deck title goes here..." onChangeText={deckTitle => this.onDeckInputChange(deckTitle)} value={this.state.title}/>
          <TouchableOpacity style={styles.roundedButton} onPress={() => {
            Keyboard.dismiss()
            this.addDeck()
            this.props.navigation.navigate('SingleDeck')}}>
          <Text style={styles.smallFontText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAddDeck: (deck) => dispatch(addDeck(deck)),
    dispatchGetDeck: (deck) => dispatch(getDeckCompleted(deck))
  }
}

export default connect(null, mapDispatchToProps)(AddDeck);
