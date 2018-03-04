// New Question View
// The New Question view includes a form with fields for a question and answer, and a submit button.
// Submitting the form correctly adds the question to the deck.

import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { StackNavigator } from 'react-navigation';
import uuidV4 from 'uuid/v4';
import { addCardToDeck, getDeckCompleted } from '../utils/actions';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';


class AddCard extends Component {
  static navigationOptions = {
    title: 'Add Card',
  };

    state={
        cardId: '',
        question: '',
        answer: ''
      }

onCardInputChange = (key, value) => {
  this.setState({
    ...this.state,
    [key]: value
  })
}

saveCard = () => {
  const { deck } = this.props.navigation.state.params;
  const card =
      {
        cardId: uuidV4(),
        question: this.state.question,
        answer: this.state.answer
      };
      const newCards = deck.cards.concat(card);
      deck['cards'] = newCards;
  this.props.dispatchAddCard(deck);
  this.props.dispatchGetDeck(deck);

this.setState({
  cardId: '',
  question: '',
  answer: ''
});
}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.smallFontText}>Fill in your question and answer</Text>
        <View style={styles.form}>
        <TextInput style={styles.txtInput} placeholder="Question..." onChangeText={cardQuestion => this.onCardInputChange('question', cardQuestion)} value={this.state.question}/>
        <TextInput style={styles.txtInput} placeholder="Answer..." onChangeText={cardAnswer => this.onCardInputChange('answer', cardAnswer)} value={this.state.answer}/>
          <TouchableOpacity style={styles.roundedButton} onPress={() => {
            this.saveCard()
            this.props.navigation.goBack()}}>
          <Text style={styles.smallFontText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAddCard: (deck) => dispatch(addCardToDeck(deck)),
    dispatchGetDeck: (deck) => dispatch(getDeckCompleted(deck))
  }
}
export default connect(null, mapDispatchToProps)(AddCard);
