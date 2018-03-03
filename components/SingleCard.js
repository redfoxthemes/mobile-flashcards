import React from 'react';
import { View, Text, Platform, TouchableHighlight, BackAndroid } from 'react-native';
import { styles } from './styles';

const SingleCard = ({{card}, onPressDeckButton=f=>f }) => (
  <TouchableHighlight style={styles.button} onPress={() => this.onPressDeckButton(deckId)} underlayColor="orange">
    <View style={styles.innerContainer}>
      <Text style={styles.button}>{deck.title}</Text>
      <Text style={styles.smallFontText}>{deck.cards.length} cards</Text>
    </View>
  </TouchableHighlight>
)

export default DeckButton;
