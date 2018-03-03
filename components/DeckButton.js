import React from 'react';
import { View, Text, Platform, TouchableHighlight} from 'react-native';
import { styles } from './styles';

const DeckButton = ({deck, onPressDeckButton=f=>f }) => (
  <TouchableHighlight style={styles.button} onPress={() => this.onPressDeckButton()} underlayColor="orange">
    <View style={styles.innerContainer}>
      <Text style={styles.button}>{deck.title}</Text>
      <Text style={styles.smallFontText}>{deck.cards.length} cards</Text>
    </View>
  </TouchableHighlight>
)

export default DeckButton;
