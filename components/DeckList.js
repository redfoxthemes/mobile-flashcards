// Deck List View (Default View), seen when the app loads, is a list of created decks which includes the name (title) of each deck and the number of cards.
// Pressing on a deck in the list should generate an animation, and the app should route to an individual deck view.
import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, Platform, ActivityIndicator, TouchableHighlight, Text, Button } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { styles } from './styles';
import uuidV4 from 'uuid/v4';
import {  getDecks, getDeckCompleted, getDeck, deleteDeck } from '../utils/actions';
import DeckButton from './DeckButton';
import thunk from 'redux-thunk';

class DeckList extends Component {

static navigationOptions =({navigation})=> ({
    title: 'Decks',
    headerRight: (Platform.OS === 'ios'
                            ? <View>
                               <TouchableOpacity
                                 style={styles.iosBtn} onPress={() => navigation.navigate('AddDeck')}>
                                   <FontAwesome name='plus' size={25} color='black' />
                               </TouchableOpacity>
                             </View>
                           : <View style={{flexDirection: 'row'}}>
                               <TouchableOpacity style={styles.androidBtn} onPress={() => navigation.navigate('AddDeck')}>
                                 <FontAwesome name='plus' size={20} color='white' />
                               </TouchableOpacity>
                             </View>),
  })

  constructor(props){
    super(props);

        this.getDeck = this.getDeck.bind(this);
  }

componentDidMount() {
  this.props.dispatch(getDecks());
}
componentDidFocus() {
  this.refs.textInput.focus();
}
deleteDeck = (deckId) => {
  this.props.dispatch(deleteDeck(deckId));
}
getDeck = (deck) => {
  this.props.dispatch(getDeckCompleted(deck));
}

  render(){
    const { decks } = this.props;

    const { navigate } = this.props.navigation;

    return(
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='never' style={styles.scrollList}>
        {decks && decks.length > 0 && decks.map((deck) => (
            <View style={styles.paddedItem} key={deck.deckId}>
            <TouchableHighlight style={styles.button} onPress={() => {
              this.getDeck(deck)
            navigate('SingleDeck', { deck: deck })
            }}>
              <View style={styles.innerContainer}>
                <Text style={styles.largeFontText}>{deck.title}</Text>
                <Text style={styles.smallFontText}>{deck.cards.length} cards</Text>
                <TouchableOpacity style={styles.stretchedButton} onPress={() => this.deleteDeck(deck.deckId)}>
                  <Text style={styles.smallFontText}>DELETE</Text>
                </TouchableOpacity>
              </View>
            </TouchableHighlight>
            </View>
          ))}
        </ScrollView>


        </View>
      )
    }
}

function mapStateToProps (state) {
  return {decks: state.decks.decks};
}

export default connect(mapStateToProps)(DeckList);
